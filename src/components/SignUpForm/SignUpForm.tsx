'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import ViewIcon from '../../../public/assets/icons/eye.svg';
import NotAllowedIcon from '../../../public/assets/icons/eye-off.svg';
import { User } from '@/lib/dto';
import { signUp } from '@/lib/utils/signUp';
import { useRouter } from 'next/navigation';
import '../styles.scss';
import { Button, FormLabel, Input } from '../ui';
import {
	getMetRequirementsCount,
	PasswordRequirement,
	getStrengthLevel,
	getPasswordRequirements,
} from '../utils/getPasswordRequirements';
import { toastError } from '@/lib/toastError';
import { toastSuccess } from '@/lib/toastSuccess';
import Link from 'next/link';
import { formSchema, FormValues } from '../utils/validationSchema';

export const SignUpForm: React.FC = () => {
	const [isShowPassword, setIsShowPassword] = useState(false);

	const router = useRouter();

	const { mutate } = useMutation({
		mutationKey: ['signUp'],
		mutationFn: (data: User) => signUp(data),
	});

	const methods = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
			name: '',
		},
		mode: 'onChange',
	});

	const onSubmitHandler = (data: FormValues) => {
		mutate(data, {
			onSuccess: () => {
				methods.reset();
				router.push('/log-in');
				toastSuccess('Successful sign up');
			},
			onError: (error) => {
				toastError(error.message);
			},
		});
	};

	const {
		handleSubmit,
		register,
		watch,
		formState: { errors, isValid, isSubmitting },
		trigger,
	} = methods;

	const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
	const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirement[]>([
		{ met: false, text: '8-50 Characters' },
		{ met: false, text: 'At least one letter' },
		{ met: false, text: 'At least one digit' },
	]);

	const password = watch('password');

	useEffect(() => {
		if (password) {
			setShowPasswordRequirements(true);
			setPasswordRequirements(getPasswordRequirements(password));
		} else {
			setPasswordRequirements([
				{ met: false, text: '8-50 Characters' },
				{ met: false, text: 'At least one letter' },
				{ met: false, text: 'At least one digit' },
			]);
			setShowPasswordRequirements(false);
		}
	}, [password]);

	useEffect(() => {
		if (errors.password) {
			setShowPasswordRequirements(true);
		}
	}, [errors.password]);

	const isPasswordValid = useCallback(() => {
		return passwordRequirements.every((req) => req.met);
	}, [passwordRequirements]);

	return (
		<div className="flex flex-col gap-8 items-center bg-slate-700 rounded-2xl w-full md:w-[40vw] mx-auto pb-8">
			<h1 className="bg-slate-600 w-full text-center p-8 rounded-t-2xl text-4xl uppercase text-slate-200">
				Sign Up
			</h1>

			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmitHandler)} className="px-8 w-full flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-3">
							<FormLabel htmlFor="username-input">Username</FormLabel>
							<div className="flex flex-col gap-2">
								<Input
									type="text"
									id="username-input"
									{...register('username')}
									onBlur={() => trigger('username')}
									placeholder="Enter your username"
									className=""
								/>
								{errors.username && (
									<div className="text-red-400 text-sm">{errors.username.message}</div>
								)}
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<FormLabel htmlFor="name-input">Name</FormLabel>
							<div className="flex flex-col gap-2">
								<Input
									type="text"
									id="name-input"
									{...register('name')}
									onBlur={() => trigger('name')}
									placeholder="Enter your name"
								/>
								{errors.name && <div className="text-red-400 text-sm">{errors.name.message}</div>}
							</div>
						</div>

						<div className="relative flex flex-col gap-3 w-full">
							<FormLabel htmlFor="password-input">Password</FormLabel>
							<Input
								type={isShowPassword ? 'text' : 'password'}
								id="password-input"
								{...register('password')}
								placeholder="Enter your password"
								className="relative"
							/>

							{password && (
								<button
									type="button"
									className="absolute right-2 h-10 z-10 bg-slate-700 px-3 text-slate-400 hover:text-slate-50 transition top-[33px]"
									onClick={() => setIsShowPassword(!isShowPassword)}
								>
									{isShowPassword ? (
										<ViewIcon className="h-6 w-6" />
									) : (
										<NotAllowedIcon className="h-6 w-6" />
									)}
								</button>
							)}
							{errors.password && (
								<div className="text-red-400 text-sm">{errors.password.message}</div>
							)}
						</div>

						{showPasswordRequirements && password && (
							<>
								<div className="password-strength-indicator">
									{[...Array(3)].map((_, index) => {
										const metCount = getMetRequirementsCount(passwordRequirements);
										return (
											<div
												key={index}
												className={`password-strength-indicator-segment ${
													index < metCount ? `active ${getStrengthLevel(metCount)}` : ''
												}`}
											/>
										);
									})}
								</div>
								<div className="password-requirements">
									{passwordRequirements.map((req, index) => (
										<div
											key={index}
											className={`password-requirement ${req.met ? 'met' : 'not-met'}`}
										>
											<span className="requirement-indicator" />
											{req.text}
										</div>
									))}
								</div>
							</>
						)}
					</div>

					<Button
						type="submit"
						disabled={!isValid || isSubmitting || !isPasswordValid}
						className="h-14 bg-slate-900 hover:bg-slate-800 active:bg-slate-600 transition"
					>
						Sign Up
					</Button>
				</form>

				<span className="text-lg font-normal text-slate-200 flex flex-col lg:inline-block text-center">
					Already have an account?{' '}
					<Link href="/log-in" className="font-bold hover:text-slate-100 transition">
						Log in
					</Link>
				</span>
			</FormProvider>
		</div>
	);
};
