import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { headers } from 'next/headers';
import { ClientSideNavTracker } from './components/ClientSideNavTracker';

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Axion',
	description: 'Reinnovating healthcare.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headersList = await headers();
	const pathFromHeader = headersList.get('x-pathname');

	const requestUrl =
		headersList.get('x-url') ||
		headersList.get('referer') ||
		headersList.get('host') ||
		'';

	// Determine if we're on the login page using multiple methods
	const isLoginPage =
		// Primary method: check exact match with our custom header
		pathFromHeader === '/login' ||
		// Fallback: check if path contains login
		pathFromHeader?.includes('/login') ||
		// Additional fallback: check URL for login path
		requestUrl.includes('/login');

	const isSignUpPage =
		// Primary method: check exact match with our custom header
		pathFromHeader === '/signup' ||
		// Fallback: check if path contains login
		pathFromHeader?.includes('/signup') ||
		// Additional fallback: check URL for login path
		requestUrl.includes('/signup');

	// Define a stable display state to avoid flickering
	const initialShowSidebar = !isLoginPage || !isSignUpPage;

	return (
		<html lang="en">
			<body className={`${montserrat.variable} antialiased`}>
				<ClientSideNavTracker initialShowSidebar={initialShowSidebar}>
					{children}
				</ClientSideNavTracker>
				<Toaster />
			</body>
		</html>
	);
}
