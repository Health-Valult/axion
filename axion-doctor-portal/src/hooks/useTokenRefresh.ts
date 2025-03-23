// hooks/useTokenRefresh.ts
import { useEffect } from 'react';

export function useTokenRefresh() {
	useEffect(() => {
		// Function to refresh tokens
		const refreshTokens = async () => {
			try {
				const response = await fetch('/api/auth/refresh', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				});

				if (!response.ok) {
					console.error(
						'Failed to refresh token:',
						await response.status
					);
				}
			} catch (error) {
				console.error('Error refreshing tokens:', error);
			}
		};

		// Calculate time until token expires (55 minutes from now to refresh 5 minutes before expiry)
		const refreshTime = 55 * 60 * 1000; // 55 minutes in milliseconds

		// Set up the timer to refresh tokens
		const timerId = setTimeout(refreshTokens, refreshTime);

		// Clean up the timer when the component unmounts
		return () => clearTimeout(timerId);
	}, []);
}
