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
	nic: string;
	accessToken: string;
	refreshToken: string;
	accessTokenExpires: number;
	[key: string]: any;
}

// API token response type
interface ApiTokenResponse {
	accessToken: string;
	refreshToken: string;
	user: {
		nic: string;
		[key: string]: any;
	};
}

async function authenticateUser(
	nic: string,
	password: string
): Promise<ApiTokenResponse | null> {
	try {
		const response = await fetch(`${apiUrl}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ nic, password }),
		});

		if (!response.ok) {
			console.error('Login failed:', response.statusText);
			return null;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error authenticating user:', error);
		return null;
	}
}

// Type augmentation for next-auth
declare module 'next-auth' {
	interface User {
		accessToken: string;
		refreshToken: string;
		accessTokenExpires: number;
		nic: string;
	}

	interface Session {
		user: {
			nic: string;
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
			nic: string;
			[key: string]: any;
		};
	}
}

// This function now returns Promise<JWT>
async function refreshAccessToken(token: JWT): Promise<JWT> {
	try {
		const response = await fetch(`${apiUrl}/auth/refresh-token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				refreshToken: token.refreshToken,
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to refresh access token');
		}

		const refreshedTokens = await response.json();

		return {
			...token,
			accessToken: refreshedTokens.accessToken,
			refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
			accessTokenExpires: Date.now() + 60 * 60 * 1000,
		};
	} catch (error) {
		console.error('Error refreshing access token:', error);

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
				const parsedCredentials = z
					.object({
						nic: z
							.string()
							.min(8, 'NIC must be at least 8 characters'),
						password: z
							.string()
							.min(6, 'Password must be at least 6 characters'),
					})
					.safeParse(credentials);

				if (!parsedCredentials.success) return null;

				const { nic, password } = parsedCredentials.data;
				const result = await authenticateUser(nic, password);

				if (!result || !result.accessToken) return null;

				return {
					id: result.user.nic, // NextAuth requires an id field
					...result.user,
					accessToken: result.accessToken,
					refreshToken: result.refreshToken,
					accessTokenExpires: Date.now() + 60 * 60 * 1000,
				};
			},
		}),
	],
	callbacks: {
		// Fixed JWT callback with proper typing
		async jwt({ token, user }) {
			if (user) {
				// Initial sign in - user will be of type User from the authorize callback
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
				token.accessTokenExpires = user.accessTokenExpires;
				token.user = {
					...user,
				};
				return token;
			}

			// On subsequent calls, user is undefined, and we work with the token
			if (
				token.accessTokenExpires &&
				Date.now() < token.accessTokenExpires
			) {
				return token;
			}

			// Access token has expired, try to refresh it
			return refreshAccessToken(token);
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			// Update session with data from token
			session.user = token.user;
			session.accessToken = token.accessToken;

			if (token.error) {
				session.error = token.error;
			}

			return session;
		},
	},
};

export const { auth, signIn, signOut } = NextAuth(authOptions);
