import { env } from '$env/dynamic/public';
import { PUBLIC_SITE_URL, PUBLIC_ENV } from '$env/static/public';

const PROD = 'production';

export const ENV = PUBLIC_ENV || '';
export const ENV_SITE_URL = PUBLIC_SITE_URL || '/';
export const SITE_URL = (
	ENV_SITE_URL.startsWith('http') ? ENV_SITE_URL : `https://${ENV_SITE_URL}`
).replace(/^(.+)\/$/, '$1');

export const isProduction = () => ENV === PROD;
export const isPreview = () => ENV !== PROD;

export default {
	...env,
	ENV,
	ENV_SITE_URL,
	SITE_URL
};
