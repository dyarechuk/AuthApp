'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import { Geist, Geist_Mono } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

import { Header } from '@/components/Header';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const queryClient = new QueryClient();

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900 h-[100vh] w-full relative`}
			>
				<Header />

				<QueryClientProvider client={queryClient}>
					{children}
					<ToastContainer />
				</QueryClientProvider>
			</body>
		</html>
	);
}
