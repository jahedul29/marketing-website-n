import { onDestroy } from 'svelte';

export const randomIndexGenerator = (max = 0) => {
	const randomIndexes = new Set();

	onDestroy(() => {
		randomIndexes.clear();
	});

	return () => {
		if (randomIndexes.size === max) {
			return 0;
		}
		let index = Math.floor(Math.random() * max);
		while (randomIndexes.has(index)) {
			index = Math.floor(Math.random() * max);
		}
		randomIndexes.add(index);
		return index;
	};
};
