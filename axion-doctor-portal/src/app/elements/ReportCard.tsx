import React from 'react';

import Image from 'next/image';

interface Report {
	report: {
		id: number;
		name: string;
		date: string;
		fileUrl: string;
		thumbnail: string;
	};
	onClick: (fileUrl: string) => void;
}

const ReportCard: React.FC<Report> = ({ report, onClick }) => {
	return (
		<div
			onClick={() => onClick(report.fileUrl)}
			className="cursor-pointer border-2 border-black bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center space-y-3"
		>
			<Image
				src={report.thumbnail}
				alt={report.name}
				width={96}
				height={96}
				className="object-cover rounded-lg"
			/>
			<h2 className="text-lg font-semibold text-center text-purple-900">
				{report.name}
			</h2>
			<p className="text-purple-900 text-sm">
				{new Date(report.date).toLocaleDateString()}
			</p>
		</div>
	);
};

export default ReportCard;
