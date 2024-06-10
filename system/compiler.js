import prettier from 'prettier';
import { readFileSync } from 'fs';
import MD from 'markdown-it';

export const AUTO_GEN_COMMENT = '<!-- This a generated file by ./system/compiler.js -->';
const md = new MD();

const format = (() => {
	const prettierConfig = JSON.parse(readFileSync('./.prettierrc'));
	/**
	 * @param {string} code
	 * @returns {string}
	 */
	return (code) =>
		prettier.format(code, {
			...prettierConfig,
			parser: 'svelte'
		});
})();

/**
 * @param {string} str
 * @returns {string}
 */
const escapeCurly = (str) => {
	return str?.replace(/\{/g, '&lcub;').replace(/\}/g, '&rcub;') || '';
};

/**
 * @param {string} str
 * @returns {string}
 */
const escape = (str) => {
	return escapeCurly(str?.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
};

/**
 * @param {string} str
 * @returns {string}
 */
const pre = (str) => (!str ? null : `<pre>${escape(str)}</pre>`);

/**
 * @param {object} file
 */
const compileDefaultScriptForFile = (file) => {
	const importStatement =
		file.ext === '.svelte'
			? `import ${file.displayName} from '${file.tsPath}';`
			: `import { ${file.displayName} } from '${file.tsPath}';`;
	return `<script lang="ts">${importStatement}</script>`;
};

/**
 * @param {object} filesByDirectories
 * @returns {string}
 */
export const compileFileListComponent = (filesByDirectories) => {
	const fileItems = Object.keys(filesByDirectories).map((cat) => {
		const items = filesByDirectories[cat]
			.map((file) => {
				return `<a class="block text-40 hover:underline ${
					file.inStarterKit ? '' : 'italic'
				} {currentDocPage == '${file.id}' ? 'font-bold' : ''}"
				href="/docs/${file.id}">${file.displayName}</a>`;
			})
			.join('\n');
		return `<Frame lineHeight="40"><p class="text-60 font-bold">${cat}</p>\n${items}</Frame>`;
	});

	return format(`${AUTO_GEN_COMMENT}
		<script lang="ts">
			import Frame from '$lib/components/ui/Frame.svelte';
			import { page } from '$app/stores';
			$: currentDocPage = $page.url.pathname.split('/').pop();
		</script>
		${fileItems.join('\n')}
	`);
};

/**
 * @param {object} file
 * @returns {string}
 */
export const compileHeaderForFile = (file) => {
	return `<h1 class="text-90">${file.displayName}</h1>
	<small class="block text-50">${file.tsPath}</small>
	<small class="block text-40">In starter kit: ${file.inStarterKit ? 'Yes' : 'No'}</small>`;
};

/**
 * @param {object} file
 * @returns {string}
 */
export const compileHeadForFile = (file) => {
	const infos = file.passes.at(-1).infos;
	// TODO: Try to make this better
	const description = infos?.documentation?.[0]?.tokens?.[0]?.lines?.[0] || '';
	return `<svelte:head>
		<title>${file.displayName} | SvelteKit Starter Kit Docs</title>
		<meta property="og:title" content="${file.displayName}" />
		<meta name="twitter:title" content="${file.displayName}" />

		<meta name="description" content="${description}" />
		<meta property="og:description" content="${description}" />
		<meta name="twitter:description" content="${description}" />
	</svelte:head>`;
};

/**
 * @param {object} documentation
 * @returns {string}
 */
export const compileDocumentation = (documentation) => {
	if (!documentation?.length) {
		return '';
	}
	const doc = documentation
		.flatMap((d) => {
			return d.tokens.map((token) => {
				const html = token.lines.join('\n');
				if (token.type === 'text') {
					return escapeCurly(md.render(html));
				} else if (token.type === 'exec') {
					return `
					<Stack rhythm="16">
						<Frame padding="16" radius="8"
							background="main-invert"
							color="main"
							invertedTheme={true}
						>
							${token.code}
							<details style="font-size: 0.8em; padding-top: 1em">
								<summary>View code</summary>
								${escapeCurly(md.render(html))}
							</details>
						</Frame>
					</Stack>`;
				}
				throw new Error(`Unknown token type: ${token.type}`);
			});
		})
		.join('\n');
	return `<Stack rhythm="32">
	<Prose>
		${doc}
	</Prose>
	</Stack>`;
};

/**
 * @param {object} file
 * @returns {string}
 */
export const compileSvelteFile = (file) => {
	const infos = file.passes.at(-1).infos;
	return format(`${AUTO_GEN_COMMENT}
		<script lang="ts">
		import Prose from '$lib/components/ui/Prose.svelte';
		import Stack from '$lib/components/ui/Stack.svelte';
		import Frame from '$lib/components/ui/Frame.svelte';
		${compilerGeneratedImportsForFile(file).join('\n')}
		</script>

		${compileHeadForFile(file)}
		${compileHeaderForFile(file)}
		${compileDocumentation(infos.documentation)}

		<Stack rhythm="32">
		<p class="text-50"><strong>Children components:</strong>
			${Array.from(new Set(infos.children.map((child) => `<code>${child.component}</code>`))).join(', ')}
		</p>
		<p class="text-50"><strong>Imports:</strong>
			${Array.from(new Set(infos.imports.map((imp) => `<code>${imp.name}</code>`))).join(', ')}</p>
		</Stack>

		<Stack rhythm="32">
		<table class="w-full" cellpadding="4">
			<tr>
				<th class="text-left">Prop</th>
				<th class="text-left">Type</th>
				<th class="text-left">Default</th>
				<th class="text-left">Description</th>
			</tr>
			${infos.props
				.map((prop) => {
					return `
					<tr>
						<td><code>${prop.name}</code></td>
						<td style="font-size: 0.8em"><code>${escape(prop.type)}</code></td>
						<td style="font-size: 0.8em"><code>${pre(prop.value) || '<strong>*required</strong>'}</code></td>
						<td style="font-size: 0.8em">
							${prop.keyword === 'const' ? '<em>(readonly)</em> ' : ''}
							${prop.jsdoc ? escapeCurly(md.render(prop.jsdoc)) : ''}
						</td>
					</tr>
				`;
				})
				.join('\n')}
			${infos.props.length ? '' : '<tr><td colspan="4">No props ¯\\_(ツ)_/¯</td></tr>'}
		</table>
		</Stack>
	`);
};

/**
 * @param {object} file
 * @returns {string}
 */
export const compileTsFile = (file) => {
	const infos = file.passes.at(-1).infos;
	return format(`${AUTO_GEN_COMMENT}
		<script lang="ts">
		import Prose from '$lib/components/ui/Prose.svelte';
		import Stack from '$lib/components/ui/Stack.svelte';
		import Frame from '$lib/components/ui/Frame.svelte';
		${compilerGeneratedImportsForFile(file).join('\n')}
		</script>

		${compileHeadForFile(file)}
		${compileHeaderForFile(file)}
		${compileDocumentation(infos.documentation)}

		<Stack rhythm="32">
		<table class="w-full" cellpadding="4">
			<tr>
				<th class="text-left">Export</th>
				<th class="text-left">Type</th>
				<th class="text-left">Value</th>
				<th class="text-left">Description</th>
			</tr>
		${infos.exports
			.map((exports) => {
				return `
					<tr>
						<td><code>${escape(exports.name)}</code></td>
						<td style="font-size: 0.8em"><code>${escape(exports.type)}</code></td>
						<td style="font-size: 0.8em"><code>${pre(exports.value)}</code></td>
						<td style="font-size: 0.6em">
							${exports.keyword === 'const' ? '<em>(readonly)</em> ' : ''}
							${exports.jsdoc ? escapeCurly(md.render(exports.jsdoc)) : ''}
						</td>
					</tr>
				`;
			})
			.join('\n')}
		${infos.exports.length ? '' : '<tr><td colspan="4">No exports ¯\\_(ツ)_/¯</td></tr>'}
		</table>
		</Stack>
	`);
};

/**
 * @param {object} file
 * @returns {string}
 */
export const compileMdFile = (file) => {
	const infos = file.passes.at(-1).infos;
	return format(`${AUTO_GEN_COMMENT}
		<script lang="ts">
		import Prose from '$lib/components/ui/Prose.svelte';
		import Stack from '$lib/components/ui/Stack.svelte';
		</script>

		${compileHeadForFile(file)}
		${compileDocumentation(infos.documentation)}
	`);
};

/**
 * @param {object} file File Entry
 * @returns {[]}
 */
export const compileDocumentationForFile = (file) => {
	const infos = file.passes.at(-1).infos;
	if (!infos?.documentation?.length) {
		return [];
	}
	return infos.documentation
		.flatMap((doc) => {
			if (!doc.tokens?.length) {
				return [];
			}
			return doc.tokens
				.map((token) => {
					if (token.type === 'exec') {
						const lines = token.lines
							.filter((line) => !line.startsWith('```'))
							.join('\n');
						const defaultScript = compileDefaultScriptForFile(file);
						const script = lines.includes('<script') ? '' : defaultScript;

						return {
							...token,
							render: format(`${script}${lines}`)
						};
					}
				})
				.filter(Boolean);
		})
		.filter(Boolean);
};

/**
 * @param {object} file
 * @returns {[]}
 */
export const compilerGeneratedImportsForFile = (file) => {
	const infos = file.passes.at(-1).infos;
	return infos.documentation
		.flatMap((doc) => {
			if (!doc.tokens?.length) {
				return [];
			}
			return doc.tokens
				.map((token) => {
					if (token.type === 'exec') {
						return `import ${token.comp} from './${token.path}';`;
					}
				})
				.filter(Boolean);
		})
		.filter(Boolean);
};
