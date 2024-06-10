import type { Subscriber } from 'svelte/store';
import { readable } from 'svelte/store';
import { browser } from '$app/environment';

export const createWindowEventStore = <TEvent extends Event>(
	event: string,
	options?: boolean | AddEventListenerOptions
) => {
	const store = readable<Maybe<TEvent>>(null, (set) => {
		if (!browser) {
			return;
		}
		const handler = (e: TEvent) => {
			// Call every store subscribers with the event
			set(e);
			// Reset the store value so no new subscribers are called with a stale event
			// No subscribers will be called if the value is null
			set(null);
		};
		window.addEventListener(event, handler, options);
		return () => {
			window.removeEventListener(event, handler, options);
			set(null);
		};
	});

	const subscribe = (subscriber: Subscriber<TEvent>) => {
		const unsubscribe = store.subscribe((e) => {
			// Don't call store subscribers if there is no event
			if (!e) {
				return;
			}
			subscriber(e);
		});

		return unsubscribe;
	};
	return {
		subscribe
	};
};
