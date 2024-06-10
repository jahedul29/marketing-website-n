import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { validateEmail } from '$lib/utils/form/validateEmail';
import { MAILCHIMP_AUDIENCE_ID, MAILCHIMP_API_KEY, MAILCHIMP_SERVER } from '$env/static/private';

const LIST_ID = MAILCHIMP_AUDIENCE_ID;

export const load: PageServerLoad = () => {
	return {
		pageOptions: {
			disableFooterCtas: true,
			greyBg: true
		}
	};
};

export const actions: Actions = {
	default: async ({ request, locals, getClientAddress }) => {
		const { t } = locals;

		const data = await request.formData();

		const email = data.get('email') as string;
		const honey = data.get('_firstname') as string;

		if (honey) {
			return {
				success: true
			};
		}

		const emailValid = validateEmail(email);

		if (!emailValid) {
			return fail(400, {
				values: {
					email
				},
				errors: {
					email: t('forms.emailInvalid')
				}
			});
		}

		try {
			await fetch(
				`https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${email}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${MAILCHIMP_API_KEY}`
					},
					body: JSON.stringify({
						email_address: email,
						status_if_new: 'pending',
						ip_signup: getClientAddress()
					})
				}
			);
			return {
				success: true
			};
		} catch (error) {
			console.error(error);
			const response = error?.response;
			const message = JSON.parse(response?.text || '{}').detail || 'Server error';
			const status = error?.status || 500;
			return {
				status,
				body: {
					errors: {
						email: status === 400 ? t('forms.emailInvalid') : message
					}
				}
			};
		}
	}
};
