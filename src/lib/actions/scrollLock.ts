let overflow: string;
let paddingRight: string;
let scrollbarWidth: number;

const lockScroll = () => {
	overflow = document.body.style.overflow;
	paddingRight = document.body.style.paddingRight;
	scrollbarWidth = window.innerWidth - document.body.clientWidth;

	document.body.style.overflow = 'hidden';
	document.body.style.paddingRight = `${scrollbarWidth}px`;
};

const unlockScroll = () => {
	document.body.style.overflow = overflow;
	document.body.style.paddingRight = paddingRight;
};

export const scrollLock = (_: HTMLElement, condition: boolean) => {
	if (condition) {
		lockScroll();
	}

	return {
		update(condition: boolean) {
			if (condition) {
				lockScroll();
			} else {
				unlockScroll();
			}
		},
		destroy() {
			unlockScroll();
		}
	};
};
