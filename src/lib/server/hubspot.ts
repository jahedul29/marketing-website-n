import { HUBSPOT_PORTAL_ID, HUBSPOT_ACCESS_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';

type HubspotField = {
	name: string;
	value: string;
};

type HubspotBody = {
	fields: HubspotField[];
	context: {
		pageUri: string;
		ipAddress: string;
		hutk?: string;
	};
};

export const submitHubspotForm = async (formId: string, body: HubspotBody) => {
	try {
		const res = await fetch(
			`https://api.hsforms.com/submissions/v3/integration/secure/submit/${HUBSPOT_PORTAL_ID}/${formId}`,
			{
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`
				},
				body: JSON.stringify(body)
			}
		);
		if (!res.headers.get('content-type')?.includes('application/json')) {
			throw error(res.status, {
				message: res.statusText
			});
		}
		const resData = await res.json();
		if (resData?.status === 'error') {
			const message = resData.message;
			console.error(message);
			throw error(400, {
				message
			});
		}
		return {
			success: true
		};
	} catch (error) {
		console.error(error.status, error);
		throw error;
	}
};
