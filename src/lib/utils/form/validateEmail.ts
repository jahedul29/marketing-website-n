export const validateEmail = (email: string) => {
	const regexp =
		/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

	if (!email) {
		return false;
	}

	if (email.length > 256) {
		return false;
	}

	if (!regexp.test(email)) {
		return false;
	}

	const [account, address] = email.split('@');
	if (account.length > 64) {
		return false;
	}

	const domainParts = address.split('.');
	if (
		domainParts.some(function (part) {
			return part.length > 63;
		})
	) {
		return false;
	}

	return true;
};
