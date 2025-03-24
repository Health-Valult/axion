// hooks/useUser.ts
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useUser() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		async function fetchUserData() {
			try {
				const response = await fetch('/api/auth/user');

				if (!response.ok) {
					if (response.status === 401) {
						router.push('/login');
					}
					return;
				}

				const userData = await response.json();
				setUser(userData);
			} catch (error) {
				console.error('Error fetching user data:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchUserData();
	}, [router]);

	return { user, loading };
}
