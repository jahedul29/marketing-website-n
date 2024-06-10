import { createMailtoHref } from '$lib/utils/ui/createMailtoHref';

export const createMailShareUrl = (body: string, subject?: string) => {
	return createMailtoHref({
		body,
		subject
	});
};
