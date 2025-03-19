// lib/auth.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function requireAuth(redirectTo = '/login') {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get('session')?.value;

	if (!sessionToken) {
		// Redirect to login page with callback URL
		const callbackUrl = encodeURIComponent(redirectTo);
		redirect(`/login?callbackUrl=${callbackUrl}`);
	}

	// If we have a session token, we're authenticated
	// The middleware will handle checking if the token is valid
	return true;
}
