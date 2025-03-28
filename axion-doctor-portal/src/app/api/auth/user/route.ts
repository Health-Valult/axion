import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(): Promise<Response> {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get('session')?.value;

	if (!sessionToken) {
		return NextResponse.json(
			{ error: 'Not authenticated' },
			{ status: 401 }
		);
	}

	try {
		const userResponse = await fetch(
			`https://axiontestgateway.azure-api.net/axion/user/profile`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${sessionToken}`,
				},
				cache: 'no-store',
			}
		);

		if (!userResponse.ok) {
			return NextResponse.json(
				{ error: 'Failed to fetch user data' },
				{ status: userResponse.status }
			);
		}

		const userData = await userResponse.json();
		return NextResponse.json(userData);
	} catch (error) {
		console.error('Error fetching user data:', error);
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
