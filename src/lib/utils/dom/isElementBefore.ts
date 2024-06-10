// https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
// Check if el1 is before el2
export const isElementBefore = (el1: Maybe<HTMLElement>, el2: Maybe<HTMLElement>) => {
	if (!el1 || !el2) {
		return false;
	}
	return (el2.compareDocumentPosition(el1) & Node.DOCUMENT_POSITION_PRECEDING) > 0;
};
