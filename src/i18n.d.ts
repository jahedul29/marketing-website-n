declare global {
	type Language = 'en' | 'fr'; // All the Craft sites handles
	type Region = 'ca'; // All available regions
	type Locale = `${Language}-${Region}`; // All available locales
}

export {};
