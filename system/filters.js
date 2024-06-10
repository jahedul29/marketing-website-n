/**
 * @param {Array} files
 **/
export const getSvelteFiles = (files) => {
	return files.filter(
		(file) =>
			file.ext == '.svelte' &&
			!file.relative.includes('/examples/') &&
			!file.relative.includes('/docs/')
	);
};

/**
 * @param {Array} files
 */
export const getTsFile = (files) => {
	return files.filter((file) => file.ext == '.ts' && !file.name.includes('.d.ts'));
};

/**
 * @param {Array} files
 */
export const getMdFiles = (files) => {
	return files.filter((file) => file.ext == '.md');
};

/**
 * @param {Array} files
 */
export const getStaticFiles = (files) => {
	return files.filter((file) => file.ext == '.svg' || file.ext == '.png');
};
