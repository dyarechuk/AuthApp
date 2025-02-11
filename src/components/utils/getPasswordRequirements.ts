export type PasswordRequirement = {
	met: boolean;
	text: string;
};

export const getPasswordRequirements = (password: string): PasswordRequirement[] => [
	{ met: password.length >= 8 && password.length <= 50, text: '8-50 Characters' },
	{ met: /[A-Za-z]/.test(password), text: 'At least one letter' },
	{ met: /\d/.test(password), text: 'At least one digit' },
];

export const getMetRequirementsCount = (requirements: PasswordRequirement[]) => {
	return requirements.filter((req) => req.met).length;
};

export const getStrengthLevel = (count: number) => {
	if (count === 0) return 'none';
	if (count === 1) return 'weak';
	if (count === 2) return 'medium';
	return 'strong';
};
