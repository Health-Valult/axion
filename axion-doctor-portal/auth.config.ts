import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	pages: {
		signIn: '/login',
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

			// Handle session error (e.g., when the refresh token is invalid)
			if (auth?.error === 'RefreshAccessTokenError') {
				// Redirect to login page with error
				return Response.redirect(
					new URL(`/login?error=RefreshAccessTokenError`, nextUrl)
				);
			}

			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(new URL('/dashboard', nextUrl));
			}
			return true;
		},
	},
	providers: [],
	session: {
		strategy: 'jwt',
		maxAge: 7 * 24 * 60 * 60, // 7 days
	},
	secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
