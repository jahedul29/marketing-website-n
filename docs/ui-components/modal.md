# Modal

A generic and flexible modal component, inspired by https://headlessui.dev/vue/dialog. While open,
it locks the site scroll, is rendered at the end of the `<body>` so that it is above the rest of the
content, traps the keyboard focus and can be closed by clicking outside of it.

NOTE: To learn the difference between a modal and a popover
https://headlessui.dev/vue/popover#when-to-use-a-popover.

**Main component:** `Modal.svelte`

## Props

-   `id` (string): Used to identify the modal for assistive technologies. REQUIRED.
-   `open` (boolean): The state of the modal. DEFAULT: false.
-   `unmount` (boolean): Whether the modal should be unmounted or hidden based on the open state
    (see example usage). DEFAULT: false.
-   `transitionDuration` (string): A css transition duration the will delay the visibility toggle if
    `unmount` is `false` (see example usage). DEFAULT: "0s"
-   `initialFocus` (HTMLElement): By default, when the modal opens, the first focusable element in
    the modal's content will be focused. You can override this by supplying an element reference to
    this option.
-   `class` (string): Optional modal container classes.
-   readonly `close` (() => void): A function to close the modal that the parent component can bind
    to (see example usage). Cannot be reassigned.

## Slots

### Default

The default slot for the modal button.

Slot Props:

-   readonly `open` (boolean): Wether the modal is open or not.
-   readonly `close` (() => void): A function you can call to close the modal.
-   readonly `toggle` (() => void): A function you can call to toggle the modal.

### Content

Name: "content"

Slot Props:

-   readonly `open` (boolean): Wether the modal is open or not.
-   readonly `close` (() => void): A function you can call to close the modal.
-   readonly `toggle` (() => void): A function you can call to toggle the modal.

## Children components

### ModalButton.svelte

Used to toggle the modal.

Props:

-   `class`: Optional classes.

### ModalOverlay.svelte

Can be used to dim the background when the modal is open. Clicking it will close the modal.

Props:

-   `class`: Optional classes.

### ModalTitle.svelte

An element that labels the modal content. If present, screenreaders will refer to it via an
`aria-labelledby` attribute on the modal. While not mandatory, it is highly recommended to use it,
even if visually hidden.

Props:

-   `as` (string): Optional tagname. Default: 'h3'.
-   `class`: Optional classes.

### ModalDescription.svelte

An element that describes the modal content. If present, screenreaders will refer to it via an
`aria-describedby` attribute on the modal. While not mandatory, it is highly recommended to use it,
even if visually hidden.

Props:

-   `as` (string): Optional tagname. Default: 'p'.
-   `class` (string): Optional classes.

## Unmount

The `unmount` prop determines if the modal is toggled via mounting/unmounting the elements in the
DOM or via css.

Generally, if the content is important to the website, it should be toggled via css so it can still
be accessed by search engines, as it will be better for the site's SEO.

## Toggling the modal

You can toggle the modal in several ways:

-   By using the `ModalButton` component, which will always toggle the modal.
-   By using the `close` function passed as a prop to the `content` slot.
-   By binding the `close` prop on the `Modal` component. This is useful when you want your parent
    component to close the popover programmatically (see example usage).

## Transitions

Depending on wether the `unmount` prop is `true` or `false`, the transition strategy you will have
to employ will differ.

**If `unmount` is `false`**, the modal is shown and hidden via css `visibility`. You can then use
the `open` slot prop to toggle classes to show/hide content. To animate the content when closing the
modal, you can delay the `visibility` toggle by using the `transitionDuration` prop.

**If `unmount` is `true`**, the modal will only appear in the DOM when `open` is true. You can then
wrap the content and overlay in `div` elements and use Svelte transitions.

## Example usage

If `unmount` is `false` and the modal is toggled via css `visibility`:

```html
<script lang="ts">
	import {
		Modal,
		ModalButton,
		ModalOverlay,
		ModalTitle,
		ModalDescription
	} from '$lib/components/ui/modal';

	let closeModal;
	let input;

	const onSubmit = async () => {
		// ... form submitting logic
		closeModal();
	};
</script>

<Modal
	id="my-form-modal"
	class="flex justify-center items-center fixed top-0 left-0 w-full h-full"
	initialFocus={input}
	bind:close="{closeModal}"
>
	<ModalButton> My form </ModalButton>
	<svelte:fragment slot="content" let:close let:open>
		<ModalOverlay
			class="fixed top-0 left-0 w-full h-full bg-main opacity-30 transition-opacity duration-200 {open
			? 'opacity-1'
			: 'opacity-0'}"
		/>
		<div
			class="relative max-w-280 p-80 pt-120 rounded-10 bg-main-invert transition-opacity duration-200 {open
				? 'opacity-1'
				: 'opacity-0'}"
		>
			<ModalTitle class="text-80 font-bold">My modal title</ModalTitle>
			<ModalDescription class="mt-80 text-50"> My modal description </ModalDescription>
			<p class="mt-80">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem placeat amet
				blanditiis officiis totam, tenetur ipsam minus perspiciatis aspernatur similique
				beatae voluptas ea iste! Aspernatur explicabo eligendi at facere provident.
			</p>
			<form on:submit|preventDefault="{onSubmit}">
				<input type="text" bind:this={input}>
				<button type="submit">Submit</button>
			</form>
			<ModalButton> Close this modal </ModalButton>
			<button on:click="{close}">I can also close this modal</button>
		</div>
	</svelte:fragment>
</Modal>
```

If `unmount` is `true` and the modal is toggled via mounting and unmounting in the DOM:

```html
<script lang="ts">
	import { Modal, ModalButton, ModalOverlay, ModalTitle, ModalDescription } from '$lib/components/ui/modal';
	import { fade, fly } from 'svelte/transition';

	let closeModal;
	let input;

	const onSubmit = async () => {
		// ... form submitting logic
		closeModal();
	};
</script>


<Modal
	id="my-form-modal"
	class="flex justify-center items-center fixed top-0 left-0 w-full h-full"
	bind:close={closeModal}
	firstFocus={input}
>
	<ModalButton>
		My form
	</ModalButton>
	<svelte:fragment slot="content" let:close>
		<div transition:fade={{ duration: 100 }}>
			<ModalOverlay class="fixed top-0 left-0 w-full h-full bg-main opacity-30" />
		</div>
		<div
			transition:fly={{ y: 60, duration: 200 }}
			class="relative max-w-280 p-80 pt-120 rounded-10 bg-main-invert"
		>
			<ModalTitle class="text-80 font-bold">My modal title</ModalTitle>
			<ModalDescription class="mt-80 text-50">
				My modal description
			</ModalDescription>
			<p class="mt-80">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem placeat amet blanditiis
				officiis totam, tenetur ipsam minus perspiciatis aspernatur similique beatae voluptas ea
				iste! Aspernatur explicabo eligendi at facere provident.
			</p>
			<form on:submit|preventDefault={onSubmit}>
				<input type="text" bind:this={input} />
				<button type="submit">Submit</button>
			</form>
			<ModalButton> Close this modal </ModalButton>
			<button on:click="{close}">I can also close this modal</button>
		</div>
	</svelte:fragment>
</Modal>
```
