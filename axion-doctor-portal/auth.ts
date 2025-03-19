// // import NextAuth from 'next-auth';
// // import type { NextAuthConfig } from 'next-auth';
// // import Credentials from 'next-auth/providers/credentials';
// // import { authConfig } from './auth.config';
// // import { z } from 'zod';
// // import type { JWT } from 'next-auth/jwt';
// // import type { User as NextAuthUser, Session, DefaultSession } from 'next-auth';
// // import type { AdapterUser } from 'next-auth/adapters';

// // const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// // // Define custom user type that extends NextAuth's User
// // interface User extends NextAuthUser {
// // 	[key: string]: any;
// // }

// // // API token response type - updated to match actual API response
// // interface ApiTokenResponse {
// // 	session_token: string;
// // 	refresh_token: string;
// // }

// // async function authenticateUser(
// // 	email: string,
// // 	password: string,
// // 	ipAddress?: string,
// // 	latitude?: string,
// // 	longitude?: string
// // ): Promise<{ tokens: ApiTokenResponse; userData: any } | null> {
// // 	try {
// // 		console.log('authenticateUser called with:', {
// // 			email,
// // 			password: '******', // Don't log actual password
// // 			ipAddress,
// // 			latitude,
// // 			longitude,
// // 		});

// // 		// Ensure the request body has the exact format and data types required
// // 		const loginData = {
// // 			Email: email, // String
// // 			Password: password, // String
// // 			Location: {
// // 				Latitude: latitude ? parseFloat(latitude) : 6.9271, // Convert to number
// // 				Longitude: longitude ? parseFloat(longitude) : 79.8612, // Convert to number
// // 			},
// // 			IpAddress: ipAddress || '192.168.1.1', // String
// // 			AndroidId: '', // Empty string
// // 		};

// // 		console.log(
// // 			'Request body to /api/proxy (stringified):',
// // 			JSON.stringify(loginData)
// // 		);
// // 		console.log('Request body to /api/proxy (raw object):', loginData);
// // 		console.log('Checking data types:', {
// // 			EmailType: typeof loginData.Email,
// // 			PasswordType: typeof loginData.Password,
// // 			LatitudeType: typeof loginData.Location.Latitude,
// // 			LongitudeType: typeof loginData.Location.Longitude,
// // 			IpAddressType: typeof loginData.IpAddress,
// // 		});

// // 		const response = await fetch(`http://localhost:3000/api/proxy`, {
// // 			method: 'POST',
// // 			headers: { 'Content-Type': 'application/json' },
// // 			body: JSON.stringify(loginData),
// // 			cache: 'no-store',
// // 		});

// // 		console.log('Response status:', response.status);
// // 		console.log('Response status text:', response.statusText);

// // 		if (!response.ok) {
// // 			const errorText = await response.text();
// // 			console.error('Login failed - Response not OK:', {
// // 				status: response.status,
// // 				statusText: response.statusText,
// // 				errorText,
// // 			});
// // 			return null;
// // 		}

// // 		let data;
// // 		try {
// // 			data = await response.json();
// // 			console.log('Response data:', data);
// // 		} catch (jsonError) {
// // 			console.error('Error parsing JSON response:', jsonError);
// // 			const textResponse = await response.text();
// // 			console.log('Raw response text:', textResponse);
// // 			return null;
// // 		}

// // 		// Check if the expected tokens exist in the response
// // 		if (!data.session_token || !data.refresh_token) {
// // 			console.error('Missing required tokens in response:', data);
// // 			return null;
// // 		}

// // 		// Extract tokens from the response
// // 		const tokens = {
// // 			session_token: data.session_token,
// // 			refresh_token: data.refresh_token,
// // 		};

// // 		console.log('Tokens extracted:', {
// // 			session_token_exists: !!tokens.session_token,
// // 			refresh_token_exists: !!tokens.refresh_token,
// // 		});

// // 		// Fetch user data with the obtained session token
// // 		console.log('Fetching user data with session token');

// // 		const userResponse = await fetch(`http://localhost:3000/api/proxy4`, {
// // 			method: 'GET',
// // 			headers: {
// // 				Authorization: `Bearer ${tokens.session_token}`,
// // 			},
// // 			cache: 'no-store',
// // 		});

// // 		console.log('User profile response status:', userResponse.status);

// // 		if (!userResponse.ok) {
// // 			console.error('Failed to fetch user data:', {
// // 				status: userResponse.status,
// // 				statusText: userResponse.statusText,
// // 			});
// // 			return null;
// // 		}

// // 		const userData = await userResponse.json();
// // 		console.log('User data retrieved:', {
// // 			email: userData.Email,
// // 			hasUserData: !!userData,
// // 		});

// // 		return { tokens, userData };
// // 	} catch (error) {
// // 		console.error('Error authenticating user:', error);
// // 		console.error('Error details:', {
// // 			name: (error as Error).name,
// // 			message: (error as Error).message,
// // 			stack: (error as Error).stack,
// // 		});
// // 		return null;
// // 	}
// // }

// // // Type augmentation for next-auth
// // declare module 'next-auth' {
// // 	interface User {
// // 		id: string;
// // 		email: string;
// // 		name?: string | null;
// // 		image?: string | null;
// // 		[key: string]: any;
// // 	}

// // 	interface Session {
// // 		user: {
// // 			id: string;
// // 			email: string;
// // 			name?: string | null;
// // 			image?: string | null;
// // 			[key: string]: any;
// // 		};
// // 		accessToken: string;
// // 		error?: string;
// // 	}
// // }

// // // Type augmentation for next-auth/jwt
// // declare module 'next-auth/jwt' {
// // 	interface JWT {
// // 		accessToken: string;
// // 		refreshToken: string;
// // 		accessTokenExpires: number;
// // 		error?: string;
// // 		user: {
// // 			id: string;
// // 			email: string;
// // 			name?: string | null;
// // 			image?: string | null;
// // 			[key: string]: any;
// // 		};
// // 	}
// // }

// // async function refreshAccessToken(token: JWT): Promise<JWT> {
// // 	try {
// // 		console.log('Attempting to refresh access token');

// // 		const response = await fetch(`${apiUrl}/axion/auth/refresh`, {
// // 			method: 'POST',
// // 			headers: {
// // 				Authorization: `Bearer ${token.refreshToken}`,
// // 			},
// // 			body: JSON.stringify({
// // 				Token: token.refreshToken,
// // 			}),
// // 			cache: 'no-store',
// // 		});

// // 		console.log('Refresh token response status:', response.status);

// // 		if (!response.ok) {
// // 			console.error('Failed to refresh access token:', {
// // 				status: response.status,
// // 				statusText: response.statusText,
// // 			});
// // 			throw new Error('Failed to refresh access token');
// // 		}

// // 		const refreshedTokens = await response.json();
// // 		console.log('Tokens refreshed successfully');

// // 		return {
// // 			...token,
// // 			accessToken: refreshedTokens.session_token,
// // 			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
// // 			accessTokenExpires: Date.now() + 60 * 60 * 1000, // 60 minutes
// // 		};
// // 	} catch (error) {
// // 		console.error('Error refreshing access token:', error);
// // 		console.error('Error details:', {
// // 			name: (error as Error).name,
// // 			message: (error as Error).message,
// // 		});

// // 		return {
// // 			...token,
// // 			error: 'RefreshAccessTokenError',
// // 		};
// // 	}
// // }

// // // Create the NextAuth configuration
// // const authOptions: NextAuthConfig = {
// // 	...authConfig,
// // 	providers: [
// // 		Credentials({
// // 			async authorize(credentials) {
// // 				console.log('authorize function called with credentials:', {
// // 					email: credentials?.email,
// // 					hasPassword: !!credentials?.password,
// // 					hasIpAddress: !!credentials?.ipAddress,
// // 					hasLatitude: !!credentials?.latitude,
// // 					hasLongitude: !!credentials?.longitude,
// // 				});

// // const parsedCredentials = z
// // 	.object({
// // 		email: z.string().email('Enter a valid email address'),
// // 		password: z
// // 			.string()
// // 			.min(6, 'Password must be at least 6 characters'),
// // 		ipAddress: z.string().optional(),
// // 		latitude: z.string().optional(),
// // 		longitude: z.string().optional(),
// // 	})
// // 	.safeParse(credentials);

// // 				if (!parsedCredentials.success) {
// // 					console.error(
// // 						'Credential validation failed:',
// // 						parsedCredentials.error
// // 					);
// // 					return null;
// // 				}

// // 				const { email, password, ipAddress, latitude, longitude } =
// // 					parsedCredentials.data;

// // 				console.log(
// // 					'Credentials parsed successfully, calling authenticateUser'
// // 				);

// // 				// Pass the metadata to authenticateUser
// // const result = await authenticateUser(
// // 	email,
// // 	password,
// // 	ipAddress,
// // 	latitude,
// // 	longitude
// // );

// // if (!result || !result.tokens.session_token) {
// // 	console.error('Authentication failed - no tokens returned');
// // 	return null;
// // }

// // 				console.log('Authentication successful, preparing user object');

// // 				// Make sure email is always a string (not null or undefined)
// // 	const userEmail = (
// // 		result.userData.Email ||
// // 		result.userData.email ||
// // 		email ||
// // 		''
// // 	).toString();
// // 	const userId = userEmail || `user-${Date.now()}`;

// // 	// Return a user object with the essential fields
// // 	return {
// // 		id: userId,
// // 		email: userEmail,
// // 		name: result.userData.Name || result.userData.name || null,
// // 		image:
// // 			result.userData.Image || result.userData.image || null,
// // 		...result.userData,
// // 		// Store tokens in the user object temporarily
// // 		// These will be transferred to the token in the JWT callback
// // 		accessToken: result.tokens.session_token,
// // 		refreshToken: result.tokens.refresh_token,
// // 		accessTokenExpires: Date.now() + 60 * 60 * 1000, // 60 minutes
// // 	};
// // },
// // 		}),
// // 	],
// // 	callbacks: {
// // 		async jwt({ token, user, trigger, session }) {
// // 			console.log('JWT callback called', {
// // 				hasToken: !!token,
// // 				hasUser: !!user,
// // 				trigger,
// // 				sessionUpdate: trigger === 'update' ? 'yes' : 'no',
// // 			});

// // 			if (trigger === 'update' && session) {
// // 				// Handle session updates if needed
// // 				console.log('JWT trigger is update, session data:', session);
// // 				return { ...token, ...session };
// // 			}

// // 			if (user) {
// // 				// Initial sign in - user will be of type User from the authorize callback
// // 				console.log('JWT callback with user, setting token values');

// // token.accessToken = user.accessToken;
// // token.refreshToken = user.refreshToken;
// // token.accessTokenExpires = user.accessTokenExpires;

// // 				// Remove tokens from user object before storing
// // 				const {
// // 					accessToken,
// // 					refreshToken,
// // 					accessTokenExpires,
// // 					...userWithoutTokens
// // 				} = user;

// // 				token.user = userWithoutTokens;

// // 				console.log('JWT token after setting user data:', {
// // 					hasAccessToken: !!token.accessToken,
// // 					hasUser: !!token.user,
// // 					email: token.user?.email || 'none',
// // 				});

// // 				return token;
// // 			}

// // 			// On subsequent calls, user is undefined, and we work with the token
// // 			if (
// // 				token.accessTokenExpires &&
// // 				Date.now() < token.accessTokenExpires
// // 			) {
// // 				console.log('Token still valid, returning existing token');
// // 				return token;
// // 			}

// // 			// Access token has expired, try to refresh it
// // 			console.log('Token expired, attempting refresh');
// // 			return refreshAccessToken(token);
// // 		},

// // 		async session({ session, token }) {
// // 			console.log('Session callback called', {
// // 				hasSession: !!session,
// // 				hasToken: !!token,
// // 				hasUser: !!token.user,
// // 				tokenError: token.error || 'none',
// // 			});

// // 			// Ensure session has the correct structure
// // 			if (!session.user) {
// // 				session.user = {};
// // 			}

// // 			// Copy user data from token to session
// // 			if (token.user) {
// // 				session.user = { ...token.user };
// // 			}

// // 			// Add access token to session
// // 			session.accessToken = token.accessToken;

// // 			if (token.error) {
// // 				console.log(`Setting session error: ${token.error}`);
// // 				session.error = token.error;
// // 			}

// // 			console.log('Session after processing:', {
// // 				hasUser: !!session.user,
// // 				hasAccessToken: !!session.accessToken,
// // 			});

// // 			return session;
// // 		},
// // 	},
// // 	events: {
// // 		async signIn({ user }) {
// // 			console.log(`User ${user.email || user.id} signed in`);
// // 		},
// // 		async signOut() {
// // 			// You could implement server-side token revocation here if needed
// // 			console.log('User signed out');
// // 		},
// // 	},
// // 	debug: process.env.NODE_ENV === 'development',
// // };

// // export const { auth, signIn, signOut } = NextAuth(authOptions);

// import NextAuth, { type User } from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// import type { JWT } from 'next-auth/jwt';
// import { z } from 'zod';

// interface ApiTokenResponse {
// 	session_token: string;
// 	refresh_token: string;
// }

// async function authenticateUser(
// 	email: string,
// 	password: string,
// 	ipAddress?: string,
// 	latitude?: string,
// 	longitude?: string
// ): Promise<{ tokens: ApiTokenResponse; userData: any } | null> {
// 	try {
// 		console.log('authenticateUser called with:', {
// 			email,
// 			password: '******', // Don't log actual password
// 			ipAddress,
// 			latitude,
// 			longitude,
// 		});

// 		// Ensure the request body has the exact format and data types required
// 		const loginData = {
// 			Email: email, // String
// 			Password: password, // String
// 			Location: {
// 				Latitude: latitude ? parseFloat(latitude) : 6.9271, // Convert to number
// 				Longitude: longitude ? parseFloat(longitude) : 79.8612, // Convert to number
// 			},
// 			IpAddress: ipAddress || '192.168.1.1', // String
// 			AndroidId: '', // Empty string
// 		};

// 		console.log(
// 			'Request body to /api/proxy (stringified):',
// 			JSON.stringify(loginData)
// 		);
// 		console.log('Request body to /api/proxy (raw object):', loginData);
// 		console.log('Checking data types:', {
// 			EmailType: typeof loginData.Email,
// 			PasswordType: typeof loginData.Password,
// 			LatitudeType: typeof loginData.Location.Latitude,
// 			LongitudeType: typeof loginData.Location.Longitude,
// 			IpAddressType: typeof loginData.IpAddress,
// 		});

// 		const response = await fetch(`http://localhost:3000/api/proxy`, {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(loginData),
// 			cache: 'no-store',
// 		});

// 		console.log('Response status:', response.status);
// 		console.log('Response status text:', response.statusText);

// 		if (!response.ok) {
// 			const errorText = await response.text();
// 			console.error('Login failed - Response not OK:', {
// 				status: response.status,
// 				statusText: response.statusText,
// 				errorText,
// 			});
// 			return null;
// 		}

// 		let data;
// 		try {
// 			data = await response.json();
// 			console.log('Response data:', data);
// 		} catch (jsonError) {
// 			console.error('Error parsing JSON response:', jsonError);
// 			const textResponse = await response.text();
// 			console.log('Raw response text:', textResponse);
// 			return null;
// 		}

// 		// Check if the expected tokens exist in the response
// 		if (!data.session_token || !data.refresh_token) {
// 			console.error('Missing required tokens in response:', data);
// 			return null;
// 		}

// 		// Extract tokens from the response
// 		const tokens = {
// 			session_token: data.session_token,
// 			refresh_token: data.refresh_token,
// 		};

// 		console.log('Tokens extracted:', {
// 			session_token_exists: !!tokens.session_token,
// 			refresh_token_exists: !!tokens.refresh_token,
// 		});

// 		// Fetch user data with the obtained session token
// 		console.log('Fetching user data with session token');

// 		const userResponse = await fetch(`http://localhost:3000/api/proxy4`, {
// 			method: 'GET',
// 			headers: {
// 				Authorization: `Bearer ${tokens.session_token}`,
// 			},
// 			cache: 'no-store',
// 		});

// 		console.log('User profile response status:', userResponse.status);

// 		if (!userResponse.ok) {
// 			console.error('Failed to fetch user data:', {
// 				status: userResponse.status,
// 				statusText: userResponse.statusText,
// 			});
// 			return null;
// 		}

// 		const userData = await userResponse.json();
// 		console.log('User data retrieved:', {
// 			email: userData.Email,
// 			hasUserData: !!userData,
// 		});

// 		return { tokens, userData };
// 	} catch (error) {
// 		console.error('Error authenticating user:', error);
// 		console.error('Error details:', {
// 			name: (error as Error).name,
// 			message: (error as Error).message,
// 			stack: (error as Error).stack,
// 		});
// 		return null;
// 	}
// }

// export const { signIn, signOut, auth } = NextAuth({
// 	secret: process.env.AUTH_SECRET,
// 	pages: {
// 		signIn: '/', // Override default sign-in page
// 	},
// 	providers: [
// 		Credentials({
// 			credentials: {
// 				email: { label: 'Email' },
// 				password: { label: 'Password', type: 'password' },
// 				ipAddress: { label: 'IP Address' },
// 				latitude: { label: 'Latitude' },
// 				longitude: { label: 'Longitude' },
// 			},
// 			async authorize(credentials) {
// 				const parsedCredentials = z
// 					.object({
// 						email: z.string().email('Enter a valid email address'),
// 						password: z
// 							.string()
// 							.min(6, 'Password must be at least 6 characters'),
// 						ipAddress: z.string().optional(),
// 						latitude: z.string().optional(),
// 						longitude: z.string().optional(),
// 					})
// 					.safeParse(credentials);

// 				// Added check for parsed credentials validity
// 				if (!parsedCredentials.success) {
// 					console.error(
// 						'Credential validation failed:',
// 						parsedCredentials.error
// 					);
// 					return null;
// 				}

// 				const { email, password, ipAddress, latitude, longitude } =
// 					parsedCredentials.data;

// 				const result = await authenticateUser(
// 					email,
// 					password,
// 					ipAddress,
// 					latitude,
// 					longitude
// 				);

// 				if (!result || !result.tokens.session_token) {
// 					console.error('Authentication failed - no tokens returned');
// 					return null;
// 				}

// 				const userEmail = (
// 					result.userData.Email ||
// 					result.userData.email ||
// 					email ||
// 					''
// 				).toString();
// 				const userId = userEmail || `user-${Date.now()}`;

// 				// Return a user object with the essential fields
// 				return {
// 					id: userId,
// 					email: userEmail,
// 					name: result.userData.Name || result.userData.name || null,
// 					image:
// 						result.userData.Image || result.userData.image || null,
// 					...result.userData,
// 					// Store tokens in the user object temporarily
// 					// These will be transferred to the token in the JWT callback
// 					accessToken: result.tokens.session_token,
// 					refreshToken: result.tokens.refresh_token,
// 					accessTokenExpires: Date.now() + 60 * 60 * 1000, // 60 minutes
// 				};
// 			},
// 		}),
// 	],
// 	callbacks: {
// 		authorized: async ({ auth }) => {
// 			// Logged in users are authenticated, otherwise redirect to login page
// 			console.log('Authorized callback called with auth', auth);
// 			return !!auth;
// 		},
// 		async jwt({ token, user }) {
// 			console.log('JWT callback called with token:', token);
// 			if (user) {
// 				// First-time login, save the `access_token`, its expiry and the `refresh_token`.

// 				return {
// 					...token,
// 					accessToken: user.accessToken, // Fixed syntax error
// 					refreshToken: user.refreshToken, // Fixed syntax error
// 					accessTokenExpires: user.accessTokenExpires, // Fixed syntax error
// 				};
// 			} else if (
// 				token.accessTokenExpires &&
// 				Date.now() < token.accessTokenExpires
// 			) {
// 				// Fixed condition check
// 				// Subsequent logins, but the `access_token` is still valid
// 				return token;
// 			} else {
// 				// Subsequent logins, but the `access_token` has expired, try to refresh it
// 				if (!token.refreshToken)
// 					throw new TypeError('Missing refresh_token');

// 				try {
// 					// Added missing token refresh implementation
// 					const response = await fetch(
// 						`http://localhost:3000/api/refresh`,
// 						{
// 							method: 'POST',
// 							headers: { 'Content-Type': 'application/json' },
// 							body: JSON.stringify({
// 								refresh_token: token.refreshToken,
// 							}),
// 						}
// 					);

// 					const tokensOrError = await response.json();

// 					if (!response.ok) throw tokensOrError;

// 					const newTokens = tokensOrError as {
// 						access_token: string;
// 						expires_in: number;
// 						refresh_token?: string;
// 					};

// 					return {
// 						...token,
// 						accessToken: newTokens.access_token,
// 						accessTokenExpires:
// 							Date.now() + newTokens.expires_in * 1000,
// 						// Some providers only issue refresh tokens once, so preserve if we did not get a new one
// 						refreshToken: newTokens.refresh_token
// 							? newTokens.refresh_token
// 							: token.refreshToken,
// 						error: undefined, // Clear any previous errors
// 					};
// 				} catch (error) {
// 					console.error('Error refreshing access_token', error);
// 					// If we fail to refresh the token, return an error so we can handle it on the page
// 					return {
// 						...token,
// 						error: 'RefreshTokenError',
// 					};
// 				}
// 			}
// 		},
// 		async session({ session, token }) {
// 			// Add tokens to the session object so they're available to the client
// 			console.log('Session callback called with token:', token);
// 			session.accessToken = token.accessToken;
// 			session.error = token.error;
// 			return session;
// 		},
// 	},
// });

// declare module 'next-auth' {
// 	interface Session {
// 		accessToken?: string;
// 		error?: 'RefreshTokenError';
// 	}

// 	interface User {
// 		accessToken?: string;
// 		refreshToken?: string;
// 		accessTokenExpires?: number;
// 	}
// }

// declare module 'next-auth/jwt' {
// 	interface JWT {
// 		accessToken?: string;
// 		refreshToken?: string;
// 		accessTokenExpires?: number;
// 		error?: 'RefreshTokenError';
// 	}
// }
