# Tabs

A generic tab component, inspired by https://headlessui.dev/vue/tabs.

**Main component:** `TabGroup.svelte`

## Props

-   `id` (string): Used to identify the tab buttons and panels for assistive technologies. REQUIRED.
-   `defaultIndex` (number): The first selected tab index. Default: 0.
-   `orientation` ('vertical' | 'horizontal'): Corresponds to the tablist orientation. Will also
    impact keyboard navigation. Default : 'horizontal'.
-   `unmount` (boolean): Whether the tab panels should be unmounted or hidden via css. (see example
    usage). DEFAULT: false.
-   `classTablist`: Optional tablist classes.
-   `classTabPanels`: Optional tab panels container classes.

## Slots

### Default

The default slot for all children components.

Slot props:

-   readonly `selectedIndex` (number): The currently selected index.

## Events

### `on:tabchange`

Fired when a new tab is selected.

Event detail:

```ts
{
	index: number;
}
```

## Children components

### TabList.svelte

Used to output a tablist.

Props:

-   `class` (string): Optional tablist classes.

### Tab.svelte

Used to output a tab button or link. Must be used inside a TabList.

Props:

-   `href` (string): If an `href` is provided, an `<a>` element will be rendered, otherwise it will
    be a `<button>` element.
-   `class` (string): Optional base tab classes.
-   `classUnselected` (string): Optional unselected tab classes.
-   `classSelected` (string): Optional selected tab classes.

Slot props:

-   `selected` (boolean): Wether the tab is currently selected or not.

### TabPanels.svelte

Used to contain all the tab panels.

Props:

-   `as` (string): Optional tagname. Default: 'div'.
-   `class` (string): Optional classes.

### TabPanel.svelte

Used to output a tabpanel.

Props:

-   `as` (string): Optional tagname. Default: 'div'.
-   `class` (string): Optional base tab classes.
-   `classUnselected` (string): Optional unselected tab classes.
-   `classSelected` (string): Optional selected tab classes.
-   `transitionDuration` (string): A css transition duration the will delay the visibility toggle if
    `unmount` is `false` (see example usage). DEFAULT: "0s"

Slot props:

-   `selected` (boolean): Wether the panel is currently selected or not.

## Unmount

The `unmount` prop determines if the tab panels are toggled via mounting/unmounting the elements in
the DOM or via css.

Generally, if the content is important to the website, it should be toggled via css so it can still
be accessed by search engines, as it will be better for the site's SEO.

## Transitions

Depending on wether the `unmount` prop is `true` or `false`, the transition strategy you will have
to employ will differ.

**If `unmount` is `false`**, the panels are shown and hidden via css `visibility`. To animate the
panels, you can delay the `visibility` toggle by using the `transitionDuration` prop.

**If `unmount` is `true`**, the panels will only appear in the DOM when selected. You can then wrap
the content of the panel in a `div` element and use Svelte transitions.

## Example usage

Normal tabs:

@TODO update examples

```html
<script lang="ts">
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '$lib/components/ui/tabs';
</script>

<TabGroup id="tabs">
	<TabList class="border-10 w-full justify-center space-x-100 border-solid p-60">
		{#each tabs as tab}
		<Tab
			class="border-10 border-solid p-60"
			selectedClass="bg-main text-main-invert underline font-bold"
			>{tab.label}</Tab
		>
		{/each}
	</TabList>
	<TabPanels class="border-30 grid overflow-hidden border-solid grid-stack">
		{#each tabs as tab, i}
		<TabPanel>
			<div class="bg-main text-main-invert p-60">{tab.panel}</div>
		</TabPanel>
		{/each}
	</TabPanels>
</TabGroup>
```

Sliding tabs:

```html
<script lang="ts">
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '$lib/components/ui/tabs';
</script>

<TabGroup id="sliding-tabs">
	<TabList class="border-10 w-full justify-center space-x-100 border-solid p-60">
		{#each tabs as tab}
		<Tab
			class="border-10 border-solid p-60"
			selectedClass="bg-main text-main-invert underline font-bold"
			>{tab.label}</Tab
		>
		{/each}
	</TabList>
	<TabPanels class="border-30 grid overflow-hidden border-solid grid-stack">
		{#each tabs as tab, i}
		<TabPanel transitionDuration="500ms" let:selectedIndex>
			<div
				class="bg-main text-main-invert p-60 transition-transform duration-500 ease-out"
				style="transform: translateX(calc(100% * {selectedIndex - i}));"
			>
				{tab.panel}
			</div>
		</TabPanel>
		{/each}
	</TabPanels>
</TabGroup>
```

Crossfade tabs:

```html
<script lang="ts">
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '$lib/components/ui/tabs';
</script>

<TabGroup id="crossfade-tabs">
	<TabList class="border-10 w-full justify-center space-x-100 border-solid p-60">
		{#each tabs as tab}
		<Tab
			class="border-10 border-solid p-60"
			selectedClass="bg-main text-main-invert underline font-bold"
			>{tab.label}</Tab
		>
		{/each}
	</TabList>
	<TabPanels class="border-30 grid overflow-hidden border-solid grid-stack">
		{#each tabs as tab}
		<TabPanel transitionDuration="300ms" let:selected>
			<div
				class="{selected ? 'opacity-1 delay-300' : 'opacity-0'} bg-main
							text-main-invert p-60 transition-opacity
							duration-300 ease-linear"
			>
				{tab.panel}
			</div>
		</TabPanel>
		{/each}
	</TabPanels>
</TabGroup>
```

Unmounting tabs:

```html
<script lang="ts">
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '$lib/components/ui/tabs';
</script>

<TabGroup id="tabs-unmount" unmount="{true}">
	<TabList class="border-10 w-full justify-center space-x-100 border-solid p-60">
		{#each tabs as tab}
		<Tab
			class="border-10 border-solid p-60"
			selectedClass="bg-main text-main-invert underline font-bold"
			>{tab.label}</Tab
		>
		{/each}
	</TabList>
	<TabPanels class="border-30 overflow-hidden border-solid">
		{#each tabs as tab, i}
		<TabPanel let:selectedIndex>
			<div class="bg-main text-main-invert p-60">{tab.panel}</div>
		</TabPanel>
		{/each}
	</TabPanels>
</TabGroup>
```
