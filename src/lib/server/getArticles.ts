import { GET_FILTERED_ARTICLES } from '$gql/queries/blog';
import { fetchCraft } from './craft';

type Variables = {
	limit: number;
	offset: number;
	city: Maybe<string>;
	industry: Maybe<string>;
	role: Maybe<string>;
	category?: Maybe<string>;
	excludedSlug?: Maybe<string>;
};

export const getArticles = async (variables: Variables) => {
	try {
		const { data } = await fetchCraft<{
			items: ArticlesDefault[];
			total: number;
		}>(GET_FILTERED_ARTICLES, variables);
		return {
			items: data?.items || [],
			itemsTotal: data?.total || 0
		};
	} catch (error) {
		console.error(error);
		return { items: [], itemsTotal: 0 };
	}
};
