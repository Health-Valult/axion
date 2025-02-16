'use client';

import React, { useState, useEffect } from 'react';
import { Form, Button } from '@heroui/react';
import { DatePicker } from '@heroui/react';
import { DateRangePicker } from '@heroui/react';
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from '@heroui/react';
import { Chip, Avatar } from '@heroui/react';
import { Textarea } from '@heroui/react';
import { RadioGroup, Radio, cn } from '@heroui/react';
import { Autocomplete, AutocompleteItem } from '@heroui/react';

import { now, getLocalTimeZone } from '@internationalized/date';

const Prescriptions: React.FC = () => {
	const [defaultDate, setDefaultDate] = useState<any>(null);

	const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
		new Set(['Indication'])
	);

	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const dosageInstructions = [
		{ key: 'OD', label: 'Once daily', sig: 'Take once per day' },
		{
			key: 'BID',
			label: 'Twice daily',
			sig: 'Take every 12 hours (twice a day)',
		},
		{
			key: 'TID',
			label: 'Thrice daily',
			sig: 'Take every 8 hours (three times a day)',
		},
		{
			key: 'QID',
			label: 'Four times daily',
			sig: 'Take every 6 hours (four times a day)',
		},
		{ key: 'OW', label: 'Once a week', sig: 'Take once per week' },
		{ key: 'PRN', label: 'As needed', sig: 'Take only when necessary' },
		{ key: 'AC', label: 'Before meals', sig: 'Take before eating' },
		{ key: 'PC', label: 'After meals', sig: 'Take after eating' },
		{ key: 'HS', label: 'At bedtime', sig: 'Take before sleeping' },
		{ key: 'CC', label: 'With food', sig: 'Take with meals' },
		{ key: 'SF', label: 'Without food', sig: 'Take on an empty stomach' },
	];

	// const [medicine, setMedicine] = useState([]);
	// const [selectedDescription, setSelectedDescription] = useState("");

	// useEffect(() => {
	//   fetch("http://localhost:8000/medicine?key={}") // Update with your FastAPI server URL
	//     .then((res) => res.json())
	//     .then((data) => setMedicine(data))
	//     .catch((error) => console.error("Error loading medicine data:", error));
	// }, []);

	const postPrescription = async (data: string) => {
		try {
			const token = localStorage.getItem('jwt'); // Retrieve JWT from localStorage
			if (!token) {
				throw new Error('User is not authenticated');
			}

			const response = await fetch('https://your-api.com/prescriptions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`, // Attach JWT token
				},
				body: data, // Send JSON string
			});

			if (!response.ok) {
				throw new Error('Failed to submit prescription');
			}

			const result = await response.json();
			console.log('Prescription submitted successfully:', result);
		} catch (error) {
			console.error('Error submitting prescription:', error);
		}
	};

	const [selectedIndication, setSelectedIndication] = useState('');

	const [dosageInstruction, setDosageInstruction] = useState(
		'Set Dosage Instructions'
	);

	useEffect(() => {
		setDefaultDate(now(getLocalTimeZone())); // Ensures it only runs on the client
	}, []);

	const medicine = [
		{
			key: 'paracetamol_500mg',
			label: 'Paracetamol 500mg',
			description: 'Do not prescribe with Alcohol, Warfarin (high doses)',
		},
		{
			key: 'paracetamol_650mg',
			label: 'Paracetamol 650mg',
			description: 'Do not prescribe with Alcohol, Warfarin (high doses)',
		},
		{
			key: 'paracetamol_1000mg',
			label: 'Paracetamol 1000mg',
			description: 'Do not prescribe with Alcohol, Warfarin (high doses)',
		},

		{
			key: 'ibuprofen_200mg',
			label: 'Ibuprofen 200mg',
			description:
				'Do not prescribe with Aspirin, Warfarin, Corticosteroids, Lithium',
		},
		{
			key: 'ibuprofen_400mg',
			label: 'Ibuprofen 400mg',
			description:
				'Do not prescribe with Aspirin, Warfarin, Corticosteroids, Lithium',
		},
		{
			key: 'ibuprofen_600mg',
			label: 'Ibuprofen 600mg',
			description:
				'Do not prescribe with Aspirin, Warfarin, Corticosteroids, Lithium',
		},
		{
			key: 'ibuprofen_800mg',
			label: 'Ibuprofen 800mg',
			description:
				'Do not prescribe with Aspirin, Warfarin, Corticosteroids, Lithium',
		},

		{
			key: 'aspirin_81mg',
			label: 'Aspirin 81mg',
			description:
				'Do not prescribe with Warfarin, Ibuprofen, Corticosteroids',
		},
		{
			key: 'aspirin_325mg',
			label: 'Aspirin 325mg',
			description:
				'Do not prescribe with Warfarin, Ibuprofen, Corticosteroids',
		},
		{
			key: 'aspirin_500mg',
			label: 'Aspirin 500mg',
			description:
				'Do not prescribe with Warfarin, Ibuprofen, Corticosteroids',
		},

		{
			key: 'metformin_500mg',
			label: 'Metformin 500mg',
			description:
				'Do not prescribe with Alcohol, Iodinated Contrast Media',
		},
		{
			key: 'metformin_850mg',
			label: 'Metformin 850mg',
			description:
				'Do not prescribe with Alcohol, Iodinated Contrast Media',
		},
		{
			key: 'metformin_1000mg',
			label: 'Metformin 1000mg',
			description:
				'Do not prescribe with Alcohol, Iodinated Contrast Media',
		},

		{
			key: 'lisinopril_5mg',
			label: 'Lisinopril 5mg',
			description:
				'Do not prescribe with Potassium supplements, NSAIDs, Lithium',
		},
		{
			key: 'lisinopril_10mg',
			label: 'Lisinopril 10mg',
			description:
				'Do not prescribe with Potassium supplements, NSAIDs, Lithium',
		},
		{
			key: 'lisinopril_20mg',
			label: 'Lisinopril 20mg',
			description:
				'Do not prescribe with Potassium supplements, NSAIDs, Lithium',
		},
		{
			key: 'lisinopril_40mg',
			label: 'Lisinopril 40mg',
			description:
				'Do not prescribe with Potassium supplements, NSAIDs, Lithium',
		},

		{
			key: 'atorvastatin_10mg',
			label: 'Atorvastatin 10mg',
			description:
				'Do not prescribe with Grapefruit juice, Clarithromycin, Warfarin',
		},
		{
			key: 'atorvastatin_20mg',
			label: 'Atorvastatin 20mg',
			description:
				'Do not prescribe with Grapefruit juice, Clarithromycin, Warfarin',
		},
		{
			key: 'atorvastatin_40mg',
			label: 'Atorvastatin 40mg',
			description:
				'Do not prescribe with Grapefruit juice, Clarithromycin, Warfarin',
		},
		{
			key: 'atorvastatin_80mg',
			label: 'Atorvastatin 80mg',
			description:
				'Do not prescribe with Grapefruit juice, Clarithromycin, Warfarin',
		},

		{
			key: 'warfarin_1mg',
			label: 'Warfarin 1mg',
			description:
				'Do not prescribe with NSAIDs, Aspirin, Antibiotics (Ciprofloxacin), Leafy greens (Vitamin K)',
		},
		{
			key: 'warfarin_2mg',
			label: 'Warfarin 2mg',
			description:
				'Do not prescribe with NSAIDs, Aspirin, Antibiotics (Ciprofloxacin), Leafy greens (Vitamin K)',
		},
		{
			key: 'warfarin_2.5mg',
			label: 'Warfarin 2.5mg',
			description:
				'Do not prescribe with NSAIDs, Aspirin, Antibiotics (Ciprofloxacin), Leafy greens (Vitamin K)',
		},
		{
			key: 'warfarin_5mg',
			label: 'Warfarin 5mg',
			description:
				'Do not prescribe with NSAIDs, Aspirin, Antibiotics (Ciprofloxacin), Leafy greens (Vitamin K)',
		},
		{
			key: 'warfarin_10mg',
			label: 'Warfarin 10mg',
			description:
				'Do not prescribe with NSAIDs, Aspirin, Antibiotics (Ciprofloxacin), Leafy greens (Vitamin K)',
		},

		{
			key: 'fluoxetine_10mg',
			label: 'Fluoxetine 10mg',
			description: 'Do not prescribe with MAOIs, Tramadol, Warfarin',
		},
		{
			key: 'fluoxetine_20mg',
			label: 'Fluoxetine 20mg',
			description: 'Do not prescribe with MAOIs, Tramadol, Warfarin',
		},
		{
			key: 'fluoxetine_40mg',
			label: 'Fluoxetine 40mg',
			description: 'Do not prescribe with MAOIs, Tramadol, Warfarin',
		},
		{
			key: 'fluoxetine_60mg',
			label: 'Fluoxetine 60mg',
			description: 'Do not prescribe with MAOIs, Tramadol, Warfarin',
		},

		{
			key: 'sertraline_25mg',
			label: 'Sertraline 25mg',
			description: 'Do not prescribe with MAOIs, NSAIDs, Warfarin',
		},
		{
			key: 'sertraline_50mg',
			label: 'Sertraline 50mg',
			description: 'Do not prescribe with MAOIs, NSAIDs, Warfarin',
		},
		{
			key: 'sertraline_100mg',
			label: 'Sertraline 100mg',
			description: 'Do not prescribe with MAOIs, NSAIDs, Warfarin',
		},

		{
			key: 'alprazolam_0.25mg',
			label: 'Alprazolam 0.25mg',
			description: 'Do not prescribe with Alcohol, Opioids, Ketoconazole',
		},
		{
			key: 'alprazolam_0.5mg',
			label: 'Alprazolam 0.5mg',
			description: 'Do not prescribe with Alcohol, Opioids, Ketoconazole',
		},
		{
			key: 'alprazolam_1mg',
			label: 'Alprazolam 1mg',
			description: 'Do not prescribe with Alcohol, Opioids, Ketoconazole',
		},
		{
			key: 'alprazolam_2mg',
			label: 'Alprazolam 2mg',
			description: 'Do not prescribe with Alcohol, Opioids, Ketoconazole',
		},

		{
			key: 'morphine_10mg',
			label: 'Morphine 10mg',
			description:
				'Do not prescribe with Alcohol, Benzodiazepines, Antihistamines',
		},
		{
			key: 'morphine_15mg',
			label: 'Morphine 15mg',
			description:
				'Do not prescribe with Alcohol, Benzodiazepines, Antihistamines',
		},
		{
			key: 'morphine_30mg',
			label: 'Morphine 30mg',
			description:
				'Do not prescribe with Alcohol, Benzodiazepines, Antihistamines',
		},
		{
			key: 'morphine_60mg',
			label: 'Morphine 60mg',
			description:
				'Do not prescribe with Alcohol, Benzodiazepines, Antihistamines',
		},
		{
			key: 'morphine_100mg',
			label: 'Morphine 100mg',
			description:
				'Do not prescribe with Alcohol, Benzodiazepines, Antihistamines',
		},
	];

	// Store the selected drug's description
	const [selectedDescription, setSelectedDescription] = useState('');

	const [selectedMedicines, setSelectedMedicines] = useState<
		{ key: string; label: string }[]
	>([]);

	const handleRemoveChip = (key: string) => {
		setSelectedMedicines(
			selectedMedicines.filter((med) => med.key !== key)
		); // Remove selected drug
	};

	return (
		<div className="flex justify-center items-center min-h-screen overflow-hidden">
			<div className="w-full bg-white dark:bg-black p-8 shadow-lg rounded-lg max-h-[95vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-350 scrollbar-track-gray-200">
				<Form
					className="flex flex-col gap-4"
					validationBehavior="native"
					onSubmit={(e) => {
						e.preventDefault();
						const formData = Object.fromEntries(
							new FormData(e.currentTarget)
						);

						// Ensure the date is stored correctly
						const formattedData = {
							...formData,
							prescribedDate: selectedDate?.toISOString() || null, // Convert Date to ISO format
							category: selectedIndication,
							medicines: selectedMedicines.map(
								(med) => med.label
							), // Convert selected medicines to an array of strings
						};

						// Convert to JSON before sending to API
						postPrescription(JSON.stringify(formattedData));
					}}
				>
					<img
						width="35"
						height="35"
						src="https://img.icons8.com/windows/32/prescription.png"
						alt="prescription"
					/>
					<div className="w-full flex flex-row gap-4">
						{defaultDate && (
							<DatePicker
								isReadOnly
								hideTimeZone
								name="prescribedDate"
								showMonthAndYearPickers
								defaultValue={defaultDate}
								label="Prescribed Date"
								variant="bordered"
								onChange={(date) => {
									if (date) {
										setSelectedDate(
											new Date(
												date.year,
												date.month - 1,
												date.day
											)
										); // Convert CalendarDate to Date
									} else {
										setSelectedDate(null);
									}
								}}
							/>
						)}
					</div>

					<RadioGroup
						isRequired
						value={selectedIndication}
						onValueChange={setSelectedIndication}
						className="mx-auto"
						orientation="horizontal"
						description="Select the basis of medication"
						label="Indication"
					>
						<Radio
							value="diagnosis"
							classNames={{
								base: cn(
									'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
									'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
									'data-[selected=true]:border-primary'
								),
							}}
						>
							Diagnosis
						</Radio>
						<Radio
							value="symptoms"
							classNames={{
								base: cn(
									'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
									'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
									'data-[selected=true]:border-primary'
								),
							}}
						>
							Symptoms
						</Radio>
						<Radio
							value="signs"
							classNames={{
								base: cn(
									'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
									'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
									'data-[selected=true]:border-primary'
								),
							}}
						>
							Signs
						</Radio>
					</RadioGroup>

					{/* Dynamically update textarea label & placeholder */}
					<Textarea
						minRows={3}
						className="w-full"
						variant="bordered"
						placeholder={`Enter patient's ${selectedIndication.toLowerCase()}`}
					/>

					<div className="flex flex-wrap gap-2">
						{selectedMedicines.map((med) => (
							<Chip
								key={med.key}
								onClose={() => handleRemoveChip(med.key)}
								color="warning"
								variant="shadow"
							>
								{med.label}
							</Chip>
						))}
					</div>

					<Autocomplete
						className="max-w-md"
						defaultItems={medicine}
						label="Treatment"
						labelPlacement="outside"
						placeholder="Start typing..."
						description={selectedDescription}
						size="md"
						variant="bordered"
						startContent={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-capsule"
								viewBox="0 0 16 16"
							>
								<path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429z" />
							</svg>
						}
						onSelectionChange={(key) => {
							// Find the selected drug based on the key
							const selectedDrug = medicine.find(
								(drug) => drug.key === key
							);
							setSelectedDescription(
								selectedDrug ? selectedDrug.description : ''
							); // Update the description
							if (
								selectedDrug &&
								!selectedMedicines.some(
									(med) => med.key === selectedDrug.key
								)
							) {
								setSelectedMedicines([
									...selectedMedicines,
									selectedDrug,
								]); // Add new selection
							}
						}}
					>
						{(drug) => (
							<AutocompleteItem key={drug.key}>
								{drug.label}
							</AutocompleteItem>
						)}
					</Autocomplete>

					<Dropdown backdrop="blur">
						<DropdownTrigger>
							<Button variant="bordered">
								{dosageInstruction}
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Dosage Instructions"
							variant="faded"
							selectionMode="single"
							selectedKeys={new Set([dosageInstruction])} // Wrap in Set
							onSelectionChange={(keys) => {
								const selectedKey = Array.from(keys)[0]; // Extract selected value
								const selectedLabel = dosageInstructions.find(
									(instruction) =>
										instruction.key === selectedKey
								)?.label;
								if (selectedLabel)
									setDosageInstruction(selectedLabel); // Update state
							}}
						>
							{dosageInstructions.map((instruction) => (
								<DropdownItem
									key={instruction.key}
									description={instruction.sig}
								>
									{instruction.label}
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>

					<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
						<DateRangePicker
							label="Treatment Duration"
							visibleMonths={2}
							variant="bordered"
						/>
					</div>

					<div className="flex gap-4">
						<Chip
							avatar={
								<Avatar
									name="JW"
									src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
								/>
							}
							variant="flat"
						>
							Dr. Steven James
						</Chip>
					</div>

					<div className="flex gap-2">
						<Button color="primary" type="submit">
							Prescribe
						</Button>
						<Button type="reset" variant="flat">
							Reset
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Prescriptions;
