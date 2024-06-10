/** Reproduces the native GET form behavior, which is to
 * replace the current query string with the serialized form data.
 */

import { goto } from '$app/navigation';
import { formDataToSearchParams } from '$lib/utils/form/formDataToSearchParams';

type GotoOptions = Parameters<typeof goto>[1];

export const enhanceGet = (node: HTMLFormElement, gotoOptions?: GotoOptions) => {
	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		const formData = new FormData(node);
		const qs = formDataToSearchParams(formData).toString();
		const url = node?.action.split('?')[0];
		return goto(`${url}?${qs}`, gotoOptions);
	};

	node.addEventListener('submit', handleSubmit);

	return {
		destroy() {
			node.removeEventListener('submit', handleSubmit);
		}
	};
};
