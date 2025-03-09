// ClientSideNavTracker.tsx (Client Component)
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideBar from './SideBar';
import Providers from '../store/Providers';

export function ClientSideNavTracker({
	children,
	initialShowSidebar,
}: {
	children: React.ReactNode;
	initialShowSidebar: boolean;
}) {
	const pathname = usePathname();
	const [showSidebar, setShowSidebar] = useState(initialShowSidebar);

	useEffect(() => {
		// Check if we're on the login page (client-side)
		const isLoginPage =
			pathname === '/login' || pathname?.includes('/login');

		const isSignUpPage =
			pathname === '/signup' || pathname?.includes('/signup');

		console.log('Current pathname:', pathname);
		console.log('Is login page (client check):', isLoginPage);

		// Update sidebar visibility based on current path
		setShowSidebar(!isLoginPage && !isSignUpPage);
	}, [pathname]); // This effect runs whenever the pathname changes

	return (
		<>
			{showSidebar ? (
				<Providers>
					<SideBar children={children} />
				</Providers>
			) : (
				<Providers>{children}</Providers>
			)}
		</>
	);
}
