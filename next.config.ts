/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(
			(rule: { test: { test: (arg0: string) => any } }) => rule.test?.test?.('.svg')
		);

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: ['@svgr/webpack'],
			}
		);

		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/dashboard',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
