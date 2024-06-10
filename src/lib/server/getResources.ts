import { GET_FILTERED_RESOURCES } from '$gql/queries/blog';
import { fetchCraft } from './craft';

type Variables = {
	limit: number;
	offset: number;
	category: string;
	type?: Maybe<string>;
	excludedSlug?: Maybe<string>;
};

export const getResources = async (variables: Variables) => {
	try {
		const { data } = await fetchCraft<{
			items: ResourcesDefault[];
			total: number;
		}>(GET_FILTERED_RESOURCES, variables);
		return {
			items: data?.items || [],
			itemsTotal: data?.total || 0
		};
	} catch (error) {
		console.error(error);
		return { items: [], itemsTotal: 0 };
	}
};
