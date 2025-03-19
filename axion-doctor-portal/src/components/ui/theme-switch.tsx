'use client';

import { Label } from '@/components/ui/label';
import { Switch } from './switch';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useId, useState, useEffect } from 'react';

export default function ThemeSwitcher() {
	const id = useId();
	type Theme = 'light' | 'dark';
	const [theme, setTheme] = useState<Theme>('light');

	// Initialize the theme from localStorage when component mounts
	useEffect(() => {
		// Get theme from localStorage or default to 'light'
		const savedTheme = localStorage.getItem('theme');
		const initialTheme = savedTheme
			? (JSON.parse(savedTheme) as Theme)
			: 'light';
		setTheme(initialTheme);
	}, []);

	// Update localStorage and HTML class when theme changes
	useEffect(() => {
		localStorage.setItem('theme', JSON.stringify(theme));
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

	// Toggle between light and dark themes
	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<div className="fixed top-4 right-4 z-50">
			<div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
				<Switch
					id={id}
					checked={theme === 'dark'}
					onCheckedChange={toggleTheme}
					className="peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
				/>
				<span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
					<MoonIcon size={16} aria-hidden="true" />
				</span>
				<span className="peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
					<SunIcon size={16} aria-hidden="true" />
				</span>
			</div>
			<Label htmlFor={id} className="sr-only">
				Toggle dark mode
			</Label>
		</div>
	);
}
