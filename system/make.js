#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { createReadStream } from 'fs';
import { getSvelteFiles, getTsFile, getMdFiles, getStaticFiles } from './filters.js';
import { getSrcFiles, getDocFiles } from './fs-tree.js';
import { streamToString } from './stream.js';
import {
	compileFileListComponent,
	compileSvelteFile,
	compileTsFile,
	compileMdFile,
	compileDocumentationForFile
} from './compiler.js';
import { writeStaticFiles, mkdirStaticFiles, copyStaticFiles } from './static-files.js';
import {
	readStarterKitReference,
	writeStarterKitReference,
	findInStarterKitReference
} from './starter-kit.js';
import parser from './parser.cjs';
import crypto from 'crypto';
import path from 'path';

// Parse arguments from cli
const {
	values: { verbose, writeRef }
} = parseArgs({
	options: {
		verbose: { type: 'boolean', short: 'v' },
		writeRef: { type: 'boolean', short: 'w' }
	}
});

// eslint-disable-next-line no-console, @typescript-eslint/no-empty-function
const print = !verbose ? () => {} : console.log;

const ROUTE_PATH = './src/routes/(docs)/docs';
const FILE_LIST_COMP_PATH = `./src/routes/(docs)/FileList.svelte`;

// Load starter-kit reference
const starterKitRef = await readStarterKitReference();

// Process an include directive
const processIncludeDirective = async (documentation) => {
	return Promise.all(
		documentation?.tokens?.map(async (token) => {
			if (token.type === 'include') {
				token.lines = (await readFile(`./${token.path}`)).toString().split('\n');
			}
			return token;
		}) || []
	);
};

// Fix internal links to md files
const fixInternalLinks = (line) => {
	const findOrMatch = (relative, match) => {
		// TODO: Change this to search in all files
		const id = findInStarterKitReference(relative, starterKitRef);
		if (id) {
			return `](${id})`;
		}
		return match;
	};

	return (
		line
			// Replace links ending with .md
			.replace(/\]\((.+?\.md)\)/g, (match, p1) => {
				const relative = `docs/${path.normalize(p1)}`;
				return findOrMatch(relative, match);
			})
			// Replace links starting with ../src and ending with a source code file extension
			.replace(/\]\(\.\.\/(src\/.+?\.(svelte|ts|js|cjs|mjs|css))\)/g, (match, p1) => {
				const relative = path.normalize(p1);
				return findOrMatch(relative, match);
			})
	);
};

const createFileEntry = (
	file,
	options = {
		tsPathTransform: (p) => p,
		directoryTransform: (p) => p
	}
) => {
	const stream = createReadStream(file);
	const relative = path.relative('.', file);
	const parsedPath = path.parse(file);
	const id = crypto.createHash('sha256').update(relative).digest('hex');
	return Object.freeze({
		id,
		path: file,
		stream,
		body: async () => streamToString(stream),
		relative,
		tsPath: options.tsPathTransform(relative, parsedPath),
		ext: parsedPath.ext,
		name: parsedPath.base,
		displayName: path.basename(file, parsedPath.ext),
		directory: options.directoryTransform(relative, parsedPath),
		inStarterKit: starterKitRef[id] || false,
		passes: []
	});
};

// Start with the list of all source files
const srcFiles = (await getSrcFiles()).map((file) => {
	return createFileEntry(file, {
		tsPathTransform: (p, parsedPath) => {
			if (parsedPath.ext === '.ts' || parsedPath.ext === '.js') {
				// js/ts files are imported without extension
				p = p.replace(/\.(j|t)s$/, '');
			}
			return p.replace('src/lib', '$lib');
		},
		directoryTransform: (p) => path.relative('./src', path.dirname(p)) || 'src'
	});
});

// Get the list of documentation files
const docsFiles = (await getDocFiles()).map((file) => {
	return createFileEntry(file, {
		tsPathTransform: (p) => p,
		directoryTransform: (p) => path.relative('./docs', path.dirname(p)) || 'docs'
	});
});

// Filter them to only keep svelte files
const svelteFiles = getSvelteFiles(srcFiles);

// Filter them to extract ts files
const tsFiles = getTsFile(srcFiles);

// Filter them to extract md files
const mdFiles = getMdFiles(docsFiles);

// Parse them
const parsedSvelteFiles = await Promise.all(
	svelteFiles.map(async (file) => {
		print(`Parsing ${file.relative}`);
		// Parse the svelte file
		const infos = await parser.parseSvelteFile(file);
		// Process include directives
		for (const d of infos.documentation) {
			d.tokens = await processIncludeDirective(d);
		}

		// Add the parsed pass to the list of passes
		file.passes.push({
			step: 'svelte-parser',
			infos
		});
		return file;
	})
);
const parsedTsFiles = await Promise.all(
	tsFiles.map(async (file) => {
		print(`Parsing ${file.relative}`);
		// Parse the svelte file
		const infos = await parser.parseTsFile(file);
		// Process include directives
		for (const d of infos.documentation) {
			d.tokens = await processIncludeDirective(d);
		}
		// Add the parsed pass to the list of passes
		file.passes.push({
			step: 'ts-parser',
			infos
		});
		return file;
	})
);
const parsedMdFiles = await Promise.all(
	mdFiles.map(async (file) => {
		print(`Parsing ${file.relative}`);
		const infos = await parser.parseMdFile(file);
		// Resolve links
		infos.documentation = infos.documentation.map((d) => {
			d.tokens = d.tokens.map((token) => {
				if (token.type === 'text') {
					token.lines = token.lines.map(fixInternalLinks);
				}
				return token;
			});
			return d;
		});

		file.passes.push({
			step: 'md-parser',
			infos
		});
		return file;
	})
);

// Re-parse documentation to expand includes
const expandFile = (step) => (file) => {
	const lastPass = file.passes.at(-1);
	const infos = lastPass.infos;
	for (const d of infos.documentation) {
		d.tokens = d.tokens.flatMap((token) => {
			if (token.type === 'include') {
				// Expand the include directive
				return parser.tokenizeDocumentation(token.lines);
			}
			return token;
		});
	}

	// Push new pass
	file.passes.push({
		step,
		infos
	});

	return file;
};

const expandedSvelteFiles = parsedSvelteFiles.map(expandFile('svelte-expander'));
const expandedTsFiles = parsedTsFiles.map(expandFile('ts-expander'));
const expandedMdFiles = parsedMdFiles.map(expandFile('md-expander'));

// Compile them
const compiledSvelteFiles = expandedSvelteFiles.map((file) => {
	print(`Compiling ${file.relative}`);
	file.passes.push({
		step: 'svelte-compiler',
		infos: file.passes.at(-1).infos,
		render: compileSvelteFile(file)
	});
	return file;
});
const compiledTsFiles = expandedTsFiles.map((file) => {
	print(`Compiling ${file.relative}`);
	file.passes.push({
		step: 'ts-compiler',
		infos: file.passes.at(-1).infos,
		render: compileTsFile(file)
	});
	return file;
});
const compiledMdFiles = expandedMdFiles.map((file) => {
	print(`Compiling ${file.relative}`);
	file.passes.push({
		step: 'md-compiler',
		infos: file.passes.at(-1).infos,
		render: compileMdFile(file)
	});
	return file;
});

// Merge the files
const compiledFiles = compiledMdFiles.concat(compiledTsFiles).concat(compiledSvelteFiles);

// Group the files by category
const filesByDirectories = compiledFiles.reduce((memo, file) => {
	const dir = file.directory;
	if (!memo[dir]) {
		memo[dir] = [];
	}
	memo[dir].push(file);
	return memo;
}, {});

// Generate the UI components
const fileListComponent = compileFileListComponent(filesByDirectories);

// Create the required directories
await mkdirStaticFiles();

// Copy the static files into the static directory
await copyStaticFiles(getStaticFiles(docsFiles));

// Write everything to disk
const writes = [writeStaticFiles(), writeFile(FILE_LIST_COMP_PATH, fileListComponent)].concat(
	// Since each file may write many files, we need to wrap everything in a new Promise
	compiledFiles.map(async (file) => {
		const lastPass = file.passes.at(-1);
		// Create the directory
		await mkdir(`${ROUTE_PATH}/${file.id}`, {
			recursive: true,
			mode: 0o755
		});
		// Write the components files
		await Promise.all(
			compileDocumentationForFile(file).map((doc) => {
				return writeFile(`${ROUTE_PATH}/${file.id}/${doc.path}`, doc.render);
			})
		);
		// Write the file
		return writeFile(`${ROUTE_PATH}/${file.id}/+page.svelte`, lastPass.render);
	})
);

// Write starter-kit reference
if (writeRef) {
	print('Will write starter-kit reference');
	writes.push(writeStarterKitReference(compiledFiles));
}

// Wait for all writes to finish
await Promise.all(writes);

print(`That's it!`);
