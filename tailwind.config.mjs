import propToClass from './tailwind/transform/property-to-class.cjs';
import focusVisible from 'postcss-focus-visible';
import scrollbarHide from 'tailwind-scrollbar-hide';
import watchdog from './tailwind/plugins/watchdog.js';
import gridStack from './tailwind/plugins/grid-stack.js';
import env from './env.config.js';

const screenExceptions = ['touch', 'pointer'];

/**
 *
 * @param {string} exceptions
 * @param {Record<string, string | number>} object
 * @returns {Record<string, string | number>}
 */
const except = (exceptions, object) => {
	const output = {};

	Object.keys(object).forEach((key) => {
		if (!exceptions.includes(key)) {
			output[key] = object[key];
		}
	});
	return output;
};

const multipleOfFours = (until = 1200) => {
	const fours = {};
	for (let i = 4; i <= until; i += 4) {
		const value = (i / 10).toFixed(1);
		fours[i] = `${value}rem`;
	}
	return fours;
};

const plugins = [focusVisible, scrollbarHide, gridStack];

if (!env.production) {
	plugins.push(watchdog);
}

/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	plugins,
	future: {
		hoverOnlyWhenSupported: true
	},
	content: {
		files: [
			'src/**/*.svelte',
			// Rebuild when palettes file changes
			'tailwind/palettes.json',
			// Check for classes in those ts files too
			'src/lib/utils/ui/*.ts',
			'src/lib/components/**/*.ts'
		],
		transform: {
			svelte: (content) => {
				content = propToClass(content);
				// Restore Tailwind's own Svelte transform
				// github.com/tailwindlabs/tailwindcss/blob/55653ba0041cf2806f236f00c59307b12f757385/src/jit/lib/expandTailwindAtRules.js#L23
				content = content.replace(/(?:^|\s)class:/g, ' ');
				return content;
			},
			ts: (content) => {
				content = propToClass(content);
				return content;
			}
		}
	},
	theme: {
		screens: {
			min: '360px',
			ip: '430px',
			ph: '620px',
			xs: '760px',
			bp: '800px',
			sm: '890px',
			md: '1120px',
			lg: '1360px',
			xl: '1560px',
			max: '1600px',
			hd: '1920px',
			'2k': '2048px',
			'4k': '3840px',
			touch: { raw: '(hover: none)' },
			pointer: { raw: '(hover: hover) and (pointer: fine)' }
		},
		colors: {
			// Essentials colors
			transparent: 'transparent',
			currentColor: 'currentColor',
			// Project colors
			black: {
				900: {
					alpha: 'rgba(19, 19, 19, 0.9)'
				},
				750: {
					alpha: 'rgba(19, 19, 19, 0.7)'
				},
				500: {
					alpha: 'rgba(19, 19, 19, 0.5)'
				},
				250: {
					alpha: 'rgba(19, 19, 19, 0.3)'
				},
				100: {
					alpha: 'rgba(19, 19, 19, 0.1)'
				}
			},
			grey: {
				900: {
					DEFAULT: '#131313'
				},
				750: {
					DEFAULT: '#A1A6A4'
				},
				500: {
					DEFAULT: '#C7CED1'
				},
				250: {
					DEFAULT: '#E4E7E9'
				},
				100: {
					DEFAULT: '#F1F2F3'
				},
				50: {
					DEFAULT: '#F7F9FA'
				}
			},
			white: {
				DEFAULT: '#FFFFFF',
				900: {
					alpha: 'rgba(255, 255, 255, 0.9)'
				},
				750: {
					alpha: 'rgba(255, 255, 255, 0.7)'
				},
				400: {
					alpha: 'rgba(255, 255, 255, 0.4)'
				},
				200: {
					alpha: 'rgba(255, 255, 255, 0.2)'
				},
				100: {
					alpha: 'rgba(255, 255, 255, 0.1)'
				}
			},
			blue: {
				500: {
					DEFAULT: '#1F8FFF'
				},
				700: {
					DEFAULT: '#0481FD'
				}
			},
			lavender: {
				500: {
					DEFAULT: '#E4D4F7'
				}
			},
			lightblue: {
				300: {
					DEFAULT: '#EDF8FF',
					alpha: 'rgba(194, 230, 255, 0.3)'
				},
				500: {
					DEFAULT: '#C2E6FF'
				}
			},
			mint: {
				500: {
					DEFAULT: '#C4EEE3'
				}
			},
			greentea: {
				500: {
					DEFAULT: '#DDF0C2'
				}
			},
			watermelon: {
				500: {
					DEFAULT: '#FFD2C2'
				}
			},
			wheat: {
				700: {
					DEFAULT: '#F4A000'
				},
				500: {
					DEFAULT: '#FFEAC2',
					alpha: 'rgba(255, 234, 194, 0.5)'
				},
				200: {
					alpha: 'rgba(255, 234, 194, 0.2)'
				}
			},
			champagne: {
				500: {
					DEFAULT: '#E2D4CF'
				}
			},
			red: {
				500: {
					DEFAULT: 'rgba(240, 70, 70, 1)'
				}
			}
		},
		fill: ({ theme }) => theme('colors'),
		/* PxUnit */
		spacing: ({ theme }) => ({
			0: '0',
			...multipleOfFours(),
			'1/2': '50%',
			'1/3': 'calc(100% / 3 * 1)',
			'2/3': 'calc(100% / 3 * 2)',
			'1/4': '25%',
			'3/4': '75%',
			'1/5': '20%',
			'2/5': '40%',
			'3/10': '30%',
			'7/10': '70%',
			'9/10': '90%',
			'3/20': '15%',
			'11/20': '55%',
			full: '100%',
			...except(screenExceptions, theme('screens'))
		}),
		/* SizeUnit */
		maxWidth: ({ theme }) => ({
			none: 'none',
			auto: 'auto',
			...theme('spacing')
		}),
		/* SizeUnit */
		minWidth: ({ theme }) => ({
			none: 'none',
			auto: 'auto',
			...theme('spacing')
		}),
		/* SizeUnit */
		maxHeight: ({ theme }) => ({
			none: 'none',
			auto: 'auto',
			...theme('spacing')
		}),
		/* SizeUnit */
		minHeight: ({ theme }) => ({
			none: 'none',
			auto: 'auto',
			...theme('spacing')
		}),
		/* SizeUnit */
		inset: ({ theme }) => ({
			none: 'none',
			auto: 'auto',
			...theme('spacing')
		}),
		/* PxUnit */
		gap: {
			0: '0',
			...multipleOfFours()
		},
		fontFamily: {
			base: ['Aeonik', 'sans-serif']
		},
		fontSize: {
			8: ['0.8rem', { letterSpacing: '0.01px' }],
			14: ['1.4rem', { letterSpacing: '0.01px' }],
			16: ['1.6rem', { letterSpacing: '0.01px' }],
			20: ['2rem', { letterSpacing: '0.01px' }],
			26: '2.6rem',
			28: '2.8rem',
			32: '3.2rem',
			40: '4rem',
			48: '4.8rem',
			60: '6rem',
			72: '7.2rem'
		},
		lineHeight: {
			10: '1',
			20: '1.15',
			30: '1.4',
			40: '1.5'
		},
		/* BorderUnit */
		borderWidth: {
			0: '0',
			1: '1px',
			2: 'max(1px, 0.2rem)',
			4: 'max(2px, 0.4rem)',
			6: 'max(3px, 0.6rem)',
			8: 'max(4px, 0.8rem)'
		},
		borderRadius: {
			0: '0',
			...multipleOfFours(),
			full: '9999px'
		},
		letterSpacing: {
			10: '0.15rem'
		},
		extend: {
			height: (theme) => ({
				screen: '100vh',
				fold: `calc(100vh - ${theme('spacing.header')})`
			}),
			minHeight: (theme) => ({
				screen: '100vh',
				fold: `calc(100vh - ${theme('spacing.header')})`
			}),
			gridColumnEnd: {
				'-1': '-1',
				'-2': '-2',
				'-3': '-3',
				'-4': '-4',
				'-5': '-5',
				'-6': '-6',
				'-7': '-7',
				'-8': '-8',
				'-9': '-9',
				'-10': '-10',
				'-11': '-11',
				'-12': '-12'
			},
			gridRowEnd: {
				'-1': '-1'
			},
			zIndex: {
				'-1': '-1'
			},
			transitionTimingFunction: {
				'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)'
			},
			boxShadow: (theme) => ({
				100: `0px 8px 40px ${theme('colors.black.100.alpha')}`,
				500: `0px 8px 24px ${theme('colors.black.100.alpha')}`,
				600: `0px 16px 40px 2px ${theme('colors.black.100.alpha')}`,
				700: `0px 4px 4px ${theme('colors.black.100.alpha')}`
			}),
			backdropBlur: {
				900: '16px',
				700: '5px',
				300: '4px'
			},
			brightness: {
				300: '3',
				400: '4'
			}
		}
	}
};
