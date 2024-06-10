import { sequence } from '@sveltejs/kit/hooks';
import { preview } from '$lib/server/handles/preview';
import { scripts } from '$lib/server/handles/scripts';
import { cacheApi, cacheHeaders } from '$lib/server/handles/cache';
import { translationApi, langAttribute, langRedirect, langLocals } from '$lib/server/handles/lang';
import { date } from '$lib/server/handles/date';
import { httpAuth } from '$lib/server/handles/http-auth';
import { preflightCheck, securityHeaders } from '$lib/server/handles/security';
import { performanceHeaders } from '$lib/server/handles/performance';
import { preloads } from '$lib/server/handles/preloads';

// The order in the sequence is **absolutely critical**:
// since handles are processed in a chain, the output of one handle becomes the input of the next.
// We start with handles that add utility data and functions in the `event.locals` object,
// then run the handles that rewrites requests. We end with handles that modify the responses.
// *Make sure to put your handler in the proper place in the sequence.*
export const handle = sequence(
	// Locals setters
	preloads,
	langLocals,
	langRedirect,
	cacheApi,
	translationApi,
	// Requests rewriters
	httpAuth,
	preflightCheck,
	preview,
	// Html transforms
	langAttribute,
	scripts,
	date,
	// Response modifiers
	securityHeaders,
	cacheHeaders,
	performanceHeaders
);
