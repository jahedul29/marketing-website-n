import { API_URL } from '$lib/env-private';

export type CraftData = Record<string, unknown>;

export type CraftError = {
	message: string;
	extensions?: {
		category: string;
	};
	locations?: {
		line: number;
		column: number;
	}[];
	stack?: string[];
};

export interface CraftResponse<Data = CraftData> {
	status?: number;
	errors?: CraftError[];
	data?: Data;
}

export class CraftFetchError extends Error {
	status = 0;
	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

export type CraftFetchGlobals = {
	apiUrl: string;
};

export const fetchCraft = async <Data = CraftData>(
	query: string,
	variables: Record<string, unknown> = {},
	extraHeaders: RequestInit['headers'] = {},
	globals: Partial<CraftFetchGlobals> = {}
): Promise<CraftResponse<Data>> => {
	globals = { apiUrl: API_URL, ...globals };

	if (!globals.apiUrl) {
		throw new Error('fetchCraft: No API URL provided');
	}
	try {
		const res = await fetch(globals.apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...extraHeaders
			},
			body: JSON.stringify({
				query,
				variables
			})
		});
		// Server error, throw
		if (res.status !== 200) {
			throw new CraftFetchError(res.statusText, res.status);
		}
		// Parse response from server
		const craftResponse = (await res.json()) as CraftResponse<Data>;
		// Return successfully parsed response
		// and make sure to check for Craft's errors array
		return {
			status: craftResponse.errors?.length ? 400 : 200,
			...craftResponse
		};
	} catch (error) {
		// Properly pass down unexpected errors
		const status = error.status || 500;
		return {
			status,
			errors: [
				{
					message: error?.message || error || 'Unkown error',
					stack: error?.stack?.split('\n')
				}
			]
		};
	}
};
