'use client';

import { Accordion, AccordionItem } from '@heroui/react';
import DiagnosisTimeline from '../elements/DiagnosisTimeline';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Diagnosis: React.FC = () => {
	const patient = useSelector((state: RootState) => state.patient.state);

	// Ensure patient is not null and has diagnoses
	if (!patient || !patient.diagnosedAilments) return null;

	return (
		<div className="flex flex-1 bg-white rounded-l-sm h-full overflow-y-auto">
			<WordPullUp
				className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
				words="Diagnosed Chronic Conditions"
			/>
			<Accordion variant="shadow">
				{patient.diagnosedAilments.map((illness) => (
					<AccordionItem
						key={illness.disease}
						aria-label={`${illness.disease}`}
						title={`${illness.disease}`}
					>
						<span>{illness.currentMedication}</span>
						<DiagnosisTimeline illness={illness} />
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

export default Diagnosis;
