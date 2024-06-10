// @TODO Type emitted custom event when upgrading to Svelte 3.50
export const copyOnClick = (node: Maybe<HTMLButtonElement>, url?: string) => {
	const init = async () => {
		if ('navigator' in window && 'permissions' in window.navigator) {
			const permissionName = 'clipboard-write' as PermissionName;
			return window.navigator.permissions
				.query({ name: permissionName })
				.then(({ state }) => state === 'granted')
				.catch(() => false);
		}
	};

	const onCopyUrl = async () => {
		await window.navigator.clipboard.writeText(url || window.location.href);
		node?.dispatchEvent(new Event('urlcopied'));
	};

	init().then((granted) => {
		if (!granted) {
			node?.remove();
			return;
		}
		node?.addEventListener('click', onCopyUrl);
	});

	return {
		destroy() {
			node?.removeEventListener('click', onCopyUrl);
			node = null;
		}
	};
};
