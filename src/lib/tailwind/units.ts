import type { MultiplesOfFour } from './four';
import type { IntegerPercentage } from './percent';

// Constants definitions
type UnsetUnit = 'unset';
type AutoUnit = 'auto';
type FullUnit = 'full';
type OneToTwelve = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
type Distribution = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
type ScrollSnapValues = 'start' | 'center' | 'end' | 'align-none';
type Quadrants =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'middle-left'
	| 'middle-center'
	| 'middle-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right';
type Directions = Inset | 'middle' | 'cover';
type Placements = Quadrants | Directions | UnsetUnit | AutoUnit;
type BorderScale = '0' | '1' | '2' | '4' | '6' | '8';
type FontScale =
	| '10'
	| '20'
	| '30'
	| '40'
	| '50'
	| '60'
	| '70'
	| '80'
	| '90'
	| '100'
	| '110'
	| '120'
	| '140';
type LineScale = '10' | '20' | '30' | '40';
type FractionalScale = '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | '1/5' | '2/5';
// | '3/10'
// | '7/10'
// | '9/10'
// | '3/20'
// | '11/20'
// Custom tailwind jit syntax, supports px and %
type JitScale = `[${number}px]` | `[${number}%]`;

// Responsive containers

// Start with getting combos of the same type value into a type object
// Exemple: type X = '1' | '2' --> { '1': '1|1', '2': '2|2' }
type ResponsiveExclusionsKeys<T extends string> = {
	[U in T]: `${U}|${U}`;
};

// Then convert the members of the type object into a union type
// Example: { '1': '1|1', '2': '2|2' } --> '1|1' | '2|2'
type ResponsiveExclusions<T extends string> =
	ResponsiveExclusionsKeys<T>[keyof ResponsiveExclusionsKeys<T>];

// Responsive<T> allows us to get a single T value or a combinaison
// of two non-repeating T values separated by a pipe.
export type Responsive<T extends string> = Exclude<T | `${T}|${T}`, ResponsiveExclusions<T>>;

// User land types
// Abstract
export type PxUnit = Responsive<MultiplesOfFour>;
export type FractionUnit = Responsive<FractionalScale>;

// Content
export type Justify = Responsive<Distribution>;
export type Align = Responsive<Distribution>;
export type Gap = PxUnit;
export type Rhythm = PxUnit;

// Partition
export type Cols = Responsive<OneToTwelve>;
export type GridTemplate = Responsive<string>;

// Text
export type FontUnit = Responsive<FontScale>;
export type LineUnit = Responsive<LineScale>;

// Dimensions
export type SizeUnit = Responsive<
	MultiplesOfFour | FullUnit | AutoUnit | FractionalScale | JitScale
>;
export type VwUnit = Responsive<IntegerPercentage>;
export type VhUnit = Responsive<IntegerPercentage>;

// Borders
export type BorderUnit = Responsive<BorderScale>;
export type RadiusUnit = Responsive<MultiplesOfFour | FullUnit>;

// Positions
export type Position = Responsive<Placements>;
export type Inset = 'top' | 'right' | 'bottom' | 'left';

// Aspect Ratio
export type Ratio = `${number}` | `${number}:${number}` | AutoUnit;
export type AspectRatio = Responsive<Ratio>;

// Colors
type ColorValue = TW.Colors;
export type Color = Responsive<ColorValue>;

// Scroll snap
export type ScrollSnapAlignment = Responsive<ScrollSnapValues>;
