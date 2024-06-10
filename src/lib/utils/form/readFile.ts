export const readFile = async (file: File) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.readAsDataURL(file);
	});
};
