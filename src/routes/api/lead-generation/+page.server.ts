import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { validateEmail } from '$lib/utils/form/validateEmail';
import { submitHubspotForm } from '$lib/server/hubspot';

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
		const formId = data.get('formId') as string;
		const honey = data.get('_firstname') as string;

		if (honey || !formId) {
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

		return submitHubspotForm(formId, {
			fields: [
				{
					name: 'email',
					value: email
				}
			],
			context: {
				pageUri: request.headers.get('referer') || '',
				ipAddress: getClientAddress()
			}
		});
	}
};
