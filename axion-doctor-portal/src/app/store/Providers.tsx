'use client';
import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { useSession, SessionProvider } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { store } from './store';
import client from '@/lib/apolloClient';

// Public routes that don't require authentication
const publicRoutes = ['/login', '/signup'];

// Create an inner component that uses the useSession hook
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const pathname = usePathname();
	const isPublicRoute = publicRoutes.includes(pathname);
	const [loadingTimedOut, setLoadingTimedOut] = useState(false);
	// Track if we've already performed a redirect to prevent loops
	const [hasRedirected, setHasRedirected] = useState(false);

	console.log('AuthWrapper rendering with:', {
		status,
		pathname,
		isPublicRoute,
		sessionExists: !!session,
		hasAccessToken: !!session?.accessToken,
		loadingTimedOut,
		hasRedirected,
	});

	// Effect to handle loading timeout
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		if (status === 'loading') {
			console.log('Setting loading timeout');
			// If still loading after 3 seconds, consider it timed out
			timeoutId = setTimeout(() => {
				console.log('Loading state timed out');
				setLoadingTimedOut(true);
			}, 3000);
		} else {
			setLoadingTimedOut(false);
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [status]);

	// Effect to handle session errors
	useEffect(() => {
		if (session?.error === 'RefreshAccessTokenError' && !hasRedirected) {
			console.log(
				'RefreshAccessTokenError detected, redirecting to login'
			);
			setHasRedirected(true);
			router.push('/login?error=RefreshAccessTokenError');
		}
	}, [session, router, hasRedirected]);

	// Effect for authentication checks and redirects
	useEffect(() => {
		// Skip if pathname is not available or we've already redirected
		if (!pathname || hasRedirected) {
			console.log(
				'Pathname not available or already redirected, skipping auth check'
			);
			return;
		}

		// We'll proceed if either:
		// 1. We have a definitive status (not loading)
		// 2. OR loading has timed out
		const shouldProceed = status !== 'loading' || loadingTimedOut;

		if (!shouldProceed) {
			console.log('Waiting for session to resolve or timeout');
			return;
		}

		console.log('Performing auth check with:', {
			status,
			pathname,
			isPublicRoute,
			hasSession: !!session,
			hasAccessToken: !!session?.accessToken,
			loadingTimedOut,
		});

		// For API routes, we skip redirection as they'll handle their own auth
		if (pathname.startsWith('/api/')) {
			console.log('Skipping redirection for API route');
			return;
		}

		const isAuthenticated =
			status === 'authenticated' && !!session?.accessToken;

		// For unauthenticated users trying to access protected routes
		if (!isAuthenticated && !isPublicRoute) {
			console.log(
				'No valid session detected for protected route, redirecting to login'
			);
			setHasRedirected(true);
			router.push('/login');
			return;
		}

		// For authenticated users trying to access public routes
		if (isAuthenticated && isPublicRoute) {
			console.log(
				'Authenticated user accessing public route, redirecting to dashboard'
			);
			setHasRedirected(true);
			router.push('/');
			return;
		}

		console.log('No redirection needed');
	}, [
		status,
		pathname,
		isPublicRoute,
		session,
		router,
		loadingTimedOut,
		hasRedirected,
	]);

	// Reset redirection state when pathname changes
	useEffect(() => {
		setHasRedirected(false);
	}, [pathname]);

	return children;
};

// Main Providers component that wraps everything
const Providers = ({ children }: { children: React.ReactNode }) => {
	console.log('Providers component rendering');
	return (
		<SessionProvider>
			<ApolloProvider client={client}>
				<Provider store={store}>
					<AuthWrapper>{children}</AuthWrapper>
				</Provider>
			</ApolloProvider>
		</SessionProvider>
	);
};

export default Providers;
