import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
    // Create a response object with CORS headers
    const response = NextResponse.next();

    // Set CORS headers for the request
    request.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins or set a specific origin
    request.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowed methods
    request.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    request.headers.set('Access-Control-Allow-Credentials', 'true'); // If you want to allow credentials (cookies, etc.)

    // Set CORS headers for the response
    response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins or set a specific origin
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowed methods
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    response.headers.set('Access-Control-Allow-Credentials', 'true'); // If you want to allow credentials (cookies, etc.)

    // Handle pre-flight request (OPTIONS)
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 204, headers: response.headers });
    }

    if (typeof window !== 'undefined') {
        // Access sessionStorage here
      // Authentication check for protected routes
    const sessionToken = sessionStorage.get('session_token');  // Get session token from cookies
    const refreshToken = sessionStorage.get('refresh_token');  // Get refresh token from cookies

    // If both tokens are not available, redirect to the login page
    if (!sessionToken || !refreshToken) {
        return NextResponse.redirect(new URL('/Register', request.url)); // Redirect to login
    }}

    // Add the pathname as a custom header to help with route-specific logic (optional)
    response.headers.set('x-pathname', request.nextUrl.pathname);

    // Otherwise, return the response with CORS headers
    return response;
}

// Apply the middleware to the protected pages
export const config = {
    matcher: ['/', '/profile', '/medicine', '/reports'], // Protected routes
};