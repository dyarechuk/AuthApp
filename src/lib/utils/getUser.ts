import { instance } from './axios.instance';

export const getUser = async () => {
	try {
		const response = await instance.get('auth/me');

		return response.data;
	} catch (error) {
		throw new Error('Failed to get user: ' + error);
	}
};
