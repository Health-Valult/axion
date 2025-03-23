import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request): Promise<Response> {
	const { session_token, refresh_token } = await request.json();

	const cookieStore = await cookies();

	// Session token cookie
	cookieStore.set('session', session_token, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		expires: new Date(Date.now() + 60 * 60 * 1000), // 60 minutes
		path: '/',
	});

	// Refresh token cookie
	cookieStore.set('refresh_token', refresh_token, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
		path: '/',
	});

	return NextResponse.json({ success: true });
}
