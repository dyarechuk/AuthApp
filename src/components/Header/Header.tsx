'use client';

import WheelIcon from '../../../public/assets/icons/steering-wheel.svg';

export const Header = () => {
	return (
		<header className="flex bg-red w-full h-20 justify-between items-center px-5 bg-slate-800">
			<div className="flex gap-2 items-center">
				<WheelIcon className="w-10 h-10 text-slate-200" />
				<h2 className="text-slate-200 font-bold text-2xl">Veel</h2>
			</div>
		</header>
	);
};
