export const forceExecuteScript = (node: HTMLElement) => {
	let loaded = 0;

	const scripts = Array.from(node.querySelectorAll<HTMLScriptElement>('script'));

	const loadableScripts = scripts.filter((script) => !!script.src);
	const executableScripts = scripts.filter((script) => !!script.innerHTML);

	const appendExecutableScripts = () => {
		executableScripts.forEach((script) => {
			const newScript = document.createElement('script');
			const fragment = document.createRange().createContextualFragment(script.innerHTML);
			newScript.append(fragment);
			script.remove();
			node.append(newScript);
		});
	};

	if (loadableScripts.length) {
		loadableScripts.forEach((script) => {
			const newScript = document.createElement('script');
			newScript.src = script.src;
			newScript.addEventListener(
				'load',
				() => {
					loaded += 1;
					if (loaded === loadableScripts.length) {
						appendExecutableScripts();
					}
				},
				{ once: true }
			);
			script.remove();
			node.append(newScript);
		});
	} else {
		appendExecutableScripts();
	}
};
