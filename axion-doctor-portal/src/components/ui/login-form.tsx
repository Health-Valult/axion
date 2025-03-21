'use client';

import { Mail, KeyRound, ArrowRight, CircleAlert, Check } from 'lucide-react';
import { Button } from './button';
import { useActionState } from 'react';
// import { authenticate } from '@/lib/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { loginDoctor } from '@/app/store/userSlice';
import { useDispatch } from 'react-redux';
import { determineGenderFromNIC } from '@/app/utils/nicutils';
// import { getUserLocation, getUserIP } from '@/app/utils/geolocation-utils';

export default function LoginForm() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const callbackUrl = searchParams.get('callbackUrl') || '/';

	const [authError, setAuthError] = useState('');
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

	async function storeTokensInCookies(
		sessionToken: string,
		refreshToken: string
	) {
		try {
			// Store the tokens in cookies via an API route
			await fetch('/api/auth/set-cookies', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					session_token: sessionToken,
					refresh_token: refreshToken,
				}),
			});
		} catch (error) {
			console.error('Error storing tokens:', error);
			throw error;
		}
	}

	// Custom action to include location and IP data
	async function handleSubmit(formData: FormData) {
		try {
			// Extract values from form
			const email = formData.get('email') as string;
			const password = formData.get('password') as string;

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

			// Submit login request
			const response = await fetch(`http://localhost:3000/api/proxy`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(loginData),
				cache: 'no-store',
			});

			if (!response.ok) {
				const errorData = await response.json();
				setAuthError(errorData.message || 'Login failed');
				return;
			}

			const tokens = await response.json();

			// Store tokens in cookies
			await storeTokensInCookies(
				tokens.session_token,
				tokens.refresh_token
			);

			const userDataResponse = await fetch(
				`http://localhost:3000/api/user`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${tokens.session_token}`,
					},
					body: JSON.stringify({
						Token: tokens.refresh_token,
					}),
					cache: 'no-store',
				}
			);

			if (!userDataResponse.ok) {
				console.error('Failed to fetch user data');
				// Continue with login process even if user data fetch fails
			} else {
				// Parse user data and update Redux store
				const userData = await userDataResponse.json();

				if (userData.nic) {
					userData.gender = determineGenderFromNIC(userData.nic);
					console.log(
						`Determined gender from NIC: ${userData.gender}`
					);
				}

				// Dispatch action to update Redux store with user data
				dispatch(loginDoctor({ state: userData }));
			}

			// Redirect to callback URL
			router.replace(callbackUrl);
		} catch (error) {
			console.error('Login error:', error);
			setAuthError('An error occurred during login');
		}
	}

	return (
		<Card>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					handleSubmit(formData);
				}}
				className="space-y-3"
			>
				<div className="flex-1 rounded-lg bg-gray-50 dark:bg-black px-6 pb-4 pt-8">
					<h1 className="mb-3 text-2xl">
						Please log in to continue.
					</h1>
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

					<Button className="my-4 w-full" type="submit">
						Log in{' '}
						<ArrowRight className="ml-auto h-5 w-5 text-gray-50 dark:text-gray-950" />
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
