import axios from 'axios';
import Cookies from 'js-cookie';

export const instance = axios.create({
	baseURL: 'http://localhost:5000/api/v1',
});

instance.interceptors.request.use(
	async (config) => {
		const token = Cookies.get('access-token');

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
