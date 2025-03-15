// import type { NextAuthConfig } from 'next-auth';
//
// export const authConfig = {
//     pages: {
//         signIn: '/auth',
//     },
//     callbacks: {
//         authorized({ auth, request: { nextUrl } }) {
//             const isLoggedIn = !!auth?.user;
//             const isOnDashboard = nextUrl.pathname.startsWith('/');
//
//             // Handle session error (e.g., when the refresh token is invalid)
//             if (auth?.error === 'RefreshAccessTokenError') {
//                 // Redirect to login page with error
//                 return Response.redirect(
//                     new URL(`/auth?error=RefreshAccessTokenError`, nextUrl)
//                 );
//             }
//
//             if (isOnDashboard) {
//                 return isLoggedIn;
//                  // Redirect unauthenticated users to login page
//             } else if (isLoggedIn) {
//                 return Response.redirect(new URL('/', nextUrl));
//             }
//             return true;
//         },
//     },
//     providers: [],
//     session: {
//         strategy: 'jwt',
//         maxAge: 7 * 24 * 60 * 60, // 7 days
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// } satisfies NextAuthConfig;