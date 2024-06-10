<!--@docs 
A helper component to properly output a <time> html element.

@exec TimeExampleBasic.svelte

```svelte
<Time date={new Date('2023-04-17T21:34:50.360Z')} formatOptions={{ day: 'numeric', month: 'long', year: 'numeric' }} />
```

@exec TimeExampleSlot.svelte

```svelte
<Time date={new Date('2023-04-17T21:34:50.360Z')} formatOptions={{ day: 'numeric', month: 'long' }} let:formattedDate>
	<span class="text-[red]">
		{formattedDate}
	</span>
</Time>
```
-->
<script lang="ts">
	import { formatDate } from '$lib/utils/format/formatDate';

	/**
	 * The date to display
	 */
	export let date: Date;
	/**
	 * The date formatting options
	 */
	export let formatOptions: Intl.DateTimeFormatOptions = {
		dateStyle: 'medium'
	};

	const formattedDate = formatDate(date, formatOptions);
</script>

{#if date}
	<time datetime={date.toISOString()}>
		<!--@docs
##### Slot props

-   readonly `formattedDate` (string): The formatted date.
	-->
		<slot {formattedDate}>
			{formattedDate}
		</slot>
	</time>
{/if}
