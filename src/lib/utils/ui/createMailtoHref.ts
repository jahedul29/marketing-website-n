type MailtoParams = {
	email?: string;
	body?: string;
	subject?: string;
	cc?: string;
	bcc?: string;
};

export const createMailtoHref = (params: MailtoParams) => {
	const paramsString = new URLSearchParams(params).toString();
	return `mailto:${params.email || ''}${paramsString ? `?${paramsString}` : ''}`;
};
