'use client';

import { Mail, KeyRound, ArrowRight } from 'lucide-react';
import { Button } from './button';
// import { authenticate } from '@/lib/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { loginDoctor } from '@/app/store/userSlice';
import { useDispatch } from 'react-redux';
import { mapApiResponseToUserModel } from '@/app/utils/useMapper';

export default function LoginForm() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const callbackUrl = searchParams.get('callbackUrl') || '/';

	const [authError, setAuthError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const [userLocation, setUserLocation] = useState({
		Latitude: 0,
		Longitude: 0,
	});
	const [userIP, setUserIP] = useState('');

	useEffect(() => {
		// Check for authentication errors
		const error = searchParams.get('error');
		if (error === 'RefreshAccessTokenError') {
			setAuthError('Your session has expired. Please sign in again.');
		}

		// Get user location and IP
		function fetchLocationData() {
			const location = {
				Latitude: 6.9271,
				Longitude: 79.8612,
			};
			const ip = '192.168.1.1';

			setUserLocation(location);
			setUserIP(ip);
		}

		fetchLocationData();
	}, [searchParams]);

	function storeTokensInCookies(sessionToken: string, refreshToken: string) {
		return fetch('/api/auth/set-cookies', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				session_token: sessionToken,
				refresh_token: refreshToken,
			}),
		}).catch((error) => {
			console.error('Error storing tokens:', error);
			throw error;
		});
	}

	// Modified to use promise chains instead of async/await
	function handleSubmit(formData: FormData) {
		// Extract values from form
		const email = formData.get('email');
		const password = formData.get('password');

		// Create login data object
		const loginData = {
			Email: email,
			Password: password,
			Location: {
				Latitude: userLocation.Latitude,
				Longitude: userLocation.Longitude,
			},
			IpAddress: userIP,
			AndroidId: '',
		};

		// Submit login request using promise chains
		fetch(
			`https://axiontestgateway.azure-api.net/axion/auth/login/doctor`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(loginData),
				cache: 'no-store',
			}
		)
			.then((response) => {
				if (!response.ok) {
					return response.json().then((errorData) => {
						throw new Error(errorData.message || 'Login failed');
					});
				}
				return response.json();
			})
			.then((tokens) => {
				console.log(tokens);

				// Store tokens in cookies and then fetch user data
				return storeTokensInCookies(
					tokens.session_token,
					tokens.refresh_token
				).then(() => tokens);
			})
			.then((tokens) => {
				// Fetch user data
				return fetch(
					`https://axiontestgateway.azure-api.net/axion/user/profile`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${tokens.session_token}`,
						},
						cache: 'no-store',
					}
				)
					.then((userDataResponse) => {
						if (!userDataResponse.ok) {
							console.error(
								'Failed to fetch user data',
								userDataResponse.statusText
							);
							return null;
						}
						return userDataResponse.json();
					})
					.then((userData) => {
						if (userData) {
							const mappedUserData =
								mapApiResponseToUserModel(userData);
							console.log('Mapped user data:', mappedUserData);

							// Update Redux store with properly mapped user data
							dispatch(loginDoctor({ state: mappedUserData }));
						}

						// Redirect to callback URL
						router.replace(callbackUrl);
					});
			})
			.catch((error) => {
				console.error('Login error:', error);
				setAuthError(error.message || 'An error occurred during login');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	return (
		<Card>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					setIsLoading(true);
					handleSubmit(formData);
				}}
				className="space-y-3"
			>
				<div className="flex-1 rounded-lg bg-gray-50 dark:bg-black px-6 pb-4 pt-8">
					<h1 className="mb-3 text-2xl">
						Please log in to continue.
					</h1>
					{authError && (
						<div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
							<p>{authError}</p>
						</div>
					)}
					<div className="w-full">
						<div>
							<Label
								className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-gray-200"
								htmlFor="email"
							>
								Email Address
							</Label>
							<div className="relative">
								<Input
									className="peer block w-full rounded-md border  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
									id="email"
									type="email"
									name="email"
									placeholder="Enter your email address"
									required
									disabled={isLoading}
								/>
								<Mail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-100 peer-focus:text-gray-900 dark:peer-focus:text-gray-200" />
							</div>
						</div>
						<div className="mt-4">
							<Label
								className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-gray-200"
								htmlFor="password"
							>
								Password
							</Label>
							<div className="relative">
								<Input
									className="peer block w-full rounded-md border  py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
									id="password"
									type="password"
									name="password"
									placeholder="Enter password"
									required
									minLength={6}
									disabled={isLoading}
								/>
								<KeyRound className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 dark:text-gray-100 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-gray-200" />
							</div>
						</div>
					</div>
					<Input
						type="hidden"
						name="redirectTo"
						value={callbackUrl}
					/>

					<Button
						className="my-4 w-full"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? 'Logging in...' : 'Log in'}
						{!isLoading && (
							<ArrowRight className="ml-auto h-5 w-5 text-gray-50 dark:text-gray-950" />
						)}
					</Button>

					<CardFooter>
						Not registered yet?{'  '}
						<Link href="/signup" className="text-blue-500 ml-1">
							Create an account
						</Link>
					</CardFooter>
				</div>
			</form>
		</Card>
	);
}
