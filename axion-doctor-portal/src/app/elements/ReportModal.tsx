import React, { useEffect, useRef } from 'react';

interface ReportModalProps {
	report: {
		id: number;
		name: string;
		date: string;
		fileUrl: string;
	};
	onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ report, onClose }) => {
	const pdfUrl = useRef<string | null>(null);

	useEffect(() => {
		pdfUrl.current = report.fileUrl;
	}, [report.fileUrl]);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if ((event.target as HTMLElement).id === 'modal-overlay') {
				onClose();
			}
		};
		window.addEventListener('click', handleOutsideClick);
		return () => window.removeEventListener('click', handleOutsideClick);
	}, [onClose]);

	return (
		<div
			id="modal-overlay"
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
		>
			<div className="bg-white p-6 rounded-lg shadow-lg w-[80%] h-[80%] relative transition-transform transform scale-95 flex flex-col">
				<button
					className="absolute top-4 right-4 text-black rounded-full p-2 hover:bg-gray-300"
					onClick={onClose}
				>
					✖
				</button>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold text-purple-900">
						{report.name}
					</h2>
				</div>
				<div className="mb-4">
					<h3 className="text-sm text-gray-600">
						{new Date(report.date).toLocaleDateString()}
					</h3>
				</div>
				<div className="flex-grow">
					<iframe
						src={report.fileUrl}
						className="w-full h-full border rounded-lg"
						title="PDF Report"
					/>
				</div>
			</div>
		</div>
	);
};

export default ReportModal;
