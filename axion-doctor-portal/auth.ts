// auth.ts
import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { JWT } from 'next-auth/jwt';
import type { User as NextAuthUser, Session } from 'next-auth';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Define custom user type that extends NextAuth's User
interface User extends NextAuthUser {
	email?: string | null;
	[key: string]: any;
}

// API token response type - updated to match actual API response
interface ApiTokenResponse {
	session_token: string;
	refresh_token: string;
}

async function authenticateUser(
	email: string,
	password: string,
	ipAddress?: string,
	latitude?: string,
	longitude?: string
): Promise<{ tokens: ApiTokenResponse } | null> {
	try {
		console.log('authenticateUser called with:', {
			email,
			password: '******', // Don't log actual password
			ipAddress,
			latitude,
			longitude,
		});

		// Ensure the request body has the exact format and data types required
		const loginData = {
			Email: email, // String
			Password: password, // String
			Location: {
				Latitude: 6.9271, // Number (not string)
				Longitude: 79.8612, // Number (not string)
			},
			IpAddress: '192.168.1.1', // String
			AndroidId: '', // Empty string
		};

		console.log(
			'Request body to /api/proxy (stringified):',
			JSON.stringify(loginData)
		);
		console.log('Request body to /api/proxy (raw object):', loginData);
		console.log('Checking data types:', {
			EmailType: typeof loginData.Email,
			PasswordType: typeof loginData.Password,
			LatitudeType: typeof loginData.Location.Latitude,
			LongitudeType: typeof loginData.Location.Longitude,
			IpAddressType: typeof loginData.IpAddress,
		});

		const response = await fetch(`http://localhost:3000/api/proxy`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(loginData),
			cache: 'no-store',
		});

		console.log('Response status:', response.status);
		console.log('Response status text:', response.statusText);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Login failed - Response not OK:', {
				status: response.status,
				statusText: response.statusText,
				errorText,
			});
			return null;
		}

		let data;
		try {
			data = await response.json();
			console.log('Response data:', data);
		} catch (jsonError) {
			console.error('Error parsing JSON response:', jsonError);
			const textResponse = await response.text();
			console.log('Raw response text:', textResponse);
			return null;
		}

		// Check if the expected tokens exist in the response
		if (!data.session_token || !data.refresh_token) {
			console.error('Missing required tokens in response:', data);
			return null;
		}

		// Extract tokens from the response
		const tokens = {
			session_token: data.session_token,
			refresh_token: data.refresh_token,
		};

		console.log('Tokens extracted:', {
			session_token_exists: !!tokens.session_token,
			refresh_token_exists: !!tokens.refresh_token,
		});

		// Fetch user data with the obtained session token
		// console.log('Fetching user data with session token');
		// const userResponse = await fetch(`${apiUrl}/user/profile`, {
		// 	headers: {
		// 		Authorization: `Bearer ${tokens.session_token}`,
		// 	},
		// 	cache: 'no-store',
		// });

		// console.log('User profile response status:', userResponse.status);

		// if (!userResponse.ok) {
		// 	console.error('Failed to fetch user data:', {
		// 		status: userResponse.status,
		// 		statusText: userResponse.statusText,
		// 	});
		// 	return null;
		// }

		// const userData = await userResponse.json();
		// console.log('User data retrieved:', {
		// 	email: userData.email,
		// 	hasUserData: !!userData,
		// });

		// return { tokens, userData };
		return { tokens };
	} catch (error) {
		console.error('Error authenticating user:', error);
		console.error('Error details:', {
			name: (error as Error).name,
			message: (error as Error).message,
			stack: (error as Error).stack,
		});
		return null;
	}
}

// Type augmentation for next-auth
declare module 'next-auth' {
	interface User {
		email?: string | null;
		[key: string]: any;
	}

	interface Session {
		user: {
			email?: string | null;
			[key: string]: any;
		};
		accessToken: string;
		error?: string;
	}
}

// Type augmentation for next-auth/jwt
declare module 'next-auth/jwt' {
	interface JWT {
		accessToken: string;
		refreshToken: string;
		accessTokenExpires: number;
		error?: string;
		user: {
			email?: string | null;
			[key: string]: any;
		};
	}
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
	try {
		console.log('Attempting to refresh access token');

		const response = await fetch(`${apiUrl}/axion/auth/refresh`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				refresh_token: token.refreshToken,
			}),
			cache: 'no-store',
		});

		console.log('Refresh token response status:', response.status);

		if (!response.ok) {
			console.error('Failed to refresh access token:', {
				status: response.status,
				statusText: response.statusText,
			});
			throw new Error('Failed to refresh access token');
		}

		const refreshedTokens = await response.json();
		console.log('Tokens refreshed successfully');

		return {
			...token,
			accessToken: refreshedTokens.session_token,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
			accessTokenExpires: Date.now() + 60 * 60 * 1000, // 60 minutes
		};
	} catch (error) {
		console.error('Error refreshing access token:', error);
		console.error('Error details:', {
			name: (error as Error).name,
			message: (error as Error).message,
		});

		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
}

// Create the NextAuth configuration
const authOptions: NextAuthConfig = {
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				console.log('authorize function called with credentials:', {
					email: credentials?.email,
					hasPassword: !!credentials?.password,
					hasIpAddress: !!credentials?.ipAddress,
					hasLatitude: !!credentials?.latitude,
					hasLongitude: !!credentials?.longitude,
				});

				const parsedCredentials = z
					.object({
						email: z.string().email('Enter a valid email address'),
						password: z
							.string()
							.min(6, 'Password must be at least 6 characters'),
						ipAddress: z.string().optional(),
						latitude: z.string().optional(),
						longitude: z.string().optional(),
					})
					.safeParse(credentials);

				if (!parsedCredentials.success) {
					console.error(
						'Credential validation failed:',
						parsedCredentials.error
					);
					return null;
				}

				const { email, password, ipAddress, latitude, longitude } =
					parsedCredentials.data;

				console.log(
					'Credentials parsed successfully, calling authenticateUser'
				);

				// Pass the metadata to authenticateUser
				const result = await authenticateUser(
					email,
					password,
					ipAddress,
					latitude,
					longitude
				);

				if (!result || !result.tokens.session_token) {
					console.error('Authentication failed - no tokens returned');
					return null;
				}

				console.log('Authentication successful, preparing user object');

				return {
					// id: result.userData.email, // NextAuth requires an id field
					// email: result.userData.email,
					// ...result.userData,
					// Store tokens in the user object temporarily
					// These will be transferred to the token in the JWT callback
					accessToken: result.tokens.session_token,
					refreshToken: result.tokens.refresh_token,
					accessTokenExpires: Date.now() + 60 * 60 * 1000, // 60 minutes
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			console.log('JWT callback called', {
				hasToken: !!token,
				hasUser: !!user,
			});

			if (user) {
				// Initial sign in - user will be of type User from the authorize callback
				console.log('JWT callback with user, setting token values');
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
				token.accessTokenExpires = user.accessTokenExpires;

				// Remove accessToken and refreshToken from user object before storing in token
				const {
					accessToken,
					refreshToken,
					accessTokenExpires,
					...userWithoutTokens
				} = user;

				token.user = userWithoutTokens;
				return token;
			}

			// On subsequent calls, user is undefined, and we work with the token
			if (
				token.accessTokenExpires &&
				Date.now() < token.accessTokenExpires
			) {
				console.log('Token still valid, returning existing token');
				return token;
			}

			// Access token has expired, try to refresh it
			console.log('Token expired, attempting refresh');
			return refreshAccessToken(token);
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			console.log('Session callback called', {
				hasSession: !!session,
				hasToken: !!token,
				tokenError: token.error || 'none',
			});

			// Update session with data from token
			session.user = {
				...token.user,
				email: token.user?.email || null,
			};

			// Ensure accessToken is directly accessible on the session
			session.accessToken = token.accessToken;

			if (token.error) {
				console.log(`Setting session error: ${token.error}`);
				session.error = token.error;
			}

			console.log('Session returned:', {
				hasUser: !!session.user,
				hasAccessToken: !!session.accessToken,
				error: session.error || 'none',
			});

			return session;
		},
	},
	events: {
		async signIn({ user }) {
			console.log(`User ${user.email} signed in`);
		},
		async signOut() {
			// You could implement server-side token revocation here if needed
			console.log('User signed out');
		},
	},
	debug: process.env.NODE_ENV === 'development',
};

export const { auth, signIn, signOut } = NextAuth(authOptions);
