import { Card } from '@/components/ui/card';
import { AxionLogo } from '../components/SideBar';
import LoginForm from '@/components/ui/login-form';
import ThemeSwitcher from '@/components/ui/theme-switch';
import { Suspense } from 'react';

export default function LoginPage() {
	return (
		<main className="flex items-center justify-center md:h-screen">
			<ThemeSwitcher />
			<div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
				<Card className="flex h-20 w-full items-end rounded-lg bg-slate-50 dark:bg-black p-3 md:h-36">
					<div className="w-32 flex flex-1 gap-5 items-center text-black dark:text-white md:w-36">
						<AxionLogo width={32} height={32} />{' '}
						<span className="text-2xl font-bold">AXION</span>
					</div>
				</Card>
				<Suspense>
					<LoginForm />
				</Suspense>
			</div>
		</main>
	);
}
