const PROJECT = {
	// Add your project specific translations here.
	// You can also override default translations here.
	// key: 'value'
	socialShares: {
		facebookShare: 'Share on Facebook',
		twitterShare: 'Share on Twitter',
		mailShare: 'Share by email',
		share: 'Share'
	},
	errorPage: {
		title: 'An error occured',
		pageNotFound: 'Oops! Nothing to see here.',
		serverError: 'Server error',
		notFoundText: 'Sometimes things don’t go as planned. Care to try again?',
		serverErrorText:
			'Sometimes things don’t go as planned. It seems like our servers are having some difficulty.',
		linkLabel: 'Go to homepage'
	},
	banner: {
		dismiss: 'Dismiss'
	},
	articles: {
		tableOfContentTitle: "What's in this article",
		blogArticle: 'Blog article',
		readTimeLabel: 'read',
		writtenOn: 'Written on',
		shareArticle: 'Share this article',
		shareResource: 'Share this resource',
		relatedArticles: 'Related articles that could interest you',
		relatedResources: 'Other resources that may be useful for you',
		relatedStories: 'Other success stories',
		customerStory: 'Customer story'
	},
	cards: {
		readArticle: 'Read the article',
		readStory: 'Read story'
	},
	blog: {
		exploreByCategories: 'Explore by categories',
		featuredArticle: 'Featured article',
		featuredArticles: 'Featured articles',
		featuredResource: 'Featured resource',
		featuredResources: 'Featured resources',
		featuredStory: 'Featured story',
		featuredStories: 'Featured stories',
		allArticles: 'All articles',
		allResources: 'All resources',
		allStories: 'All success stories',
		filters: {
			allCities: 'All cities',
			allIndustries: 'All industries',
			allRoles: 'All roles',
			allTypes: 'All types'
		},
		noResults: 'No results found',
		goToBlog: 'Go to the complete blog'
	},
	forms: {
		subscribe: 'Subscribe',
		notifyMe: 'Notify me',
		emailLabel: 'Email address',
		loading: 'Loading',
		success: 'Success',
		emailInvalid: 'Please provide a valid email address',
		firstnameRequired: 'Please provide your first name',
		lastnameRequired: 'Please provide your last name',
		companyRequired: 'Please provide your company name',
		messageRequired: 'Please write a message',
		optional: 'optional'
	},
	press: {
		mediaInquiriesTitle: 'Media inquiries',
		brandKitTitle: 'Brand kit',
		referencesTitle: 'As seen in',
		download: 'Download',
		showMore: 'Show more',
		loading: 'Loading...'
	},
	contact: {
		officesTitle: 'Our offices',
		googleMapsLabel: 'See on map',
		form: {
			firstNameLabel: 'First name',
			lastNameLabel: 'Last name',
			businessEmailLabel: 'Business email',
			companyLabel: 'Company',
			phoneLabel: 'Phone number',
			messageLabel: 'Message',
			submitLabel: 'Submit'
		}
	},
	careers: {
		seeJobs: 'See job openings',
		showMoreStories: 'Show more'
	},
	search: {
		label: 'Search',
		city: 'City',
		cityPlaceholder: 'All cities'
	},
	pages: {
		seeFeature: 'See feature'
	},
	media: {
		play: 'Play video'
	},
	features: {
		comingSoon: 'Coming soon',
		available: 'Available',
		unavailable: 'Unavailable',
		unknown: 'Unknown'
	}
} as const;

export type ProjectTranslations = typeof PROJECT;

const DEFAULTS = {
	languages: {
		fr: 'Français',
		en: 'English'
	},
	srNav: {
		skipToNav: 'Skip to navigation',
		skipToContent: 'Skip to content'
	},
	socialShares: {
		facebookShare: 'Share on Facebook',
		twitterShare: 'Share on Twitter',
		mailShare: 'Share by email'
	},
	copyOnClick: {
		copyUrl: 'Copy url',
		urlCopied: 'Url copied!'
	},
	errorPage: {
		title: 'An error occurred',
		pageNotFound: 'Page not found',
		serverError: 'Server error'
	},
	media: {
		play: 'Play'
	},
	pagination: {
		prevPage: 'Previous page',
		nextPage: 'Next page',
		filter: 'Filter',
		loadMore: 'Load more'
	},
	slideshow: {
		prevSlide: 'Next slide',
		nextSlide: 'Previous slide'
	},
	navMain: 'Main navigation',
	navSecondary: 'Secondary navigation',
	navLegal: 'Legal navigation',
	home: 'Home',
	close: 'Close',
	back: 'Back',
	credits: 'Credits',
	error: '{status} Error',
	now: 'now',
	cookieBanner: {
		accept: 'Accept',
		deny: 'Reject'
	}
} as const;

export type DefaultTranslations = typeof DEFAULTS;

export const en = {
	...DEFAULTS,
	...PROJECT
} as const;
