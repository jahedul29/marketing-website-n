import type {
	ArticleCta_Cta_BlockType,
	Buttons_Default_Entry,
	Configuration_GlobalSet,
	DefaultCtas_GlobalSet,
	FooterDrawers_Drawer_BlockType,
	FooterLinkGroups_LinkGroup_BlockType,
	Footer_GlobalSet,
	Header_GlobalSet,
	MainNav_Link_BlockType,
	MainNav_SubMenu_BlockType,
	Newsletter_GlobalSet,
	SubMenuSectionSectionEntryUnion,
	Banner_GlobalSet,
	Search_GlobalSet,
	EventTypes_Category
} from './craft';

declare global {
	type MainNavSubMenu = MainNav_SubMenu_BlockType & {
		subMenuSections?: SubMenuSectionSectionEntryUnion[];
	};

	type MainNavLink = MainNav_Link_BlockType & {
		button?: Buttons_Default_Entry[];
	};

	type MainNav = MainNavLink | MainNavSubMenu;

	type HeaderGlobalSet = Header_GlobalSet & {
		mainNav?: MainNav[];
		mainCta?: Buttons_Default_Entry[];
		mainCtaMobile?: Buttons_Default_Entry[];
		secondaryNav?: Buttons_Default_Entry[];
	};

	type FooterDrawer = FooterDrawers_Drawer_BlockType & {
		buttons?: Buttons_Default_Entry[];
	};

	type FooterLinkGroup = FooterLinkGroups_LinkGroup_BlockType & {
		buttons?: Buttons_Default_Entry[];
	};

	type FooterGlobalSet = Footer_GlobalSet & {
		footerDrawers?: FooterDrawer[];
		footerLinkGroups?: FooterLinkGroup[];
		legalNav?: Buttons_Default_Entry[];
	};

	type ArticleCta = ArticleCta_Cta_BlockType & {
		button?: Buttons_Default_Entry[];
	};

	type DefaultCtasGlobalSet = DefaultCtas_GlobalSet & {
		articleCta?: ArticleCta[];
	};

	type GlobalSets = {
		config?: Configuration_GlobalSet;
		header?: HeaderGlobalSet;
		footer?: FooterGlobalSet;
		newsletter?: Newsletter_GlobalSet;
		banner?: Banner_GlobalSet;
		search?: Search_GlobalSet;
		eventTypes?: EventTypes_Category[];
	};
}
