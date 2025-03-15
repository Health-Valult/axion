'use client';

import { Mail, KeyRound, ArrowRight, CircleAlert, Check } from 'lucide-react';
import { Button } from './button';
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { getUserLocation, getUserIP } from '@/app/utils/geolocation-utils';

export default function LoginForm() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const callbackUrl = searchParams.get('callbackUrl') || '/';
	const [actionState, formAction, isPending] = useActionState(
		authenticate,
		undefined
	);

	useEffect(() => {
		// Debug the state
		console.log('Current action state:', actionState);

		if (actionState === 'success') {
			console.log('Success detected, redirecting to:', '/');
			router.replace('/');
		}
	}, [actionState, router]);

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

	// Custom action to include location and IP data
	async function handleSubmit(formData: FormData) {
		// Add location and IP to form data
		formData.append('latitude', userLocation.Latitude.toString());
		formData.append('longitude', userLocation.Longitude.toString());
		formData.append('ipAddress', userIP);

		// Call the original form action
		return formAction(formData);
	}

	return (
		<form action={handleSubmit} className="space-y-3">
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

				<Button className="mt-4 w-full" aria-disabled={isPending}>
					Log in{' '}
					<ArrowRight className="ml-auto h-5 w-5 text-gray-50 dark:text-gray-950" />
				</Button>
				<div
					className="flex h-8 items-end space-x-1"
					aria-live="polite"
					aria-atomic="true"
				>
					{(actionState || authError) && (
						<>
							{actionState === 'success' ? (
								<>
									<Check className="h-5 w-5 text-green-500" />
									<p className="text-sm text-green-500">
										Login successful!
									</p>
								</>
							) : (
								<>
									<CircleAlert className="h-5 w-5 text-red-500" />
									<p className="text-sm text-red-500">
										{actionState || authError}
									</p>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</form>
	);
}
