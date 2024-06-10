<script lang="ts">
	export let open = false;
</script>

<div class="_burger grid w-[20px]" class:open>
	<div class="_line" />
	<div class="_line" />
	<div class="_line" />
</div>

<style lang="postcss">
	._burger {
		--line-height: 2px;
		--gap: 4px;
		--transform-transition: transform 700ms var(--ease-out-expo);
		gap: var(--gap);

		._line {
			background-color: currentColor;
			height: var(--line-height);

			&:first-child,
			&:last-child {
				transition: var(--transform-transition);
			}
			&:nth-child(2) {
				transition: var(--transform-transition), opacity 300ms var(--ease-out-expo);
			}
		}
	}

	._burger.open {
		._line:first-child {
			transform: translateY(calc(100% + var(--gap))) rotate(45deg);
		}
		._line:nth-child(2) {
			transform: translateX(100%);
			opacity: 0;
		}
		._line:last-child {
			transform: translateY(calc(-100% - var(--gap))) rotate(-45deg);
		}
	}
</style>
