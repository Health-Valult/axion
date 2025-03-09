'use client';

import { IdCard, KeyRound, ArrowRight, CircleAlert } from 'lucide-react';
import { Button } from './button';
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginForm() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined
	);

	const [authError, setAuthError] = useState('');

	useEffect(() => {
		// Check for authentication errors
		const error = searchParams.get('error');
		if (error === 'RefreshAccessTokenError') {
			setAuthError('Your session has expired. Please sign in again.');
		}
	}, [searchParams]);

	return (
		<form action={formAction} className="space-y-3">
			<div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
				<h1 className="mb-3 text-2xl">Please log in to continue.</h1>
				<div className="w-full">
					<div>
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="nic"
						>
							NIC
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="nic"
								type="string"
								name="nic"
								placeholder="Enter your NIC"
								required
							/>
							<IdCard className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-100 peer-focus:text-gray-900 dark:peer-focus:text-gray-200" />
						</div>
					</div>
					<div className="mt-4">
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
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
					{(errorMessage || authError) && (
						<>
							<CircleAlert className="h-5 w-5 text-red-500" />
							<p className="text-sm text-red-500">
								{errorMessage || authError}
							</p>
						</>
					)}
				</div>
			</div>
		</form>
	);
}
