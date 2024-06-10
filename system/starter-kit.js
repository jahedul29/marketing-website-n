import { writeFile, readFile } from 'fs/promises';

export const STARTER_KIT_REF_PATH = './.starter-kit';

/**
 * Reads the starter-kit reference file and json decodes it
 */
export const readStarterKitReference = async () => {
	try {
		const content = await readFile(STARTER_KIT_REF_PATH, 'utf-8');
		return JSON.parse(content);
	} catch (e) {
		// Ignore errors
		return {};
	}
};

/**
 * Writes the starter-kit reference file
 * @param {object} data
 */
export const writeStarterKitReference = (data) => {
	data = data.reduce((memo, file) => {
		memo[file.id] = file.relative;
		return memo;
	}, {});
	return writeFile(STARTER_KIT_REF_PATH, JSON.stringify(data, null, 2) + '\n');
};

/**
 * Finds the id of a file in the starter-kit reference
 * @param {object} file
 * @param {object} starterKitRef
 */
export const findInStarterKitReference = (file, starterKitRef) => {
	return Object.entries(starterKitRef).find(([_, relative]) => {
		return relative === file;
	})?.[0];
};
