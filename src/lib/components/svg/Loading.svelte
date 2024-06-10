<svg class="h-auto w-full" viewBox="25 25 50 50">
	<circle cx="50" cy="50" r="20" />
</svg>

<style lang="postcss">
	svg {
		transform-origin: center;
		animation: rotate 2s linear infinite;
	}

	circle {
		fill: none;
		stroke: currentColor;
		stroke-width: 8;
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 200;
			stroke-dashoffset: -35px;
		}
		100% {
			stroke-dashoffset: -125px;
		}
	}
</style>
