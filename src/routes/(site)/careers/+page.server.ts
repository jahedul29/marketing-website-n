import type { PageServerLoad } from './$types';
import { loadCraftPage, pageQueryBuilder } from '$lib/server/loadCraftPage';
import { careers } from '$gql/fragments/pages';

const getJobs = async (): Promise<LeverJob[]> => {
	try {
		const res = await fetch('https://api.lever.co/v0/postings/planned-2?mode=json');
		const jobs = await res.json();
		return jobs;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const load: PageServerLoad = async (event) => {
	const query = pageQueryBuilder('entry').withFragments({ careers });
	const { entry } = await loadCraftPage<{ entry: CareersEntry }>(event, query);
	const jobs = await getJobs();
	return {
		entry,
		jobs,
		pageOptions: {
			greyBg: true
		}
	};
};
