import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
	// Add the pathname as a header
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-pathname', request.nextUrl.pathname);

	// Run the NextAuth middleware first
	const authResponse = await NextAuth(authConfig);

	// If NextAuth produces a response (e.g., redirect), return it
	if (authResponse instanceof NextResponse) {
		// Clone the response and set the pathname header
		const response = new NextResponse(authResponse.body, authResponse);
		response.headers.set('x-pathname', request.nextUrl.pathname);
		return response;
	}

	// Otherwise, proceed with Next.js request handling
	return NextResponse.next({
		request: { headers: requestHeaders },
	});
}

export const config = {
	// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
