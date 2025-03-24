// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth({ required = false, redirectTo = '/login' } = {}) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		async function checkAuth() {
			try {
				const res = await fetch('/api/auth/user');

				if (res.ok) {
					const userData = await res.json();
					setUser(userData);
				} else {
					setUser(null);
					if (required) {
						router.push(
							`${redirectTo}?callbackUrl=${encodeURIComponent(
								window.location.pathname
							)}`
						);
					}
				}
			} catch (error) {
				console.error('Auth check error:', error);
				setUser(null);
				if (required) {
					router.push(
						`${redirectTo}?callbackUrl=${encodeURIComponent(
							window.location.pathname
						)}`
					);
				}
			} finally {
				setLoading(false);
			}
		}

		checkAuth();
	}, [required, redirectTo, router]);

	return { user, loading, isAuthenticated: !!user };
}
