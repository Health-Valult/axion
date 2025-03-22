/**
 * Get authentication tokens from cookies via API route
 * This function is meant to be used in client components
 * @returns Promise with session token and refresh token
 */
export async function getTokensFromCookies(): Promise<{
	sessionToken: string | null;
	refreshToken: string | null;
	success: boolean;
}> {
	try {
		const response = await fetch('/api/auth/get-tokens', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			// Needed to include cookies in the request
			credentials: 'include',
		});

		if (!response.ok) {
			const errorData = await response.status;
			console.error('Failed to retrieve tokens:', errorData);
			return {
				sessionToken: null,
				refreshToken: null,
				success: false,
			};
		}

		const data = await response.json();

		return {
			sessionToken: data.tokens.session_token,
			refreshToken: data.tokens.refresh_token,
			success: true,
		};
	} catch (error) {
		console.error('Error fetching tokens:', error);
		return {
			sessionToken: null,
			refreshToken: null,
			success: false,
		};
	}
}
