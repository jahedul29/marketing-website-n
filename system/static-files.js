import { writeFile, mkdir, copyFile } from 'fs/promises';

const LAYOUT_PATH = './src/routes/(docs)/+layout.svelte';
const PAGE_PATH = './src/routes/(docs)/docs/+page.svelte';

const LAYOUT_FILE = `<script lang="ts">
	import FlyPageTransition from '$lib/components/ui/FlyPageTransition.svelte';
	import FileList from '$lib/../routes/(docs)/FileList.svelte';
	import FlowY from '$lib/components/ui/FlowY.svelte';
	import Matrix from '$lib/components/ui/Matrix.svelte';
	import ScrollY from '$lib/components/ui/ScrollY.svelte';
	import Scene from '$lib/components/ui/Scene.svelte';
	import Frame from '$lib/components/ui/Frame.svelte';
	import type { PxUnit } from '$lib/tailwind/units';

	const rhythm: PxUnit = '20|32'; // gap="20|32" padding="20|32"
</script>

<Scene>
	<Frame padding={rhythm}>
		<Matrix colsTemplate="min-content,auto" gap={rhythm}>
			<ScrollY>
				<FlowY gap={rhythm}>
					<div class="text-100 leading-40">
						<a href="/docs">Menu</a>
					</div>
					<FileList />
				</FlowY>
			</ScrollY>
			<ScrollY>
				<FlyPageTransition>
					<main id="content">
						<slot />
					</main>
				</FlyPageTransition>
			</ScrollY>
		</Matrix>
	</Frame>
</Scene>

<style>
	:global(._prose code) {
		color: #bc0;
	}
	:global(._prose pre code) {
		background-color: #000;
		color: #bc0;
		padding: 1rem;
	}
</style>
`;

const PAGE_FILE = `<script lang="ts">
	import Stack from '$lib/components/ui/Stack.svelte';
	import Prose from '$lib/components/ui/Prose.svelte';
</script>

<Stack>
	<Prose>
		<h1>UI catalog</h1>
		<p>
			The following is a list of the UI elements that exists in our vocabulary to describe UI
			trees. It is divided into catagories that are responsible for a single thing.
		</p>
		<h2>Design goals</h2>
		<ol>
			<li>
				The main goal is to create <strong>composable</strong> elements. They must always work
				(when it makes sense) without regards to their parent.
			</li>
			<li>
				We want to maintain a high degree of <strong>cohesiveness</strong>. Elements should
				be responsible for a single thing and only have one reason to change.
				Responsibilities should be removable.
			</li>
			<li>
				Elements should expose a <strong>minimal API</strong>, ideally without any direct
				ways to edits classes. This should align with the open-closed principal.
			</li>
			<li>
				Elements can be <strong>copied</strong> into new version if the need to customize them
				arises.
			</li>
			<li>
				The designs principles are guidelines, but <strong>baling out</strong> is a valid solution.
				Only changing an element into another version of itself should be required.
			</li>
			<li>We favor readability and predictability over optimisation.</li>
		</ol>
	</Prose>
</Stack>
`;

export const mkdirStaticFiles = () => {
	return Promise.all([
		mkdir('./src/routes/(docs)/docs', { recursive: true }),
		mkdir('./static/docs', { recursive: true })
	]);
};

export const writeStaticFiles = () => {
	return Promise.all([writeFile(LAYOUT_PATH, LAYOUT_FILE), writeFile(PAGE_PATH, PAGE_FILE)]);
};

/**
 * @param {Array} staticFiles
 */
export const copyStaticFiles = (staticFiles) => {
	return Promise.all(
		staticFiles.map((file) => {
			return copyFile(file.path, `./static/docs/${file.name}`);
		})
	);
};
