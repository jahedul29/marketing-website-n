/**@docs
 * This module offers a simple way to send emails using the SendGrid API.
 * It works on the edge and in node, since it only uses fetch.
 *
 * A simple example would be:
 *
 * ```ts
 * import { sendgrid } from '$lib/3rdparty/sendgrid';
 * import { SENGRID_API_KEY } from '$lib/env';
 * // Create a client
 * const client = sendgrid({ apiKey: SENGRID_API_KEY });
 * // Send an email
 * const response = client.sendEmail({
 * 	to: ['test@example.com'],
 * 	from: 'my@example.com',
 * 	subject: 'Hello world',
 * 	text: 'This is a test email',
 * 	html: '<p>This is a test email</p>'
 * });
 * console.log(response.success);
 * console.error(response.error);
 * ```
 */

const ENDPOINT = 'https://api.sendgrid.com/v3/mail/send';

export type EmailAddress = `${string}@${string}.${string}`;

export type Email = {
	to: EmailAddress[];
	from: EmailAddress;
	fromName?: string;
	subject: string;
	text?: string;
	html?: string;
	attachments?: File[];
};

export type Options = {
	apiKey: string;
	endpoint: string;
};

export interface SendGridClient {
	sendEmail: (email: Email) => Promise<{ success: boolean; error?: string }>;
}

/**
 * Transforms a File object into a SendGrid attachment object.
 * @param files An array of files to be attached to the email
 */
const processAttachments = async (files?: File[]) => {
	const attachments =
		files?.map(async (f) => {
			const ab = await f.arrayBuffer();
			const content = Buffer.from(new Uint8Array(ab)).toString('base64');
			return {
				content,
				filename: f.name,
				type: f.type,
				disposition: 'attachment'
			};
		}) || [];

	if (attachments.length === 0) {
		// sendgrid will not work with empty array
		return undefined;
	}

	return (await Promise.allSettled(attachments))
		.map((r) => {
			if (r.status !== 'fulfilled') {
				return null;
			}
			return r.value;
		})
		.filter(Boolean);
};

/**
 * Creates a new SendGrid client object.
 * @param options Partial<Options>
 * @returns a new SendGridClient object
 */
export const sendgrid = (options: Partial<Options>): SendGridClient => {
	options = { endpoint: ENDPOINT, ...options };
	if (!options.apiKey) {
		throw new Error('SendGrid API key is required');
	}
	if (!options.endpoint) {
		throw new Error('SendGrid endpoint is required');
	}

	const endpoint = new URL(options.endpoint);
	const send = async (email: Email) => {
		return fetch(endpoint, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${options.apiKey}`,
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				personalizations: [{ to: email.to.map((email) => ({ email })) }],
				from: { email: email.from, name: email.fromName },
				subject: email.subject,
				content: [
					email.text && { type: 'text/plain', value: email.text },
					email.html && { type: 'text/html', value: email.html }
				].filter(Boolean),
				attachments: await processAttachments(email?.attachments)
			})
		});
	};

	return {
		/**
		 * Sends an email using the SendGrid API.
		 * @param email
		 * @returns
		 */
		sendEmail: async (email: Email) => {
			try {
				const response = await send(email);
				return {
					success: response.status === 202
				};
			} catch (ex) {
				console.error(ex);
				return {
					success: false,
					error: ex.message
				};
			}
		}
	};
};
