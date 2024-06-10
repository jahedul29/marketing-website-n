import env from './env.config.js';
import nesting from 'tailwindcss/nesting/index.js';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssNano from 'cssnano';

export default {
	plugins: [
		nesting,
		tailwind,
		autoprefixer,
		env.production &&
			cssNano({
				preset: ['default', { discardComments: { removeAll: true } }]
			})
	].filter(Boolean)
};
