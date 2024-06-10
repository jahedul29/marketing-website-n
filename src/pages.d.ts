import type {
	Articles_Default_Entry,
	Blog_Blog_Entry,
	Buttons_Default_Entry,
	Careers_Careers_Entry,
	ContactUsSuppliers_ContactUsSuppliers_Entry,
	Contact_Contact_Entry,
	CustomerStoriesPortal_CustomerStoriesPortal_Entry,
	CustomerStories_Default_Entry,
	FeaturedResourceSeries_Series_BlockType,
	Home_Home_Entry,
	Pages_Default_Entry,
	People_Authors_Entry,
	Press_Press_Entry,
	PricingCards_Default_Entry,
	Pricing_Pricing_Entry,
	LegalPages_Default_Entry,
	ResourcePortals_Default_Entry,
	Resources_Default_Entry,
	ResourceTypes_Category,
	SideCtas_Cta_BlockType,
	Pages_Comparison_Entry
} from './craft';

declare global {
	type HomeEntry = Home_Home_Entry & {
		buttons?: Buttons_Default_Entry[];
	};

	type PagesDefault = Pages_Default_Entry & {
		buttons?: Buttons_Default_Entry[];
	};

	type PagesComparison = Pages_Comparison_Entry & {
		buttons?: Buttons_Default_Entry[];
	};

	type ArticlesDefault = Articles_Default_Entry & {
		blogAuthor?: People_Authors_Entry[];
		articleCta?: ArticleCta[];
	};

	type ResourcesDefault = Resources_Default_Entry & {
		resourceType?: ResourceTypes_Category[];
		blogAuthor?: People_Authors_Entry[];
		articleCta?: ArticleCta[];
	};

	type CustomerStoriesDefault = CustomerStories_Default_Entry & {
		contentBlocks?: CraftEntryWithSvelteComponent[];
	};

	type BlogEntry = Blog_Blog_Entry & {
		featuredArticles?: Articles_Default_Entry[];
	};

	type FeaturedResourcesSeriesBlock = FeaturedResourceSeries_Series_BlockType & {
		resources?: ResourcesDefault[];
	};

	type ResourcePortalsEntry = ResourcePortals_Default_Entry & {
		featuredResources?: ResourcesDefault[];
		featuredResourceSeries: FeaturedResourcesSeriesBlock[];
	};

	type CustomerStoriesPortalEntry = CustomerStoriesPortal_CustomerStoriesPortal_Entry & {
		featuredStories?: CustomerStories_Default_Entry[];
	};

	type PricingCard = PricingCards_Default_Entry & {
		button?: Buttons_Default_Entry[];
	};

	type PricingEntry = Pricing_Pricing_Entry & {
		pricingCards?: PricingCard[];
		buttons?: Buttons_Default_Entry[];
	};

	type LegalPageEntry = LegalPages_Default_Entry & {
		displayTitle: string;
		richText: string;
	};

	type PressEntry = Press_Press_Entry & {
		referencesTotal: number;
	};

	type SideCta = SideCtas_Cta_BlockType & {
		button?: Buttons_Default_Entry[];
	};

	type ContactEntry = Contact_Contact_Entry & {
		sideCtas?: SideCta[];
	};

	type ContactSuppliersEntry = ContactUsSuppliers_ContactUsSuppliers_Entry & {
		sideCtas?: SideCta[];
	};

	type CareersEntry = Careers_Careers_Entry & {
		teamStories?: CraftEntryWithSvelteComponent[];
	};

	type LeverJob = {
		text: string;
		hostedUrl: string;
		categories: {
			commitment: string;
			location: string;
			team: string;
		};
	};
}
