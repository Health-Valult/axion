'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { useQuery } from '@apollo/client';
import ReportCard from '../components/ReportCard';
import ReportModal from '../components/ReportModel';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import ProtectedClientComponent from '../components/ProtectedClientComponent';
import { GET_LABS, GET_OBSERVATIONS } from '../graphql/queries';

// Define types for GraphQL response
interface Report {
	id: string;
	display: string;
	timestamp: string;
	meta: string;
}

interface Observation {
	id: string;
	patientID: string;
	labID: string;
	code: string;
	display: string;
	unit: string;
	value: string;
	timestamp: string;
	meta: string;
}

export default function ReportsLayout() {
	return (
		<ProtectedClientComponent>
			<ReportPage />
		</ProtectedClientComponent>
	);
}

type Theme = 'light' | 'dark';

const ReportPage: React.FC = () => {
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

	const [selectedReport, setSelectedReport] = useState<Report | null>(null); // Selected report
	const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
	const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
	const [selectedYear, setSelectedYear] = useState<number>(
		new Date().getFullYear()
	);
	const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
	const yearOptions = Array.from(
		{ length: 20 },
		(_, i) => new Date().getFullYear() - i
	);

	// Fetch the available reports using useQuery
	const { loading, error, data } = useQuery(GET_LABS);

	// Fetch observations for the selected report using the LabID with useQuery
	const { data: observationsData } = useQuery(GET_OBSERVATIONS, {
		variables: { LabID: selectedReport?.id || '' },
		skip: !selectedReport, // Skip this query if no report is selected
	});

	// Extract reports from query data
	const reports: Report[] = data?.Labs?.labs || [];

	// Extract observations from query data
	const observations: Observation[] =
		observationsData?.observationStack?.Observations || [];

	const generatePDF = () => {
		const doc = new jsPDF();

		// Set font for the report title
		doc.setFont('helvetica', 'bold');
		doc.setFontSize(16);
		doc.text(`${selectedReport?.display}`, 20, 20);

		// Set font for the rest of the content
		doc.setFont('helvetica', 'normal');
		doc.setFontSize(12);

		// Prepare table data
		const tableData = observations.map((obs) => [
			obs.display,
			obs.value,
			obs.unit,
		]);

		const header = [
			['Observation Name', 'Result', 'Unit'], // This is your table header
		];

		// Create the table
		autoTable(doc, {
			startY: 40, // Start below the title
			head: header,
			body: tableData,
			theme: 'grid',
			headStyles: {
				fillColor: [22, 160, 133], // Set a custom header background color
				textColor: [255, 255, 255], // Set the header text color
				fontSize: 12,
				font: 'helvetica',
				halign: 'center', // Center align header text
			},
			bodyStyles: {
				fontSize: 10,
				font: 'helvetica',
				halign: 'left', // Align body text to the left
			},
			margin: { top: 20, bottom: 20 }, // Add margin to the table
		});

		// Save the PDF with the selected report name
		doc.save(`${selectedReport?.display}.pdf`);
	};

	// Sorting and date filtering handling
	const handleSortChange = () => {
		setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
	};

	// Sort reports based on the selected sort order
	const sortedReports = [...reports].sort((a, b) => {
		return sortOrder === 'newest'
			? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
			: new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
	});

	// Filter reports based on the selected date
	const filteredReports = filterDate
		? sortedReports.filter((report) => {
				const reportDate = new Date(report.timestamp);
				return (
					reportDate.toISOString().split('T')[0] ===
					format(filterDate, 'yyyy-MM-dd')
				);
		  })
		: sortedReports;

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error Fetching Data</p>;
	}

	return (
		<div className="p-6 min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
			<div className="flex-1 text-center">
				<Image
					src={
						darkMode
							? '/images/logo-with-text.png'
							: '/images/logo-with-text-black.png'
					}
					alt="Logo"
					width={160}
					height={160}
					className="mx-auto mb-4"
				/>
			</div>
			<h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-gray-400">
				Medical Reports
			</h1>

			<div className="flex justify-between items-center mb-4">
				<div />
				<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 sm:mb-2 dark:bg-gray-950">
					<Button variant="outline" onClick={handleSortChange}>
						<ArrowUpDown className="mr-2" />
						{sortOrder === 'newest' ? `newestFirst` : `oldestFirst`}
					</Button>

					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className="w-[200px] justify-start text-left font-normal dark:text-white"
							>
								<CalendarIcon className="mr-2 h-4 w-4 dark:text-white" />
								{filterDate
									? format(filterDate, 'PPP')
									: `Pick Date`}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-950 border-b">
								<span className="font-semibold">Year:</span>
								<Select
									onValueChange={(value) => {
										const newYear = parseInt(value, 10);
										setSelectedYear(newYear);
										setCurrentMonth(
											new Date(
												newYear,
												currentMonth.getMonth(),
												1
											)
										);
									}}
									value={selectedYear.toString()}
								>
									<SelectTrigger className="w-[100px]">
										<SelectValue placeholder="Year" />
									</SelectTrigger>
									<SelectContent>
										{yearOptions.map((year) => (
											<SelectItem
												key={year}
												value={year.toString()}
											>
												{year}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<DayPicker
								selected={filterDate}
								onDayClick={setFilterDate}
								month={currentMonth}
								onMonthChange={setCurrentMonth}
							/>
						</PopoverContent>
					</Popover>

					{filterDate && (
						<Button
							variant="destructive"
							onClick={() => setFilterDate(undefined)}
						>
							Remove Date
						</Button>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
				{filteredReports.length > 0 ? (
					filteredReports.map((report) => (
						<ReportCard
							key={report.id}
							report={report}
							onClick={() => {
								setSelectedReport(report);
								// No need to call fetchObservations - the useQuery hook handles this
							}}
						/>
					))
				) : (
					<p>No Reports Found</p>
				)}
			</div>

			{selectedReport && (
				<ReportModal
					report={selectedReport}
					observations={observations}
					onClose={() => setSelectedReport(null)} // Close modal when the report is deselected
					generatePDF={generatePDF}
				/>
			)}
		</div>
	);
};
