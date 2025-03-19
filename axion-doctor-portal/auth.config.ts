// import type { NextAuthConfig } from 'next-auth';

// export const authConfig = {
// 	pages: {
// 		signIn: '/login',
// 	},
// 	callbacks: {
// 		authorized({ auth, request: { nextUrl } }) {
// 			const isLoggedIn = !!auth?.user && !!auth?.user?.email; // Check both user and email
// 			const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
// 			const isApiRoute = nextUrl.pathname.startsWith('/api/');

// 			console.log('auth.config authorized check:', {
// 				isLoggedIn,
// 				isOnDashboard,
// 				isApiRoute,
// 				authUser: !!auth?.user,
// 				authEmail: auth?.user?.email || 'none',
// 				authToken: !!auth?.accessToken,
// 				pathname: nextUrl.pathname,
// 			});

// 			// Handle session error (e.g., when the refresh token is invalid)
// 			if (auth?.error === 'RefreshAccessTokenError') {
// 				// Redirect to login page with error
// 				return Response.redirect(
// 					new URL(`/login?error=RefreshAccessTokenError`, nextUrl)
// 				);
// 			}

// 			// For API routes, let the route handle authentication
// 			if (isApiRoute) {
// 				// Allow the API route handler to manage auth
// 				return true;
// 			}

// 			if (isOnDashboard) {
// 				if (isLoggedIn) return true;
// 				return false; // Redirect unauthenticated users to login page
// 			} else if (isLoggedIn && nextUrl.pathname === '/login') {
// 				return Response.redirect(new URL('/', nextUrl));
// 			}
// 			return true;
// 		},
// 	},
// 	providers: [], // Providers are configured in auth.ts
// 	session: {
// 		strategy: 'jwt',
// 		maxAge: 7 * 24 * 60 * 60, // 7 days for refresh token
// 	},
// 	secret: process.env.AUTH_SECRET,
// } satisfies NextAuthConfig;
