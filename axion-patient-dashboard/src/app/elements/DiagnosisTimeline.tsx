import React from 'react';
import { DiagnosedAilment } from '../models/types/Patient';
// import { DiagnosisRecord } from "../types/types";

interface DiagnosisTimelineProps {
	illness: DiagnosedAilment;
}

const DiagnosisTimeline: React.FC<DiagnosisTimelineProps> = ({ illness }) => {
	return (
		<div className="p-4 bg-gray-100 border border-gray-300 rounded-md">
			<ol className="items-center sm:flex">
				{illness.progression.map((date) => (
					<li key={date.update} className="relative mb-6 sm:mb-0">
						<div className="flex items-center">
							<div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white  sm:ring-8 shrink-0">
								<svg
									className="w-2.5 h-2.5 text-blue-800 "
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
								</svg>
							</div>
							<div className="hidden sm:flex w-full bg-gray-200 h-0.5 "></div>
						</div>
						<div className="mt-3 sm:pe-8">
							<h3 className="text-lg font-semibold text-gray-900 ">
								{date.update}
							</h3>
							<time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
								{date.date}
							</time>
							<p className="text-base font-normal text-gray-500 ">
								{date.doctor.name}
							</p>
						</div>
					</li>
				))}
			</ol>
		</div>
	);
};

export default DiagnosisTimeline;
