const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="absolute top-[50%] -translate-y-[50%] w-full px-5 mx-auto">{children}</div>
	);
};

export default AuthLayout;
