// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(): Promise<Response> {
	const cookieStore = await cookies();

	// Clear session and refresh tokens
	cookieStore.set('session', '', {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 0,
		path: '/',
	});

	cookieStore.set('refresh_token', '', {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 0,
		path: '/',
	});

	return NextResponse.json({ success: true });
}
