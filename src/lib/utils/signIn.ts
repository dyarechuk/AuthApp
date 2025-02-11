import Cookies from 'js-cookie';
import { AxiosError } from 'axios';

import { instance } from './axios.instance';
import { User } from '../dto';

interface APIErrorResponse {
	message?: string;
}

export const signIn = async (userInfo: User) => {
	try {
		const response = await instance.post<{
			accessToken: string;
		}>('auth/login', userInfo);

		Cookies.set('access-token', response.data.accessToken);

		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			const apiError = error.response?.data as APIErrorResponse;
			const errorMessage = apiError?.message || 'Failed to sign in';
			throw new Error(errorMessage);
		}
		throw new Error('An unexpected error occurred');
	}
};
