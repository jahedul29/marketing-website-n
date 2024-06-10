import plugin from 'tailwindcss/plugin.js';
import palettes from '../palettes.json' assert { type: 'json' };

const extractColorsObjectFromFamily = (palette, family) => {
	const paletteObject = palettes.symbolic[palette];
	if (!paletteObject) {
		throw new Error(`Palette ${palette} not found`);
	}
	return Object.keys(paletteObject[family]).map((color) => {
		return {
			palette,
			family,
			name: color,
			canonical: family && family !== 'normal' ? `${color}-${family}` : color
		};
	});
};

const extractColorsFromPalette = () => {
	return []
		.concat(extractColorsObjectFromFamily('light', 'normal'))
		.concat(extractColorsObjectFromFamily('light', 'invert'))
		.concat(extractColorsObjectFromFamily('dark', 'normal'))
		.concat(extractColorsObjectFromFamily('dark', 'invert'));
};

const extractUniqueCanonicals = (colorsFromPalette) => {
	return Array.from(new Set(colorsFromPalette.map((color) => color.canonical)));
};

const pluckColors = (palettes) => {
	return Object.entries(palettes).reduce((memo, [theme, values]) => {
		Object.entries(values).forEach(([color, value]) => {
			memo[`${theme}.${color}`] = value;
		});
		return memo;
	}, {});
};

export const generateTailwindColorsObject = () => {
	return extractUniqueCanonicals(extractColorsFromPalette()).reduce((memo, key) => {
		memo[key] = `var(--color-${key})`;
		return memo;
	}, {});
};

export default plugin(({ addBase }) => {
	const { symbolic, ...colorScales } = palettes;
	const colorsNames = extractColorsFromPalette(palettes);
	const colorsValues = pluckColors(colorScales);

	const generateColorsForTheme = (themeName) => {
		const theme = symbolic[themeName];
		if (!theme) {
			throw new Error(`Theme ${themeName} not found`);
		}
		return colorsNames
			.filter((color) => color.palette === themeName)
			.reduce((memo, color) => {
				const colorName = theme[color.family][color.name];
				if (!colorName) {
					throw new Error(
						`Symbolic color "${color.family}.${color.color}" not found in theme`
					);
				}
				const colorValue = colorsValues[colorName];
				if (!colorValue) {
					throw new Error(`Symbolic color "${colorName}" not found in palette`);
				}
				memo[`--color-${color.canonical}`] = colorValue;
				return memo;
			}, {});
	};

	const invertedTheme = (level) => {
		return new Array(level).fill('.inverted-theme', 0, level).join(' ');
	};

	const lightColors = generateColorsForTheme('light');
	const darkColors = generateColorsForTheme('dark');

	const css = {
		// Make sure we have a default, with no specificity
		[`:root`]: lightColors,

		// Generate light version with a @media specificity
		['@media (prefers-color-scheme: light)']: {
			[`:root`]: lightColors,
			[`${invertedTheme(1)}, ${invertedTheme(3)}`]: darkColors,
			[`${invertedTheme(2)}, ${invertedTheme(4)}`]: lightColors
		},

		// Generate dark version a @media specificity
		['@media (prefers-color-scheme: dark)']: {
			[`:root`]: darkColors,
			[`${invertedTheme(1)}, ${invertedTheme(3)}`]: lightColors,
			[`${invertedTheme(2)}, ${invertedTheme(4)}`]: darkColors
		}
	};

	addBase(css);
});
