declare global {
	interface Window {
		google: {
			maps: google.maps;
		};
		Intercom: (type: string, options?: Record<string, string>) => void;
		dataLayer?: { [key: string]: string }[];
	}
}

export {};
