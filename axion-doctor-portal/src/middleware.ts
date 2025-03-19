// middleware.ts (place in the project root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes
const publicRoutes = [
	'/login',
	'/signup',
	'/api/auth/set-cookies',
	'/api/proxy',
];

export async function middleware(request: NextRequest): Promise<NextResponse> {
	const { pathname } = request.nextUrl;

	// For public routes, allow access
	if (publicRoutes.some((route) => pathname.startsWith(route))) {
		return NextResponse.next();
	}

	// Get session token
	const sessionToken = request.cookies.get('session')?.value;

	// If no session token, redirect to login
	if (!sessionToken) {
		// For API routes, return 401
		if (pathname.startsWith('/api/')) {
			return new NextResponse(null, { status: 401 });
		}

		// For pages, redirect to login
		return NextResponse.redirect(
			new URL(
				`/login?callbackUrl=${encodeURIComponent(pathname)}`,
				request.url
			)
		);
	}

	try {
		// For session token near expiry, try to refresh
		// This assumes you have a way to check token expiry
		const isTokenExpiring = checkTokenExpiring(sessionToken);

		if (isTokenExpiring) {
			const refreshToken = request.cookies.get('refresh_token')?.value;

			if (refreshToken) {
				const response = NextResponse.next();

				// Attempt to refresh token
				const newTokens = await refreshTokens(refreshToken);

				if (newTokens) {
					// Set new tokens in cookies
					response.cookies.set('session', newTokens.session_token, {
						httpOnly: true,
						sameSite: 'lax',
						secure: process.env.NODE_ENV === 'production',
						expires: new Date(Date.now() + 15 * 60 * 1000),
						path: '/',
					});

					return response;
				}
			}
		}

		// Valid session token, continue
		return NextResponse.next();
	} catch (error) {
		// Error handling for token validation
		console.error('Token validation error:', error);

		// Clear cookies and redirect to login
		const response = NextResponse.redirect(new URL('/login', request.url));
		response.cookies.delete('session');
		response.cookies.delete('refresh_token');

		return response;
	}
}

// Helper function to check if token is expiring soon
function checkTokenExpiring(token: string): boolean {
	// Implement your token expiry check logic here
	// This is just a placeholder
	return false;
}

// Helper function to refresh tokens
async function refreshTokens(
	refreshToken: string
): Promise<{ session_token: string } | null> {
	try {
		const response = await fetch(
			'http://localhost:3000/api/proxy/refresh',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${refreshToken}`,
				},
				body: JSON.stringify({ Token: refreshToken }),
			}
		);

		if (!response.ok) return null;

		return await response.json();
	} catch (error) {
		console.error('Token refresh error:', error);
		return null;
	}
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
