import type { en } from './en';

declare global {
	namespace Translation {
		type FileSize = Translation<typeof en>;
		interface All {
			filesize: FileSize;
		}
	}
}

export {};
