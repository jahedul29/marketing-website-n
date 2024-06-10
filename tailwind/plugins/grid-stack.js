import plugin from 'tailwindcss/plugin.js';

export default plugin(function ({ addUtilities }) {
	addUtilities({
		['.grid-stack']: {
			'grid-template': '100% / 100%',
			['> *']: {
				'grid-area': '1 / 1'
			}
		}
	});
});
