import type { PageServerLoad, Actions } from './$types';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { contact } from '$gql/fragments/pages';
import { validateEmail } from '$lib/utils/form/validateEmail';
import { fail } from '@sveltejs/kit';
import { submitHubspotForm } from '$lib/server/hubspot';

type ContactFormData = {
	email: string;
	firstname: string;
	lastname: string;
	phone: string;
	company: string;
	message: string;
	_firstname: string;
};

const CONTACT_FORM_ID = '39a674fb-eefc-4736-8e17-e6e86bbc5142';

export const load: PageServerLoad = async (event) => {
	const query = pageQueryBuilder('entry').withFragments({ contact });
	const { entry } = await loadCraftPage<{ entry: ContactSuppliersEntry }>(event, query);
	return {
		entry,
		pageOptions: {
			greyBg: true
		}
	};
};

export const actions: Actions = {
	default: async ({ request, locals, getClientAddress, cookies }) => {
		const { t } = locals;

		const body = await request.formData();

		const data = Object.fromEntries(body) as ContactFormData;

		const { email, firstname, lastname, phone, message, company } = data;

		// _firstname is the honeypot
		if (data._firstname) {
			return {
				success: true
			};
		}

		const optional = ['phone'];
		const values = { email, firstname, lastname, phone, message, company };
		const errors = Object.entries(values).reduce((obj, [key, value]) => {
			if (optional.includes(key)) {
				return obj;
			}
			if (key === 'email' && !validateEmail(email)) {
				obj[key] = t('forms.emailInvalid');
				return obj;
			}
			if (!value) {
				obj[key] = t(
					`forms.${key}Required` as PropertyStringPath<Translation.All['global']>
				);
			}
			return obj;
		}, {});

		if (Object.values(errors).filter(Boolean).length > 0) {
			return fail(400, {
				values,
				errors
			});
		}

		const hutk = cookies.get('hubspotutk');

		return submitHubspotForm(CONTACT_FORM_ID, {
			fields: Object.entries(values).map(([name, value]) => ({
				name,
				value
			})),
			context: {
				pageUri: request.headers.get('referer') || '',
				ipAddress: getClientAddress(),
				hutk
			}
		});
	}
};
