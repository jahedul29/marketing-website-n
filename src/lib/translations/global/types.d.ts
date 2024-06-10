import type {
	en,
	ProjectTranslations as ENProjectTranslations,
	DefaultTranslations as ENDefaultTranslations
} from './en';

declare global {
	namespace Translation {
		type Global = Translation<typeof en>;
		interface All {
			global: Global;
		}

		type Default = Translation<ENDefaultTranslations>;
		type Project = Translation<ENProjectTranslations>;
	}
}

export {};
