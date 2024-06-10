import type { en } from './en';

declare global {
	namespace Translation {
		type Duration = Translation<typeof en>;
		interface All {
			duration: Duration;
		}
	}
}

export {};
