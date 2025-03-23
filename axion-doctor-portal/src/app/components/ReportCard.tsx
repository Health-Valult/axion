'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface Report {
	id: string;
	display: string;
	timestamp: string;
}

interface ReportCardProps {
	report: Report;
	onClick: () => void;
}

type Theme = 'light' | 'dark';

const ReportCard: React.FC<ReportCardProps> = ({ report, onClick }) => {
	const [darkMode, setDarkMode] = useState<Theme>(
		JSON.parse(localStorage.getItem('theme') || '"light"') as Theme
	);

	// Initialize the theme from localStorage when component mounts
	useEffect(() => {
		// Get theme from localStorage or default to 'light'
		const savedTheme = localStorage.getItem('theme');
		const initialTheme = savedTheme
			? (JSON.parse(savedTheme) as Theme)
			: 'light';
		setDarkMode(initialTheme);
	}, []);
	return (
		<Card
			className="w-full bg-white overflow-x-hidden dark:bg-gray-950 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer mb-4"
			onClick={onClick}
		>
			<CardHeader className="p-4 items-center">
				<Image
					src={
						darkMode
							? '/images/medical-report-icon-black.jpg'
							: '/images/medical-report-icon.jpg'
					}
					alt={report.display}
					width={96}
					height={96}
					className="object-cover rounded-lg"
				/>
				<CardTitle className="text-lg font-semibold text-center text-black dark:text-orange-300 mt-2">
					{report.display}
				</CardTitle>
				<CardDescription className="text-black dark:text-white text-sm text-center">
					{new Date(report.timestamp).toLocaleDateString()}
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default ReportCard;
