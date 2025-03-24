// utils/geolocation-utils.ts
'use client';

// Function to get user's geolocation
export async function getUserLocation(): Promise<{
	Latitude: number;
	Longitude: number;
}> {
	return new Promise((resolve) => {
		if (typeof window !== 'undefined' && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve({
						Latitude: position.coords.latitude,
						Longitude: position.coords.longitude,
					});
				},
				() => {
					// Fallback if user denies permission or any error occurs
					resolve({
						Latitude: 0,
						Longitude: 0,
					});
				}
			);
		} else {
			// Fallback for environments without geolocation
			resolve({
				Latitude: 0,
				Longitude: 0,
			});
		}
	});
}

// Function to get user's IP address
// Note: You typically can't reliably get a user's real IP client-side
// This is a placeholder - for real IP detection, you'd need a server-side approach
export async function getUserIP(): Promise<string> {
	try {
		// Option 1: Use a third-party service (many have rate limits)
		const response = await fetch('https://api.ipify.org?format=json');
		const data = await response.json();
		return data.ip;
	} catch {
		// Fallback
		return '127.0.0.1';
	}
}
