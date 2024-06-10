declare namespace svelteHTML {
	export interface HTMLAttributes {
		disableremoteplayback?: boolean;
		'x-webkit-airplay'?: 'deny' | 'allow';
		'on:urlcopied'?: () => void;
		'on:nativesharesunsupported'?: (event: CustomEvent<{ node: HTMLButtonElement }>) => void;
	}
}
