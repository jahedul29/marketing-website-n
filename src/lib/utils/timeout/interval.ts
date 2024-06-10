export const interval = (callback: () => void, delay = 0) => {
	let start: DOMHighResTimeStamp;
	let frameId: number;
	const tick = (now: DOMHighResTimeStamp) => {
		if (!start) {
			start = now;
		}
		if (now - start >= delay) {
			callback();
			start = now;
		}
		frameId = requestAnimationFrame(tick);
	};
	frameId = requestAnimationFrame(tick);
	return () => {
		cancelAnimationFrame(frameId);
	};
};
