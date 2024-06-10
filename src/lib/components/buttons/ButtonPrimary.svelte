<script lang="ts">
	import type { Button } from '$lib/utils/types/Button';
	import ButtonPrimaryInner, {
		type ButtonPrimaryColor,
		type ButtonPrimarySize,
		type ButtonPrimaryType
	} from '$com/buttons/ButtonPrimaryInner.svelte';
	import CraftButton from '$com/buttons/CraftButton.svelte';

	export let button: Maybe<Button>;
	export let color: ButtonPrimaryColor = 'black';
	export let size: ButtonPrimarySize = 'lg';
	export let type: ButtonPrimaryType = 'filled';
</script>

<CraftButton {button} class="_primary" let:label>
	<ButtonPrimaryInner {color} {size} {type}>
		<slot {label}>
			{label}
		</slot>
	</ButtonPrimaryInner>
</CraftButton>
