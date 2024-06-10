type TemplateParamsArray = (string | number | boolean)[];
// Simple gql template to support syntax highlighting and formatting
export const gql = (t: TemplateStringsArray, ...s: TemplateParamsArray): string => {
	const acc: TemplateParamsArray = [];
	const sources = [t, s];
	const length = Math.max(t.length, s.length);
	for (let i = 0; i < length; i++) {
		for (let j = 0; j < sources.length; j++) {
			if (sources[j][i]) {
				acc.push(sources[j][i]);
			}
		}
	}
	return acc.join();
};

export default gql;
