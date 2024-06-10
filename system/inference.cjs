module.exports = {
	inferType: (value) => {
		if (!value) {
			return 'any';
		} else if (value.startsWith(`'`) && value.endsWith(`'`)) {
			return 'string';
		} else if (value.startsWith('`') && value.endsWith('`')) {
			return 'string';
		} else if (value === 'false' || value === 'true') {
			return 'boolean';
		} else if (value === 'null') {
			return 'null';
		} else if (value === 'undefined') {
			return 'undefined';
		} else if (!isNaN(parseFloat(value))) {
			return 'number';
		} else if (value.startsWith('{') && value.endsWith('}')) {
			return 'object';
		} else if (value.startsWith('[') && value.endsWith(']')) {
			return 'array';
		} else if (value.startsWith('new Date(') && value.endsWith(')')) {
			return 'Date';
		} else if (
			value.startsWith('() =>') ||
			value.includes(' => {') ||
			value.startsWith('async (') ||
			value.startsWith('function') ||
			value.startsWith('async function')
		) {
			return 'function';
			/* The following are edge cases */
		} else if (
			value.includes(' >= ') ||
			value.includes(' <= ') ||
			value.includes(' == ') ||
			value.includes(' != ')
		) {
			return 'boolean';
		} else if (value.endsWith(` || ''`)) {
			return 'string';
		} else if (value.endsWith(` || 0`)) {
			return 'number';
		} else if (value.endsWith(` || false`)) {
			return 'boolean';
		} else if (value.endsWith(` || {}`)) {
			return 'object';
		} else if (value.endsWith(` || []`)) {
			return 'array';
		} else if (value.endsWith(` || null`)) {
			return 'Maybe<any>';
		} else if (value.endsWith(` || undefined`)) {
			return 'undefined';
		} else if (value.endsWith(` || new Date()`)) {
			return 'Date';
		} else if (value.includes('import.meta.env.')) {
			return 'string';
		} else if (value.endsWith('.toString()')) {
			return 'string';
		} else if (value.startsWith(`t('`) && value.endsWith(`')`)) {
			return 'string';
		} else if (value.startsWith('t(`') && value.endsWith('`)')) {
			return 'string';
		} else if (value.endsWith(`.join(',')`)) {
			return 'string';
		} else if (value.toLowerCase().startsWith('writable<')) {
			return 'Writable';
		} else if (value.toLowerCase().startsWith('readable<')) {
			return 'Readable';
		} else if (
			value.toLowerCase().startsWith('derived<') ||
			value.toLowerCase().startsWith('derived(')
		) {
			return 'Readable';
		}

		return 'unknown';
	}
};
