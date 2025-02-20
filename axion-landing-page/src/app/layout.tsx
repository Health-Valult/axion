import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'glightbox/dist/css/glightbox.css';
import { TopBar } from './components/TopBar';
import Footer from './components/Footer';

const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-montserrat',
	weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'Axion',
	description:
		'Axion is your trusted digital health companion, providing seamless access to medical records, prescriptions, and healthcare insights for a healthier future.',
	keywords: [
		'digital health',
		'medical records',
		'healthcare app',
		'patient dashboard',
		'prescription management',
	],
	openGraph: {
		title: 'Axion',
		description:
			'Seamlessly manage your medical records, prescriptions, and health insights with Axion. Your digital health companion for a smarter future.',
		url: 'https://axionhealth.info',
		siteName: 'Axion',
		type: 'website',
	},
	robots: 'index, follow',
	alternates: {
		canonical: 'https://axionhealth.info',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${montserrat.variable} antialiased`}>
				<TopBar />
				{children}
				<Footer />
				<script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
					crossOrigin="anonymous"
				></script>
			</body>
		</html>
	);
}
