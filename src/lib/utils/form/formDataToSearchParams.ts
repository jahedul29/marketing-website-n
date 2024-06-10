export const formDataToSearchParams = (formData: FormData) => {
	// Convert file objects to string
	const filteredData = Array.from(formData, ([key, value]) => [
		key,
		typeof value === 'string' ? value : value.name
	]);
	return new URLSearchParams(filteredData);
};
