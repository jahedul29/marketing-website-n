/**
 * Converts a pixel value to a rem value
 * @param px: string | number
 */
export const pxToRem = (px: string | number) => {
	return (Number(px) / 10).toFixed(1);
};
