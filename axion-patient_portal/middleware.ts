// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { auth } from "@/app/api/auth/auth"; // Import NextAuth session check
//
// export async function middleware(request: NextRequest) {
//     const session = await auth(); // Fetch the session using NextAuth
//
//     const protectedRoutes = ["/", "/reports", "/medicine", "/profile"];
//
//     if (protectedRoutes.includes(request.nextUrl.pathname)) {
//         if (!session) {
//             return NextResponse.redirect(new URL("/auth", request.url));
//         }
//     }
//
//     return NextResponse.next();
// }
//
// export const config = {
//     matcher: ["/", "/reports", "/medicine", "/profile"],
// };

// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import { NextResponse } from 'next/server';
//
// import { NextRequest } from 'next/server';
//
// export default async function middleware(request: NextRequest) {
//     // Add the pathname as a header
//     const requestHeaders = new Headers(request.headers);
//     requestHeaders.set('x-pathname', request.nextUrl.pathname);
//
//     // Run the NextAuth middleware first
//     const authResponse = NextAuth(authConfig);
//
//     // If NextAuth produces a response (e.g., redirect), return it
//     if (authResponse && authResponse instanceof NextResponse) {
//         // Clone the response and set the pathname header
//         const response = new NextResponse(authResponse.body, authResponse);
//         response.headers.set('x-pathname', request.nextUrl.pathname);
//         return response;
//     }
//
//     // Otherwise, proceed with Next.js request handling
//     return NextResponse.next({
//         request: { headers: requestHeaders },
//     });
// }
//
// export const config = {
//     // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
//
// export default async function middleware(request: NextRequest) {
//     // Create a response object with CORS headers
//     const response = NextResponse.next();
//
//     // Set CORS headers for the response
//     response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins or set a specific origin
//     response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowed methods
//     response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
//     response.headers.set('Access-Control-Allow-Credentials', 'true'); // If you want to allow credentials (cookies, etc.)
//
//     // Handle pre-flight request (OPTIONS)
//     if (request.method === 'OPTIONS') {
//         return new NextResponse(null, { status: 204, headers: response.headers });
//     }
//
//     // Add the pathname as a header
//     response.headers.set('x-pathname', request.nextUrl.pathname);
//
//     // Run the NextAuth middleware
//     const authResponse = await NextAuth(authConfig);
//
//     // If NextAuth produces a response (e.g., redirect), return it with the CORS headers
//     if (authResponse && authResponse instanceof NextResponse) {
//         const authWithCorsResponse = new NextResponse(authResponse.body, authResponse);
//         authWithCorsResponse.headers.set('x-pathname', request.nextUrl.pathname);
//         return authWithCorsResponse;
//     }
//
//     // Otherwise, return the response with CORS headers
//     return response;
// }
//
// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'], // Apply to all routes except for API and static files
// };

// import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
    // Create a response object with CORS headers
    const response = NextResponse.next();

    // Set CORS headers for the response
    response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins or set a specific origin
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowed methods
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    response.headers.set('Access-Control-Allow-Credentials', 'true'); // If you want to allow credentials (cookies, etc.)

    // Handle pre-flight request (OPTIONS)
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 204, headers: response.headers });
    }

    // Authentication check for protected routes
    const sessionToken = localStorage.get('session_token');  // Get session token from cookies
    const refreshToken = localStorage.get('refresh_token');  // Get refresh token from cookies

    // If both tokens are not available, redirect to the login page
    if (!sessionToken || !refreshToken) {
        return NextResponse.redirect(new URL('/auth', request.url)); // Redirect to login
    }

    // Add the pathname as a custom header to help with route-specific logic (optional)
    response.headers.set('x-pathname', request.nextUrl.pathname);

    // Otherwise, return the response with CORS headers
    return response;
}

// Apply the middleware to the protected pages
export const config = {
    matcher: ['/', '/profile', '/medicine', '/reports'], // Protected routes
};