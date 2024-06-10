<script lang="ts">
	type Item = $$Generic;

	interface $$Slots {
		default: { item: Item };
	}

	export let title: string;
	export let items: Item[];
</script>

{#if items?.length}
	<section class="bp:px-20">
		<div
			class="mx-auto max-w-max space-y-32 rounded-24 bg-grey-100 py-32 bp:space-y-60 bp:p-120"
		>
			<h2 class="text-700 px-20 font-medium leading-10 bp:max-w-700 bp:px-0">{title}</h2>
			<ul
				class="flex gap-20 px-20 scrollbar-hide bp:grid bp:grid-cols-4 bp:px-0"
				class:overflow-x-auto={items.length > 1}
			>
				{#each items as item}
					<li class="flex {items.length > 1 ? 'w-[80vw] flex-shrink-0 bp:w-full' : ''}">
						<slot {item} />
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}
