import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prettier from 'prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fontFilesPath = path.join(__dirname, '../src/lib/fonts');
const cssFontsPath = path.join(__dirname, '../src/lib/css/fonts.css');
const prettierConfig = JSON.parse(fs.readFileSync('./.prettierrc'));

const CT = {
	RESET: '\x1b[0m',
	RED: '\x1b[31m',
	GREEN: '\x1b[32m',
	YELLOW: '\x1b[33m'
};

const c_log = (message, color) => {
	console.log(color, message, CT.RESET); // eslint-disable-line
};

const getFontFiles = () => {
	if (!fs.existsSync(fontFilesPath)) {
		c_log(`Folder not found at\n ${fontFilesPath} does not exist.`, CT.RED);
		process.exit(0);
	}
	const files = fs.readdirSync(fontFilesPath);
	if (files.length < 1) {
		c_log(`No font files found in folder \n ${fontFilesPath}`, CT.RED);
		process.exit(0);
	}
	return files;
};

const processFiles = (fontFiles) => {
	return fontFiles.map((file) => {
		const processedFilename = file.toLowerCase().replace(/[\s]+/g, '-');
		fs.renameSync(`${fontFilesPath}/${file}`, `${fontFilesPath}/${processedFilename}`);
		return file;
	});
};

const getFontFace = (file) => {
	const filename = file.replace('.woff2', '').toLowerCase();
	const isBold = filename.includes('bold');
	const isMedium = filename.includes('medium');
	const isItalic = filename.includes('italic');
	const isLight = filename.includes('light');
	const fontStyle = isItalic ? 'italic' : 'normal';
	const fontWeight = isBold ? '700' : isMedium ? '500' : isLight ? '300' : '400';
	return `
	@font-face {
		font-family: '${filename}';
		font-style: ${fontStyle};
		font-weight: ${fontWeight};
		src: local(''), url('../fonts/${filename}.woff2') format('woff2');
		font-display: swap;
	}
	`;
};

try {
	// Get font files
	const fontFiles = getFontFiles();

	// Rename the files
	const processedFiles = processFiles(fontFiles);

	const woff2FileNames = processedFiles.filter((file) => /.woff2$/.test(file));

	if (woff2FileNames.length < 1) {
		c_log(`Could not find any .woff2 files \n ${fontAbsolutePath}`, CT.YELLOW);
		process.exit(0);
	}

	// Generate fontface rules in fonts.css
	const fontFaces = woff2FileNames.map(getFontFace).join('\n');
	const formattedFontsCss = prettier.format(fontFaces, {
		...prettierConfig,
		filepath: cssFontsPath
	});
	fs.writeFileSync(cssFontsPath, formattedFontsCss);
	c_log(`@font-face rules generated in \n ${cssFontsPath}`, CT.GREEN);
} catch (err) {
	c_log(`An error occured: ${err}`, CT.RED);
}
