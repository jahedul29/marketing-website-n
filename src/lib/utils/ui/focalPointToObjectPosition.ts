export const focalPointToObjectPosition = (focalPoint: number) => {
	const percentage = focalPoint * 100;
	return percentage.toFixed(2) + '%';
};
