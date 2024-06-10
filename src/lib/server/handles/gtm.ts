import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const container = env.GTM_ID;
const GTM = {
	remove: {
		head: '',
		body: ''
	},
	add: {
		head: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${container}');</script>
<!-- End Google Tag Manager -->`,
		body: `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${container}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`
	}
} as const;

export const gtm: Handle = ({ event, resolve }) => {
	const strategy = !container || event.locals.previewMode ? 'remove' : 'add';
	// Resolve event and output correct gtm scripts
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%gtm.head%', GTM[strategy].head).replace('%gtm.body%', GTM[strategy].body)
	});
};
