import { test, expect } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const propToClass = require('../../../tailwind/transform/property-to-class.cjs');

describe('duplicateResponsiveAttributes()', () => {
	test('no effect', () => {
		const res = propToClass.duplicateResponsiveAttributes(
			'this is content test="value" random'
		);
		expect(res).toBe('this is content test="value" random');
	});

	test('broken tag', () => {
		const res = propToClass.duplicateResponsiveAttributes(
			'this is> content <test="value" random'
		);
		expect(res).toBe('this is> content <test="value" random');
	});

	test('duplicates', () => {
		const res = propToClass.duplicateResponsiveAttributes(
			'this is content test="mobile|desktop" random'
		);
		expect(res).toBe('this is content test="mobile" bp:test="desktop" random');
	});

	test('duplicates with :', () => {
		const res = propToClass.duplicateResponsiveAttributes(
			'<tag ratio="4:3|16:9" random></tag>'
		);
		expect(res).toBe('<tag ratio="4:3" bp:ratio="16:9" random></tag>');
	});
});

describe('convertToTailwindClasses()', () => {
	test('no effect', () => {
		const res = propToClass.convertToTailwindClasses('this is content test="value" random');
		expect(res).toBe('this is content test="value" random');
	});

	test('width', () => {
		const res = propToClass.convertToTailwindClasses('this is content width="4" random');
		expect(res).toBe('this is content w-4 min-w-4 random');
	});

	test('bp:width', () => {
		const res = propToClass.convertToTailwindClasses('this is content bp:width="4" random');
		expect(res).toBe('this is content bp:w-4 bp:min-w-4 random');
	});

	test('multiple width', () => {
		const res = propToClass.convertToTailwindClasses(
			'this width="4" width="8" bp:width="10" width="12"'
		);
		expect(res).toBe('this w-4 min-w-4 w-8 min-w-8 bp:w-10 bp:min-w-10 w-12 min-w-12');
	});

	test('aspect-ratio', () => {
		const res = propToClass.convertToTailwindClasses('this ratio="4:3" bp:ratio="16:9"');
		expect(res).toBe('this aspect-[4/3] bp:aspect-[16/9]');
	});

	test('aspect-ratio + viewport', () => {
		const res = propToClass.convertToTailwindClasses('this ratio="4:3" bp:viewport="1";');
		expect(res).toBe('this aspect-[4/3] bp:w-[1vw];');
	});

	test('camel case', () => {
		const res = propToClass.convertToTailwindClasses('export borderColor="black";');
		expect(res).toBe('export border-black;');
	});

	test('similar class name', () => {
		const res = propToClass.convertToTailwindClasses(
			'export text="t"; export border="black"; export borderColor="white";'
		);
		expect(res).toBe('export text-t; export border-black; export border-white;');
	});
});

describe('resolveTypesScriptAttributesValues()', () => {
	test('complete test', () => {
		const res = propToClass.resolveTypesScriptAttributesValues(
			` export let borderColor: TW.Colors = 'black'; `
		);
		expect(res).toBe(' export borderColor="black" ');
	});
	test('no type', () => {
		const res = propToClass.resolveTypesScriptAttributesValues(
			` export let borderColor = 'black'; `
		);
		expect(res).toBe(' export borderColor="black" ');
	});
	test('integer value', () => {
		const res = propToClass.resolveTypesScriptAttributesValues(` export let borderSize = 12; `);
		expect(res).toBe(' export borderSize="12" ');
	});
	test('float value', () => {
		const res = propToClass.resolveTypesScriptAttributesValues(
			` export let borderSize = 12.2; `
		);
		expect(res).toBe(' export borderSize="12.2" ');
	});
});

describe('resolveJavaScriptObjectAttributesValues()', () => {
	test('single line test', () => {
		const res = propToClass.resolveJavaScriptObjectAttributesValues(
			` { borderColor: 'black', padding: '4' } `
		);
		expect(res).toBe(' {  borderColor="black" ,  padding="4"  } ');
	});

	test('multiline line test', () => {
		const res = propToClass.resolveJavaScriptObjectAttributesValues(
			` {
			borderColor: 'black',
			padding: '4',
			cols: '12'
		} `
		);
		expect(res).toBe(` {
			 borderColor="black" ,
			 padding="4" ,
			 cols="12" 
		} `);
	});
});

describe('propToClass()', () => {
	test('svelte', () => {
		const res = propToClass('<Slider width="200|400" ratio="4:3" cols="12" />');
		expect(res).toBe(
			'<Slider w-200 min-w-200 bp:w-400 bp:min-w-400 aspect-[4/3] grid-cols-12 />'
		);
	});

	test('js', () => {
		const res = propToClass(`
		export let text: string = 'red';
		export let width: TW.Width | string | number = '12';
		export let styles = {
			cols: '12'
		};
		// unknown props
		export let somePadding = 12;
		const c = tailwindify('p', somePadding)
	`);
		expect(res).toBe(`
		export text-red
		export w-12 min-w-12
		export let styles = {
			 grid-cols-12 
		};
		// unknown props
		export p-12
		const c = tailwindify('p', somePadding)
	`);
	});
});

describe('extractTailwindifiedProps()', () => {
	test('no match', () => {
		expect(propToClass.extractTailwindifiedProps('')).toMatchObject({});
		expect(propToClass.extractTailwindifiedProps('')).not.toBeFalsy();
		expect(propToClass.extractTailwindifiedProps('test')).toMatchObject({});
		expect(propToClass.extractTailwindifiedProps('test')).not.toBeFalsy();
	});

	test('match single line', () => {
		expect(propToClass.extractTailwindifiedProps(`tailwindify('w', wid);`)).toMatchObject({
			wid: 'w'
		});
		expect(propToClass.extractTailwindifiedProps(`tailwindify('h', h)`)).toMatchObject({
			h: 'h'
		});
	});
	test('match multi-line', () => {
		expect(
			propToClass.extractTailwindifiedProps(`
			const c = tailwindify('w', wid);
		`)
		).toMatchObject({
			wid: 'w'
		});
	});

	test('match withMin', () => {
		expect(
			propToClass.extractTailwindifiedProps(`
			const c = tailwindifyWithMin('w', wid);
		`)
		).toMatchObject({
			wid: ['w', 'min-w']
		});
	});

	test('match aspectRatio', () => {
		expect(
			propToClass.extractTailwindifiedProps(`
			const c = tailwindifyAspectRatio(as);
		`)
		).toMatchObject({
			as: 'ratio'
		});
	});

	test('match multiple', () => {
		expect(
			propToClass.extractTailwindifiedProps(`
			const c = tailwindify('w', wid);
			const c = tailwindify('h', hhhhh);
			const c = tailwindifyWithMin('w', www);
			const c = tailwindifyAspectRatio(as);
		`)
		).toMatchObject({
			wid: 'w',
			hhhhh: 'h',
			www: ['w', 'min-w'],
			as: 'ratio'
		});
	});

	test('allow duplicate', () => {
		expect(
			propToClass.extractTailwindifiedProps(`
			const c = tailwindify('w', wid);
			const c = tailwindify('w', wid);
			const c = tailwindify('w', wid);
		`)
		).toMatchObject({
			wid: 'w'
		});
	});

	test('prevent prop reuse', () => {
		expect(() =>
			propToClass.extractTailwindifiedProps(`
			const c = tailwindify('w', wid);
			const c = tailwindify('h', wid);
		`)
		).toThrowError();
	});
});
