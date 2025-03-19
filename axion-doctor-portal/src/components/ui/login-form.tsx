'use client';

import { Mail, KeyRound, ArrowRight, CircleAlert, Check } from 'lucide-react';
import { Button } from './button';
import { useActionState } from 'react';
// import { authenticate } from '@/lib/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { getUserLocation, getUserIP } from '@/app/utils/geolocation-utils';

export default function LoginForm() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const callbackUrl = searchParams.get('callbackUrl') || '/';
	// const [actionState, formAction, isPending] = useActionState(
	// 	authenticate,
	// 	undefined
	// );

	// useEffect(() => {
	// 	// Debug the state
	// 	console.log('Current action state:', actionState);

	// 	if (actionState === 'success') {
	// 		console.log('Success detected, redirecting to:', '/');
	// 		router.replace('/');
	// 	}
	// }, [actionState, router]);

	const [authError, setAuthError] = useState('');
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

			// Redirect to callback URL
			router.replace(callbackUrl);
		} catch (error) {
			console.error('Login error:', error);
			setAuthError('An error occurred during login');
		}
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				handleSubmit(formData);
			}}
			className="space-y-3"
		>
			<div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
				<h1 className="mb-3 text-2xl">Please log in to continue.</h1>
				<div className="w-full">
					<div>
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-gray-200"
							htmlFor="email"
						>
							Email Address
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-gray-200"
							htmlFor="password"
						>
							Password
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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
				<input type="hidden" name="redirectTo" value={callbackUrl} />

				<Button className="mt-4 w-full" type="submit">
					Log in{' '}
					<ArrowRight className="ml-auto h-5 w-5 text-gray-50 dark:text-gray-950" />
				</Button>
				<div
					className="flex h-8 items-end space-x-1"
					aria-live="polite"
					aria-atomic="true"
				></div>
			</div>
		</form>
	);
}
