'use client';

import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { useSession, SessionProvider } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { store } from './store';
import client from '@/lib/apolloClient';

// Public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/forgot-password'];

// Create an inner component that uses the useSession hook
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const pathname = usePathname();

	const isPublicRoute = publicRoutes.includes(pathname);

	useEffect(() => {
		// Check if there's a session error (like RefreshAccessTokenError)
		if (session?.error === 'RefreshAccessTokenError') {
			// Force sign in to resolve the refresh token issue
			router.push('/login?error=RefreshAccessTokenError');
		}
	}, [session, router]);

	useEffect(() => {
		// Adding a guard to prevent unnecessary redirects during initial loading
		if (status === 'loading') return;

		// Only perform redirects if the path has fully loaded
		if (!pathname) return;

		try {
			// Redirect to login if unauthenticated and trying to access protected route
			if (status === 'unauthenticated' && !isPublicRoute) {
				router.push('/login');
			}

			// Redirect to dashboard if authenticated and trying to access public route
			if (status === 'authenticated' && isPublicRoute) {
				router.push('/');
			}
		} catch (error) {
			console.error('Navigation error:', error);
		}
	}, [status, router, isPublicRoute, pathname]);

	// Return children directly when the component renders
	return children;
};

// Main Providers component that wraps everything
const Providers = ({ children }: { children: React.ReactNode }) => {
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
