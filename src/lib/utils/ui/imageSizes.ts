type ImageSizeUnits = 'vw' | 'rem';
type ImageSizeMediaQueryUnits = 'px' | 'rem';
type ImageSizeSupportedMediaQuery = 'min-width' | 'max-width';

export type ImageSize = {
	/**
	 * The displayed width of the image
	 */
	width: `${number}${ImageSizeUnits}`;
	/**
	 * An optional media query dictating when the image will be displayed
	 * at this width.
	 */
	mq?: `(${ImageSizeSupportedMediaQuery}: ${number}${ImageSizeMediaQueryUnits})`;
};
export type ImageSizes = ImageSize[];

export const imageSizes = (sizes: ImageSizes): string => {
	return sizes
		.sort((a, b) => {
			// TODO: Make the diff between min-width and max-width
			const useWidth = () => parseInt(b.width, 10) - parseInt(a.width, 10);
			if (a.mq === b.mq) {
				return useWidth();
			} else if (!a.mq) {
				return 1;
			} else if (!b.mq) {
				return -1;
			}
			return useWidth();
		})
		.map((size) => {
			return `${size.mq || ''} ${size.width}`.trim();
		})
		.join(', ')
		.trim();
};

export const SIZES_BP = '(min-width: 800px)';
export const SIZES_FULL: ImageSizes = [{ width: '100vw' }];
export const SIZES_FULL_MOBILE_HALF_DESKTOP: ImageSizes = [
	// Full screen on mobile
	{ width: '100vw' },
	// Half of the viewport width on desktop
	{ width: '50vw', mq: SIZES_BP }
];
export const SIZES_FULL_MOBILE_THIRD_DESKTOP: ImageSizes = [
	// Full screen on mobile
	{ width: '100vw' },
	// ~1/3 of the viewport width on desktop
	{ width: '34vw', mq: SIZES_BP }
];
export const SIZES_HALF_MOBILE_FORTH_DESKTOP: ImageSizes = [
	// 1/2 of the viewport width on desktop
	{ width: '50vw' },
	// 1/4 of the viewport width on desktop
	{ width: '25vw', mq: SIZES_BP }
];
export const SIZES_40_MOBILE_20_DESKTOP: ImageSizes = [
	// 40% of the viewport width on mobile
	{ width: '40vw' },
	// 20% the viewport width on desktop
	{ width: '20vw', mq: SIZES_BP }
];
export const SIZES_FULL_OVERBLOWN_1600: ImageSizes = [
	// Full screen on mobile and desktop
	{ width: '100vw' },
	// Overblown after 1600px
	{ width: `${(1920 / 1600) * 100}vw`, mq: '(min-width: 1600px)' }
];
export const SIZES_ICON: ImageSizes = [{ width: '4.8rem' }, { width: '6rem', mq: SIZES_BP }];
export const SIZES_CARD: ImageSizes = [{ width: '90vw' }, { width: '40rem', mq: SIZES_BP }];

export const cardSizes = (isFeatured: boolean): ImageSizes => {
	return [{ width: isFeatured ? '80rem' : '40rem' }];
};
