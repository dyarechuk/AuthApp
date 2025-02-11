import z from 'zod';

const ENG_REGEX = 'a-zA-Z';
const NUM_REGEX = '0-9';
const USERNAME_REGEX = new RegExp(`^[${ENG_REGEX}${NUM_REGEX}_]{2,40}$`);
const NAME_REGEX = new RegExp(`^[${ENG_REGEX}]{2,40}$`);

export const formSchema = z.object({
	username: z
		.string()
		.nonempty({ message: 'Username cannot be empty' })
		.min(2, { message: 'Username must be at least 2 characters' })
		.max(40, { message: 'Username must be at most 40 characters' })
		.regex(USERNAME_REGEX, {
			message: 'Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)',
		}),
	password: z
		.string()
		.nonempty({ message: 'Password cannot be empty' })
		.refine((value) => /[A-Za-z]/.test(value) && /\d/.test(value), {
			message: 'The password must include at least 1 digit and 1 letter',
		})
		.refine((value) => value.length >= 8, {
			message: 'Password is too short (min: 8)',
		})
		.refine((value) => value.length <= 50, {
			message: 'Password is too long (max: 50)',
		}),
	name: z
		.string()
		.nonempty({ message: 'Name cannot be empty' })
		.min(2, { message: 'Name is too short (min: 2)' })
		.max(50, { message: 'Name is too long (max: 50)' })
		.regex(NAME_REGEX, {
			message: 'Name is not correct (a-zA-Z), or too short (min: 2), or too long (max: 40)',
		}),
});

export type FormValues = z.infer<typeof formSchema>;
