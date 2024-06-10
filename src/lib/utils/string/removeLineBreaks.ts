export const removeLineBreaks = (text: string) => {
	return text.replace(/\r|\n|\t/g, '');
};
