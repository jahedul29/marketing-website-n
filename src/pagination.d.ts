import type { Articles_Default_Entry } from './craft';

declare global {
	type PaginationItem = Articles_Default_Entry | ResourcesDefault;
	type PaginationItems = PaginationItem[];
}

export default {};
