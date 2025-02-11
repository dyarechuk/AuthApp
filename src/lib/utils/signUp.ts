import { AxiosError } from 'axios';

import { instance } from './axios.instance';
import { User } from '../dto';

interface APIErrorResponse {
	message?: string;
}

export const signUp = async (userInfo: User) => {
	try {
		const response = await instance.post('/auth/register', userInfo);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			const apiError = error.response?.data as APIErrorResponse;
			const errorMessage = apiError?.message || 'Failed to sign up';
			throw new Error(errorMessage);
		}
		throw new Error('An unexpected error occurred');
	}
};
