import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
	const token = request.cookies.get('access-token')?.value;

	if (!token) {
		return NextResponse.redirect(new URL('/log-in', request.url));
	}
};

export const config = {
	matcher: ['/dashboard'],
};
