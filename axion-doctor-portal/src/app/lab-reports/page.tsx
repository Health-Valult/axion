'use client';

import React, { useState } from 'react';
import ReportCard from '../elements/ReportCard';
import ReportModal from '../elements/ReportModal';
import ProtectedClientComponent from '../components/ProtectedClientComponent';

interface Report {
	id: number;
	name: string;
	date: string;
	fileUrl: string;
	thumbnail: string;
}

const reports: Report[] = [
	{
		id: 1,
		name: 'Complete Blood Count (CBC)',
		date: '2024-01-25',
		fileUrl: '/cbc.pdf',
		thumbnail: '/medical-report-icon.jpg',
	},
	{
		id: 2,
		name: 'Lipid Profile Report',
		date: '2024-01-28',
		fileUrl: '/lipid-profile.pdf',
		thumbnail: '/medical-report-icon.jpg',
	},
];

const ReportsPage: React.FC = () => {
	const [selectedReport, setSelectedReport] = useState<Report | null>(null);

	return (
		<ProtectedClientComponent>
			<div className="p-6 min-h-screen bg-white">
				<h1 className="text-2xl font-bold mb-4 text-purple-900">
					Medical Reports
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-black">
					{reports.map((report) => (
						<ReportCard
							key={report.id}
							report={report}
							onClick={() => setSelectedReport(report)}
						/>
					))}
				</div>

				{selectedReport && (
					<ReportModal
						report={selectedReport}
						onClose={() => setSelectedReport(null)}
					/>
				)}
			</div>
		</ProtectedClientComponent>
	);
};

export default ReportsPage;
