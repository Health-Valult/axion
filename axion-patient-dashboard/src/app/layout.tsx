import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import SideBar from './components/SideBar';
import Providers from './store/Providers';

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Axion',
	description: 'Reinnovating healthcare.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${montserrat.variable} antialiased`}>
				<Providers>
					<SideBar children={children} />
				</Providers>
			</body>
		</html>
	);
}
