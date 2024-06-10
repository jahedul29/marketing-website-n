import { runDynamicImports } from '$lib/dynamic-imports/runDynamicImports';

export const load = async ({ data }) => {
	return runDynamicImports(data);
};
