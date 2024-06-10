import { readFile } from '$lib/utils/form/readFile';

export const fileToObject = async (file: File) => {
	if (!file.name && !file.size) {
		return;
	}
	return {
		lastModified: file.lastModified,
		name: file.name,
		size: file.size,
		type: file.type,
		content: await readFile(file)
	};
};
