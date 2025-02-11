'use client';

import { Button } from '@/components/ui';
import { toastSuccess } from '@/lib/toastSuccess';
import { getUser } from '@/lib/utils/getUser';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	});

	const router = useRouter();

	const handleLogout = () => {
		Cookies.remove('access-token');
		toastSuccess('Logout success');

		router.push('/log-in');
	};

	return (
		<div className="flex flex-col items-center gap-5 text-slate-200 bg-slate-700 rounded-xl p-5 md:w-[400px] mx-auto">
			<title>Dashboard</title>

			<h1 className="mb-5 text-2xl border-b pb-2">Dashboard</h1>

			<div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
				<div className="rounded-full border-2">
					<Image
						className="rounded-[50%]"
						src="/assets/icons/user.svg"
						alt="Avatar"
						width={140}
						height={140}
					/>
				</div>

				<div className="w-full flex flex-col gap-3">
					<h2 className="text-xl">Username</h2>

					<div className="border border-cyan-700 rounded-lg p-3 bg-slate-800 overflow-x-hidden overflow-ellipsis max-w-[250px]">
						{user?.username}
					</div>
				</div>
			</div>

			<Button type="button" variant={'secondary'} onClick={handleLogout} className="w-full h-12">
				Log out
			</Button>
		</div>
	);
};

export default Dashboard;
