declare global {
	type Language = 'en' | 'fr' | 'es'; // All the test languages
	type Region = 'ca' | 'us' | 'mx'; // All the test regions
	type Locale = `${Language}-${Region}`; // All available locales
}

export {};
