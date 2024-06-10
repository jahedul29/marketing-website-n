/**@docs
 * This page transition system allows for multiple different transitions within the same project. Each transition has to
 * be registered with a unique key and a condition. A store will then be provided so the components can
 * get notified when the transition is triggered.
 *
 * To register a transition, use the `registerTransition` function.
 *
 * If a default transition is registered, the system will always trigger a transition, wether it be one
 * with a unique key, or the default one. Sometimes we want to bypass this altogether. For this we can
 * use the `skipTransition` function.
 */

import type { NavigationTarget } from '@sveltejs/kit';
import { onDestroy, tick } from 'svelte';
import { derived, readonly, writable } from 'svelte/store';
import { goto, preloadData, beforeNavigate } from '$app/navigation';
import { browser, dev } from '$app/environment';

const DEFAULT = 'default' as const;

// Extract the type of the first parameter of beforeNavigate's callback
export type BeginTransitionParameters = Parameters<Parameters<typeof beforeNavigate>[0]>[0];

export type BuiltinTransitionKeys = typeof DEFAULT;

export type TransitionKey = BuiltinTransitionKeys | Omit<string, BuiltinTransitionKeys>;

export type TransitionCondition = (nav: BeginTransitionParameters) => boolean;

export type TransitionOptions<TKey extends TransitionKey> = {
	condition: TKey extends typeof DEFAULT ? never : TransitionCondition;
	gotoOptions?: Parameters<typeof goto>[1];
};

export type TransitionDirection = 'in' | 'out';

export type Transition = Maybe<{
	from: Maybe<NavigationTarget>;
	to: Maybe<NavigationTarget>;
	key: TransitionKey;
	direction: TransitionDirection;
}>;

let inTransition: Transition = null;
let transitionsInited = false;

const store = writable<Transition>(inTransition);

const set = (value: Transition) => {
	inTransition = value;
	store.set(inTransition);
};

const TRANSITIONS: Map<TransitionKey, TransitionOptions<TransitionKey>> = new Map();
const SKIP_CONDITIONS: Set<TransitionCondition> = new Set();

/**
 * Cancel the navigation request and update the store to start the transition.
 * Cancelling the navigation means the request to the server will not be issued.
 * Hence, this function will also call kit's `preloadData` function.
 * @param navigation The object given by `beforeNavigate`
 * @param key The current transition key
 */
const beginTransition = (
	{ cancel, to, from, willUnload, type }: BeginTransitionParameters,
	key: TransitionKey
) => {
	if (inTransition && inTransition.to?.url.toString() !== to?.url.toString()) {
		set(null);
		return;
	}
	if (
		inTransition ||
		!to?.url ||
		to?.url.toString() === from?.url.toString() ||
		willUnload ||
		type === 'popstate'
	) {
		return;
	}
	cancel();
	preloadData(to.url.toString());
	set({ from, to, key, direction: 'out' });
};

/**
 * Registers the beforeNavigate callback that starts the transition
 */
const initTransitions = () => {
	if (transitionsInited) {
		return;
	}
	beforeNavigate((nav) => {
		// Since this callback is only active as long as the component is mounted, we have to register it after every navigation
		transitionsInited = false;
		// Check if we have to skip the navigation entirely
		const skipCondition = Array.from(SKIP_CONDITIONS).find((condition) => condition(nav));
		if (skipCondition) {
			return;
		}
		// Find the transition that has a matching condition
		const key = Array.from(TRANSITIONS.entries()).find(([_, { condition }]) =>
			condition(nav)
		)?.[0];
		// If there is a transition, start it
		if (key) {
			beginTransition(nav, key);
			return;
		}
		// Start the default transition if it has been registered
		if (TRANSITIONS.has(DEFAULT)) {
			beginTransition(nav, DEFAULT);
		}
	});
	transitionsInited = true;
};

/**
 * Registers a transition.
 * @param {string} key The transition key. Must be unique.
 * @param {object} options
 * - options.condition: A function that determines wether navigation condition matches. If `true`, the transition will be triggered.
 * - options.gotoOptions: The options that should be pass to the `goto` function.
 * @returns A readable store that is `null` by default, and is a `Transition` object while the transition is
 * happening. The `key` of the `Transition` object will always be the key that was passed to the
 * function. That way, the store is scoped to this particular transition. The direction is always `out`
 * at first and is set to `in` when `endTransition` is called.
 */
export const registerTransition = <TKey extends TransitionKey>(
	key: TKey,
	...args: TKey extends typeof DEFAULT
		? [options: TransitionOptions<TKey>] | []
		: [options: TransitionOptions<TKey>]
) => {
	if (!browser) {
		return store;
	}
	const transitioning = derived(store, ($transition) => {
		if ($transition?.key === key) {
			return $transition;
		}
		return null;
	});
	if (TRANSITIONS.has(key)) {
		dev &&
			console.warn(
				`Duplicate transition key: "${key}". Only the first one will be registered.`
			);
		return transitioning;
	}
	initTransitions();
	const options = args[0];
	const condition = key === DEFAULT ? () => false : options?.condition;
	if (typeof condition === 'function') {
		TRANSITIONS.set(key, options || { condition });
		onDestroy(() => {
			TRANSITIONS.delete(key);
		});
	}
	return transitioning;
};

/**
 * Skips all transition if the condition is `true`.
 * @param {function} condition  A function that determines wether navigation condition matches. If `true`, the transition will be skipped.
 */
export const skipTransition = (condition: TransitionCondition) => {
	if (!browser) {
		return;
	}
	SKIP_CONDITIONS.add(condition);
	onDestroy(() => {
		SKIP_CONDITIONS.delete(condition);
	});
};

/**
 * This function performs the actual navigation, so if a transition occurs, it has to be called
 * eventually. It's usually used at the end of an outro animation or a timer.
 * As soon as this function is called, the `Transition.direction` is set to 'in', then `goto` is called
 * with the provided options if any. Once the `goto` promise resolves, the `$transitioning` store is
 * set back to `null`.
 */
export const endTransition = async () => {
	if (!inTransition?.to) {
		set(null);
		return;
	}
	const toURL = inTransition.to.url;
	set({ ...inTransition, direction: 'in' });
	const options = TRANSITIONS.get(inTransition.key);
	try {
		await goto(toURL, options?.gotoOptions);
	} catch (error) {
		console.error(error);
	} finally {
		set(null);
	}
	// Fix the route announcement that we broke
	const svelteAnnouncer = document.getElementById('svelte-announcer');
	if (svelteAnnouncer) {
		svelteAnnouncer.textContent = document.title;
	}
	// Restore hash navigation
	await tick();
	const hash = toURL?.hash;
	if (!hash) {
		return;
	}
	const hashElement = document.getElementById(hash.substring(1));
	if (hashElement) {
		hashElement.scrollIntoView();
	}
};

/**
 * A readable store that is updated with a `Transition` object whenever any transition occurs and is
 * `null` the rest of the time.
 * This is useful if you want to easily run some code for a transition outside of the component that
 * has registered it, or for several transitions with similar keys, for example.
 */
export const transitioning = readonly(store);
