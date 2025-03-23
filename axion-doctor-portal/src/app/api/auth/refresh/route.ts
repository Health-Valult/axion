// app/api/auth/refresh/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(): Promise<Response> {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get('session')?.value;
	const refreshToken = cookieStore.get('refresh_token')?.value;

	if (!sessionToken || !refreshToken) {
		return NextResponse.json(
			{ success: false, message: 'No valid tokens found' },
			{ status: 401 }
		);
	}

	try {
		// Call the refresh endpoint
		const response = await fetch(
			'https://axiontestgateway.azure-api.net/axion/auth/refresh',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `bearer ${sessionToken}`,
				},
				body: JSON.stringify({ Token: refreshToken }),
			}
		);

		if (!response.ok) {
			const errorData = await response.statusText;
			return NextResponse.json(
				{
					success: false,
					message: errorData || 'Token refresh failed',
				},
				{ status: response.status }
			);
		}

		const newTokens = await response.json();

		// Update the cookies with new tokens
		cookieStore.set('session', newTokens.session_token, {
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			expires: new Date(Date.now() + 60 * 60 * 1000), // 60 minutes
			path: '/',
		});

		if (newTokens.refresh_token) {
			cookieStore.set('refresh_token', newTokens.refresh_token, {
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
				path: '/',
			});
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error refreshing token:', error);
		return NextResponse.json(
			{ success: false, message: 'Error refreshing token' },
			{ status: 500 }
		);
	}
}
