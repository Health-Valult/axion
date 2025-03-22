// app/api/auth/get-tokens/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(): Promise<Response> {
	const cookieStore = await cookies();

	// Get tokens from cookies
	const sessionToken = cookieStore.get('session')?.value;
	const refreshToken = cookieStore.get('refresh_token')?.value;

	// Check if tokens exist
	if (!sessionToken && !refreshToken) {
		return NextResponse.json(
			{
				error: 'No authentication tokens found',
			},
			{
				status: 401,
			}
		);
	}

	// Return tokens to the client
	return NextResponse.json({
		success: true,
		tokens: {
			session_token: sessionToken || null,
			refresh_token: refreshToken || null,
		},
	});
}

// Only used by server components
export async function getTokensFromServerCookies() {
	const cookieStore = await cookies();

	return {
		sessionToken: cookieStore.get('session')?.value || null,
		refreshToken: cookieStore.get('refresh_token')?.value || null,
	};
}
