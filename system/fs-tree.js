import { resolve } from 'path';
import { readdir } from 'fs/promises';

async function* getFiles(dir, maxDepth = 10, currentDepth = 0) {
	const directories = await readdir(dir, { withFileTypes: true });
	for (const dirent of directories) {
		const res = resolve(dir, dirent.name);
		if (dirent.isDirectory()) {
			if (dirent.name === 'routes') {
				continue;
			}
			if (currentDepth < maxDepth) {
				yield* getFiles(res, maxDepth, currentDepth + 1);
			}
		} else {
			yield res;
		}
	}
}

const getFilesAsArray = async (dir, maxDepth = 10) => {
	const arr = [];
	const files = await getFiles(dir, maxDepth);
	for await (const file of files) {
		arr.push(file);
	}
	return arr;
};

export const getSrcFiles = async () => {
	return getFilesAsArray('./src');
};

export const getDocFiles = async () => {
	return getFilesAsArray('./docs', 0);
};
