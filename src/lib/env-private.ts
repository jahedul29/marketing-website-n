import {
	CMS_URL as ENV_CMS_URL,
	API_URL as ENV_API_URL,
	FORCE_HTTP_CACHE as ENV_FORCE_HTTP_CACHE,
	FORCE_SCRIPTS_HANDLE as ENV_FORCE_SCRIPTS_HANDLE,
	FORCE_PREVIEW_MODE as ENV_FORCE_PREVIEW_MODE
} from '$env/static/private';
import { removeTrailingSlash } from '$lib/utils/string/removeTrailingSlash';

const isEnabled = (VAR: string) => {
	return VAR === 'true' || VAR === '1';
};

export const CMS_URL = removeTrailingSlash(ENV_CMS_URL);
export const API_URL = removeTrailingSlash(ENV_API_URL);

export const FORCE_HTTP_CACHE = isEnabled(ENV_FORCE_HTTP_CACHE);
export const FORCE_SCRIPTS_HANDLE = isEnabled(ENV_FORCE_SCRIPTS_HANDLE);
export const FORCE_PREVIEW_MODE = isEnabled(ENV_FORCE_PREVIEW_MODE);

export default {
	CMS_URL,
	API_URL,
	FORCE_HTTP_CACHE,
	FORCE_SCRIPTS_HANDLE,
	FORCE_PREVIEW_MODE
};
