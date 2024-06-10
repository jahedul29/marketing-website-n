import { dev } from '$app/environment';
import { env as envDynPrivate } from '$env/dynamic/private';
import { env as envDynPublic } from '$env/dynamic/public';
import envLibPrivate from '$lib/env-private';
import envLibPublic, { isPreview } from '$lib/env-public';
import constants from '$lib/constants';
import { error } from '@sveltejs/kit';

const replaceProtectedValues = (key: string, value: unknown) => {
	const hasValue = value !== undefined && value !== null;
	if (hasValue && /(key|token|secret|password|auth)/i.test(key)) {
		return '🤷‍♀️';
	}
	return value;
};

export const GET = () => {
	if (!isPreview() && !dev) {
		throw error(404, 'Not found');
	}
	return new Response(
		JSON.stringify(
			{
				lib: {
					private: envLibPrivate,
					public: envLibPublic
				},
				constants,
				dynamic: {
					private: envDynPrivate,
					public: envDynPublic
				}
			},
			replaceProtectedValues,
			2
		),
		{
			status: 200,
			headers: {
				'content-type': 'application/json'
			}
		}
	);
};
