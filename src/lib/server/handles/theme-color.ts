import type { Handle } from '@sveltejs/kit';
import palettes from '../../../../tailwind/palettes.json';
import { resoleObjectStringPath } from '$lib/utils/objects/resolveObjectStringPath';

const DEFAULT_DARK_THEME_COLOR = '#000000';
const DEFAULT_LIGHT_THEME_COLOR = '#FFFFFF';

export const themeColor: Handle = async ({ event, resolve }) => {
	const lightColorPath = palettes?.symbolic?.light?.['theme-color'] || '';
	const darkColorPath = palettes?.symbolic?.dark?.['theme-color'] || '';
	const themeColorLight =
		resoleObjectStringPath(palettes, lightColorPath) || DEFAULT_LIGHT_THEME_COLOR;
	const themeColorDark =
		resoleObjectStringPath(palettes, darkColorPath) || DEFAULT_DARK_THEME_COLOR;
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html
				.replace('%theme-color.light%', themeColorLight)
				.replace('%theme-color.dark%', themeColorDark)
	});
};
