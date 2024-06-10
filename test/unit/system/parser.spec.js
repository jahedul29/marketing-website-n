import { test, expect } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const parser = require('../../../system/parser.cjs');

test('getPropsFromString: Extract simple props', () => {
	const props = parser.getPropsFromString(`
	<!-- This is an ignored comment -->
	<!--@docs This is a documentation comment -->
	<script lang="ts">
	export let padding: Maybe<PxUnit> = null;
	export let background: Color = null;
	export const color: TW.Color = null;
	export let text: FontUnit = null;
	export let lineHeight: LineUnit = null;
	export let width: SizeUnit = null;
	export let height: SizeUnit = null;
	export let border: BorderUnit = null;
	export let radius: RadiusUnit = null; // Extra comment at the end
	let borderColor: TW.Color = null; // This is not a prop
	export let borderStyle = 'solid';
	export let invertedTheme = false;
	</script>
	`);
	expect(props).toEqual([
		{
			raw: 'export let padding: Maybe<PxUnit> = null;',
			jsdoc: undefined,
			keyword: 'let',
			name: 'padding',
			type: 'Maybe<PxUnit>',
			value: 'null',
			index: 26
		},
		{
			raw: 'export let background: Color = null;',
			jsdoc: undefined,
			keyword: 'let',
			name: 'background',
			type: 'Color',
			value: 'null',
			index: 69
		},
		{
			raw: 'export const color: TW.Color = null;',
			jsdoc: undefined,
			keyword: 'const',
			name: 'color',
			type: 'TW.Color',
			value: 'null',
			index: 107
		},
		{
			raw: 'export let text: FontUnit = null;',
			jsdoc: undefined,
			keyword: 'let',
			name: 'text',
			type: 'FontUnit',
			value: 'null',
			index: 145
		},
		{
			raw: 'export let lineHeight: LineUnit = null;',
			jsdoc: undefined,
			keyword: 'let',
			name: 'lineHeight',
			type: 'LineUnit',
			value: 'null',
			index: 180
		},
		{
			raw: 'export let width: SizeUnit = null;',
			jsdoc: undefined,
			keyword: 'let',
			name: 'width',
			type: 'SizeUnit',
			value: 'null',
			index: 221
		},
		{
			raw: 'export let height: SizeUnit = null;',
			jsdoc: undefined,
			keyword: 'let',
			name: 'height',
			type: 'SizeUnit',
			value: 'null',
			index: 257
		},
		{
			raw: 'export let border: BorderUnit = null;',
			jsdoc: undefined,
			keyword: 'let',
			name: 'border',
			type: 'BorderUnit',
			value: 'null',
			index: 294
		},
		{
			raw: 'export let radius: RadiusUnit = null;',
			jsdoc: undefined,
			keyword: 'let',
			name: 'radius',
			type: 'RadiusUnit',
			value: 'null',
			index: 333
		},
		{
			raw: "export let borderStyle = 'solid';",
			jsdoc: undefined,
			keyword: 'let',
			name: 'borderStyle',
			type: 'string',
			value: "'solid'",
			index: 457
		},
		{
			raw: 'export let invertedTheme = false;',
			jsdoc: undefined,
			keyword: 'let',
			name: 'invertedTheme',
			type: 'boolean',
			value: 'false',
			index: 492
		}
	]);
});

test('getPropsFromString: Extract multiline jsdoc', () => {
	const props = parser.getPropsFromString(`
	<!-- This is a comment -->
	<script lang="ts">
	/**
	 * This is some jsdoc
	 */
	export let padding: Maybe<PxUnit> = 10;
	`);

	expect(props).toEqual([
		{
			raw: `/**
	 * This is some jsdoc
	 */
	export let padding: Maybe<PxUnit> = 10;`,
			jsdoc: `This is some jsdoc`,
			keyword: 'let',
			name: 'padding',
			type: 'Maybe<PxUnit>',
			value: '10',
			index: 24
		}
	]);
});

test('getPropsFromString: Extract non-greedy jsdoc', () => {
	const props = parser.getPropsFromString(`
	<!-- This is a comment -->
	<script lang="ts">
	/**
	 * Since this is not exported, it should not be picked up
	 */
	const test = 10;

	/**
	 * This is the proper jsdoc
	 */
	export let padding: Maybe<PxUnit> = 10;

	/**
	 * This is the 2nd proper jsdoc
	 */
	export const padding2: Maybe<PxUnit> = 20;
	`);

	expect(props).toEqual([
		{
			// The raw value can include jsdoc from non-exported variables and constants
			raw: `/**
	 * Since this is not exported, it should not be picked up
	 */
	const test = 10;

	/**
	 * This is the proper jsdoc
	 */
	export let padding: Maybe<PxUnit> = 10;`,
			jsdoc: `This is the proper jsdoc`,
			keyword: 'let',
			name: 'padding',
			type: 'Maybe<PxUnit>',
			value: '10',
			index: 24
		},
		{
			raw: `/**
	 * This is the 2nd proper jsdoc
	 */
	export const padding2: Maybe<PxUnit> = 20;`,
			jsdoc: `This is the 2nd proper jsdoc`,
			keyword: 'const',
			name: 'padding2',
			type: 'Maybe<PxUnit>',
			value: '20',
			index: 193
		}
	]);
});

test('getPropsFromString: Extract multiline values', () => {
	const props = parser.getPropsFromString(`
	<!-- This is a comment -->
	<script lang="ts">
	/**
	 * This is some jsdoc
	 */
	export let test = \`
	test
	\`;

	export let test1 = [
		1, 2, 3
	];

	export const fn = (
		test: string
	) => {
		// Comment
		return 42;
	};

	`);

	expect(props).toEqual([
		{
			raw: `/**
	 * This is some jsdoc
	 */
	export let test = \`
	test
	\`;`,
			jsdoc: `This is some jsdoc`,
			keyword: 'let',
			name: 'test',
			type: 'string',
			value: `\`
	test
	\``,
			index: 24
		},
		{
			raw: `export let test1 = [
		1, 2, 3
	];`,
			jsdoc: undefined,
			keyword: 'let',
			name: 'test1',
			type: 'array',
			value: `[
		1, 2, 3
	]`,
			index: 89
		},
		{
			raw: `export const fn = (
		test: string
	) => {
		// Comment
		return 42;`,
			jsdoc: undefined,
			keyword: 'const',
			name: 'fn',
			type: 'function',
			value: `(
		test: string
	) => { ... }`,
			index: 126
		}
	]);
});

test('getPropsFromString: Extract complex types', () => {
	const props = parser.getPropsFromString(`
	<!-- This is a comment -->
	<script lang="ts">
	export let test: string | null | undefined = null;

	export let test1: number[] = [
		1, 2, 3
	];

	`);

	expect(props).toEqual([
		{
			raw: `export let test: string | null | undefined = null;`,
			keyword: 'let',
			name: 'test',
			type: 'string | null | undefined',
			value: `null`,
			index: 24,
			jsdoc: undefined
		},
		{
			raw: `export let test1: number[] = [
		1, 2, 3
	];`,
			jsdoc: undefined,
			keyword: 'let',
			name: 'test1',
			type: 'number[]',
			value: `[
		1, 2, 3
	]`,
			index: 77
		}
	]);
});

test('getImportsFromString: Extract imports', () => {
	const imports = parser.getImportsFromString(`
	<!-- This is a comment -->
	<script lang="ts">
	import { Button } from 'core';
	import { type Frame } from '$lib/Frame.svelte';
	import Frame2 from '$lib/Frame2.svelte';
	import type Frame3 from '$lib/Frame3.svelte';
	import { type Frame4, Frame5 } from '$lib/Frame45.svelte';
	`);

	expect(imports).toEqual([
		{
			raw: "import { Button } from 'core';",
			name: 'Button',
			path: 'core',
			single: false,
			index: 50
		},
		{
			raw: "import { type Frame } from '$lib/Frame.svelte';",
			name: 'Frame',
			path: '$lib/Frame.svelte',
			single: false,
			index: 82
		},
		{
			raw: "import Frame2 from '$lib/Frame2.svelte';",
			name: 'Frame2',
			path: '$lib/Frame2.svelte',
			single: true,
			index: 131
		},
		{
			raw: "import type Frame3 from '$lib/Frame3.svelte';",
			name: 'Frame3',
			path: '$lib/Frame3.svelte',
			single: true,
			index: 173
		},
		{
			raw: "import { type Frame4, Frame5 } from '$lib/Frame45.svelte';",
			name: 'Frame4',
			path: '$lib/Frame45.svelte',
			single: false,
			index: 220
		},
		{
			raw: "import { type Frame4, Frame5 } from '$lib/Frame45.svelte';",
			name: 'Frame5',
			path: '$lib/Frame45.svelte',
			single: false,
			index: 220
		}
	]);
});

test('getChildrenFromString: Extract children', () => {
	const children = parser.getChildrenFromString(`
	<!-- This is a comment -->
	<script lang="ts">
		import Frame from '$lib/Frame.svelte';
	</script>

	<Frame test="1" background={color} {active}>
		<Frame test="2"></Frame>
		<Section>
			< 
				Article test="3"
				background={color}
			>
				<p>Text</p>
			</Article>
		</Section>
	</Frame>

	<Image test="4" src="test.png" />

	<style>
		.css {

		}
	</style>
	`);

	expect(children).toEqual([
		{
			raw: '<Frame test="1" background={color} {active}>',
			component: 'Frame',
			props: 'test="1" background={color} {active}',
			import: {
				raw: "import Frame from '$lib/Frame.svelte';",
				name: 'Frame',
				path: '$lib/Frame.svelte',
				single: true,
				index: 51
			},
			index: 7
		},
		{
			raw: '<Frame test="2">',
			component: 'Frame',
			props: 'test="2"',
			import: {
				raw: "import Frame from '$lib/Frame.svelte';",
				name: 'Frame',
				path: '$lib/Frame.svelte',
				single: true,
				index: 51
			},
			index: 54
		},
		{ raw: '<Section>', component: 'Section', props: '', import: undefined, index: 81 },
		{
			raw: '< \n\t\t\t\tArticle test="3"\n\t\t\t\tbackground={color}\n\t\t\t>',
			component: 'Article',
			props: 'test="3"\n\t\t\t\tbackground={color}',
			index: 94
		},
		{
			raw: '<Image test="4" src="test.png" />',
			component: 'Image',
			props: 'test="4" src="test.png" /',
			index: 201
		}
	]);
});

test('getDocumentationFromString: Extract documentation', () => {
	const documentation = parser.getDocumentationFromString(`

<!--@docs  
This is some markdown!

Yeah !
-->

	<!-- 
		This one will be ignored
	-->

	<!-- This one also -->

	<!--@docs This is a documentation comment -->

	/** This one too */

	/**@docs This is markdown from javascript docs
	 * 
	 * You can use *multiple* lines!
	 */
	`);

	expect(documentation).toEqual([
		{
			raw: `<!--@docs  
This is some markdown!

Yeah !
-->`,
			source: `This is some markdown!

Yeah !`,
			html: undefined,
			index: 0,
			tokens: [
				{
					type: 'text',
					lines: ['This is some markdown!', '', 'Yeah !']
				}
			]
		},
		{
			raw: `<!--@docs This is a documentation comment -->`,
			source: `This is a documentation comment`,
			html: undefined,
			index: 112,
			tokens: [
				{
					type: 'text',
					lines: ['This is a documentation comment']
				}
			]
		},
		{
			raw: `/**@docs This is markdown from javascript docs
	 * 
	 * You can use *multiple* lines!
	 */`,
			source: `This is markdown from javascript docs

You can use *multiple* lines!`,
			html: undefined,
			index: 182,
			tokens: [
				{
					type: 'text',
					lines: [
						'This is markdown from javascript docs',
						'',
						'You can use *multiple* lines!'
					]
				}
			]
		}
	]);
});

test('getDocumentationFromString: Processes @include from documentation', () => {
	const documentation = parser.getDocumentationFromString(`
<!--@docs
This is a test
@include path/to/file.md

This is another test
@include path/to/another/file.md
-->
	`);

	expect(documentation).toEqual([
		{
			raw: `<!--@docs
This is a test
@include path/to/file.md

This is another test
@include path/to/another/file.md
-->`,
			source: `This is a test
@include path/to/file.md

This is another test
@include path/to/another/file.md`,
			html: undefined,
			index: 0,
			tokens: [
				{
					type: 'text',
					lines: ['This is a test']
				},
				{
					type: 'include',
					path: 'path/to/file.md'
				},
				{
					type: 'text',
					lines: ['', 'This is another test']
				},
				{
					type: 'include',
					path: 'path/to/another/file.md'
				}
			]
		}
	]);
});

test('getDocumentationFromString: Extract @exec from documentation', () => {
	const documentation = parser.getDocumentationFromString(`
<!--@docs
\`\`\`js
// This is a js code block
\`\`\`

@exec +page.ts
\`\`\`ts
This is an executable code block
\`\`\`

@exec Example.svelte
\`\`\`svelte
This is an executable component
\`\`\`

\`\`\`js
// This is another js code block
\`\`\`

With some text at the end

-->
	`);

	expect(documentation).toEqual([
		{
			raw: `<!--@docs
\`\`\`js
// This is a js code block
\`\`\`

@exec +page.ts
\`\`\`ts
This is an executable code block
\`\`\`

@exec Example.svelte
\`\`\`svelte
This is an executable component
\`\`\`

\`\`\`js
// This is another js code block
\`\`\`

With some text at the end

-->`,
			source: `\`\`\`js
// This is a js code block
\`\`\`

@exec +page.ts
\`\`\`ts
This is an executable code block
\`\`\`

@exec Example.svelte
\`\`\`svelte
This is an executable component
\`\`\`

\`\`\`js
// This is another js code block
\`\`\`

With some text at the end`,
			index: 0,
			tokens: [
				{
					type: 'text',
					lines: ['```js', '// This is a js code block', '```', '']
				},
				{
					type: 'exec',
					path: '+page.ts',
					comp: null,
					code: null,
					lines: ['```ts', 'This is an executable code block', '```']
				},
				{
					type: 'text',
					lines: ['']
				},
				{
					type: 'exec',
					path: 'Example.svelte',
					comp: 'Example',
					code: '<Example />',
					lines: ['```svelte', 'This is an executable component', '```']
				},
				{
					type: 'text',
					lines: [
						'',
						'```js',
						'// This is another js code block',
						'```',
						'',
						'With some text at the end'
					]
				}
			]
		}
	]);
});
