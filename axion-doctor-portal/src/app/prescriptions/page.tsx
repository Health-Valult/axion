'use client';

import React, { useState, useEffect, Key } from 'react';
import { Form, Button, RangeValue } from '@heroui/react';
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
import { RadioGroup, Radio, cn, CheckboxGroup, Checkbox } from '@heroui/react';
import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { Input } from '@heroui/react';

import { now, getLocalTimeZone, DateValue } from '@internationalized/date';
import ProtectedClientComponent from '../components/ProtectedClientComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Prescriptions: React.FC = () => {
	const user = useSelector((state: RootState) => state.user);
	const [defaultDate, setDefaultDate] = useState<any>(null);
	const [selectedIndications, setSelectedIndications] = useState<string[]>(
		[]
	);
	const [diagnosedCondition, setDiagnosedCondition] = useState<string>('');
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [medicine, setMedicine] = useState<
		Array<{ key: string; label: string; description: string }>
	>([]);
	const [selectedValue, setSelectedValue] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
	];

	const timingMeals = [
		{ key: 'AC', label: 'Before meals', sig: 'Take before eating' },
		{ key: 'PC', label: 'After meals', sig: 'Take after eating' },
		{ key: 'HS', label: 'At bedtime', sig: 'Take before sleeping' },
		{ key: 'CC', label: 'With food', sig: 'Take with meals' },
		{ key: 'SF', label: 'Without food', sig: 'Take on an empty stomach' },
	];

	const routes = [
		{ key: 'PO', label: 'Oral', description: 'By mouth' },
		{ key: 'IV', label: 'Intravenous', description: 'Into a vein' },
		{ key: 'IM', label: 'Intramuscular', description: 'Into a muscle' },
		{ key: 'SC', label: 'Subcutaneous', description: 'Under the skin' },
		{ key: 'TOP', label: 'Topical', description: 'Applied to the skin' },
		{ key: 'INH', label: 'Inhalation', description: 'Breathed in' },
	];

	const [selectedMedicines, setSelectedMedicines] = useState<
		{
			key: string;
			label: string;
			description: string;
			frequency: string;
			mealTiming: string;
			treatmentDuration: RangeValue<DateValue> | null;
			dosage: string;
			route: string;
		}[]
	>([]);

	// Fetch medicine data from RxNorm API
	const fetchMedicineData = async (query: string) => {
		if (!query || query.length < 2) {
			setMedicine([]);
			return;
		}

		setIsLoading(true);
		try {
			const response = await fetch(
				`http://localhost:3000/api/proxy10?name=${encodeURIComponent(
					query
				)}`
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();

			console.log(data);

			// Process the response data
			let medicines: Array<{
				key: string;
				label: string;
				description: string;
			}> = [];

			if (data && data.drugGroup && data.drugGroup.conceptGroup) {
				// Iterate through all concept groups
				data.drugGroup.conceptGroup.forEach((group: any) => {
					if (group.conceptProperties) {
						// Extract properties from each concept
						const groupMedicines = group.conceptProperties.map(
							(prop: any) => ({
								key: prop.rxcui,
								label: prop.name,
								description: prop.synonym || prop.name,
							})
						);

						medicines = [...medicines, ...groupMedicines];
					}
				});
			}

			setMedicine(medicines);
		} catch (error) {
			console.error('Error fetching medicine data:', error);
			setMedicine([]);
		} finally {
			setIsLoading(false);
		}
	};

	// Debounce function for medicine search
	useEffect(() => {
		const timer = setTimeout(() => {
			if (selectedValue) {
				fetchMedicineData(selectedValue);
			}
		}, 300); // 300ms debounce time

		return () => clearTimeout(timer);
	}, [selectedValue]);

	useEffect(() => {
		setDefaultDate(now(getLocalTimeZone())); // Ensures it only runs on the client
	}, []);

	const handleMedicineSelection = (key: Key | null) => {
		if (!key) return;

		const selectedDrug = medicine.find(
			(drug) => drug.key === key.toString()
		);

		if (
			selectedDrug &&
			!selectedMedicines.some((med) => med.key === selectedDrug.key)
		) {
			setSelectedMedicines([
				...selectedMedicines,
				{
					...selectedDrug,
					frequency: '',
					mealTiming: '',
					treatmentDuration: null,
					dosage: '',
					route: '',
				},
			]);
		}

		setSelectedValue('');
	};

	const updateMedicineField = (
		key: string,
		field:
			| 'frequency'
			| 'mealTiming'
			| 'treatmentDuration'
			| 'dosage'
			| 'route',
		value: string | RangeValue<DateValue> | null
	) => {
		setSelectedMedicines((prev) =>
			prev.map((med) =>
				med.key === key ? { ...med, [field]: value } : med
			)
		);
	};

	const handleRemoveChip = (key: string) => {
		setSelectedMedicines(
			selectedMedicines.filter((med) => med.key !== key)
		);
	};

	const postPrescription = async (data: string) => {
		try {
			const token = localStorage.getItem('jwt');
			if (!token) {
				throw new Error('User is not authenticated');
			}

			const response = await fetch('https://your-api.com/prescriptions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: data,
			});

			if (!response.ok) {
				throw new Error('Failed to submit prescription');
			}

			const result = await response.json();
			console.log('Prescription submitted successfully:', result);

			// Reset form after successful submission
			setSelectedMedicines([]);
			setSelectedIndications([]);
			setDiagnosedCondition('');
		} catch (error) {
			console.error('Error submitting prescription:', error);
		}
	};

	return (
		<ProtectedClientComponent>
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

							// Format medications according to the required schema
							const formattedMedicines = selectedMedicines.map(
								(med) => ({
									format: 'AxionDataX-1.0',
									resourceType: 'medication',
									id: crypto.randomUUID(), // Generate UUID on the client
									patientID:
										formData.patientID ||
										'default-patient-id', // Get from form or use default
									coding_system: 'RxNorm',
									code: med.key, // RxCUI from RxNorm
									display: med.label,
									frequency: med.frequency,
									mealTiming: med.mealTiming,
									dosage: med.dosage || '1 tablet',
									route: med.route || 'PO',
									prescriber: 'Dr. Steven James',
									meta: {
										treatmentDuration: med.treatmentDuration
											? {
													start: med.treatmentDuration
														.start
														? med.treatmentDuration.start.toString()
														: null,
													end: med.treatmentDuration
														.end
														? med.treatmentDuration.end.toString()
														: null,
											  }
											: null,
										diagnosis: selectedIndications.includes(
											'diagnosis'
										)
											? diagnosedCondition
											: null,
										indications: selectedIndications,
										prescribedDate:
											selectedDate?.toISOString() ||
											new Date().toISOString(),
									},
								})
							);

							console.log(
								'Sending prescription data:',
								formattedMedicines
							);

							// Convert to JSON before sending to API
							postPrescription(
								JSON.stringify(formattedMedicines)
							);
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
											);
										} else {
											setSelectedDate(null);
										}
									}}
								/>
							)}

							<Input
								label="Patient ID"
								placeholder="Enter patient ID"
								name="patientID"
								variant="bordered"
								isRequired
							/>
						</div>

						<CheckboxGroup
							isRequired
							value={selectedIndications}
							onValueChange={setSelectedIndications}
							className="mx-auto"
							orientation="horizontal"
							description="Select the basis of medication"
							label="Indication"
						>
							<Checkbox
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
							</Checkbox>
							<Checkbox
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
							</Checkbox>
							<Checkbox
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
							</Checkbox>
						</CheckboxGroup>

						{selectedIndications.includes('diagnosis') && (
							<Input
								label="Diagnosed Condition"
								placeholder="Enter the diagnosed condition"
								name="diagnosedCondition"
								value={diagnosedCondition}
								onChange={(e) =>
									setDiagnosedCondition(e.target.value)
								}
								variant="bordered"
								className="w-full"
								isRequired
							/>
						)}

						<Textarea
							name="notes"
							minRows={3}
							className="w-full"
							variant="bordered"
							placeholder={`Enter patient's ${
								selectedIndications
									.join(' and ')
									.toLowerCase() || 'clinical information'
							}`}
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
							placeholder="Start typing to search medications..."
							size="md"
							variant="bordered"
							isLoading={isLoading}
							onInputChange={(value) => setSelectedValue(value)}
							onSelectionChange={handleMedicineSelection}
						>
							{(drug) => (
								<AutocompleteItem key={drug.key}>
									{drug.label}
								</AutocompleteItem>
							)}
						</Autocomplete>

						<div className="flex flex-wrap gap-4">
							{selectedMedicines.map((med) => (
								<div
									key={med.key}
									className="flex flex-col gap-4 border p-4 rounded-lg w-full"
								>
									<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
										<div className="flex-1 font-semibold">
											{med.label}
										</div>

										{/* Input for dosage */}
										<Input
											label="Dosage"
											placeholder="e.g., 1 tablet"
											value={med.dosage}
											onChange={(e) =>
												updateMedicineField(
													med.key,
													'dosage',
													e.target.value
												)
											}
											size="sm"
											variant="bordered"
											className="w-40"
										/>

										{/* Route Dropdown */}
										<Dropdown>
											<DropdownTrigger>
												<Button
													variant="bordered"
													size="sm"
												>
													{routes.find(
														(r) =>
															r.key === med.route
													)?.label || 'Select Route'}
												</Button>
											</DropdownTrigger>
											<DropdownMenu
												selectionMode="single"
												selectedKeys={
													new Set([med.route])
												}
												onSelectionChange={(keys) => {
													const selectedKey =
														Array.from(keys)[0];
													updateMedicineField(
														med.key,
														'route',
														selectedKey as string
													);
												}}
											>
												{routes.map((route) => (
													<DropdownItem
														key={route.key}
													>
														{route.label} (
														{route.description})
													</DropdownItem>
												))}
											</DropdownMenu>
										</Dropdown>

										{/* Frequency Dropdown */}
										<Dropdown>
											<DropdownTrigger>
												<Button
													variant="bordered"
													size="sm"
												>
													{dosageInstructions.find(
														(d) =>
															d.key ===
															med.frequency
													)?.label ||
														'Select Frequency'}
												</Button>
											</DropdownTrigger>
											<DropdownMenu
												selectionMode="single"
												selectedKeys={
													new Set([med.frequency])
												}
												onSelectionChange={(keys) => {
													const selectedKey =
														Array.from(keys)[0];
													updateMedicineField(
														med.key,
														'frequency',
														selectedKey as string
													);
												}}
											>
												{dosageInstructions.map(
													(instruction) => (
														<DropdownItem
															key={
																instruction.key
															}
														>
															{instruction.label}{' '}
															({instruction.sig})
														</DropdownItem>
													)
												)}
											</DropdownMenu>
										</Dropdown>

										{/* Meal Timing Dropdown */}
										<Dropdown>
											<DropdownTrigger>
												<Button
													variant="bordered"
													size="sm"
												>
													{timingMeals.find(
														(t) =>
															t.key ===
															med.mealTiming
													)?.label ||
														'Select Meal Timing'}
												</Button>
											</DropdownTrigger>
											<DropdownMenu
												selectionMode="single"
												selectedKeys={
													new Set([med.mealTiming])
												}
												onSelectionChange={(keys) => {
													const selectedKey =
														Array.from(keys)[0];
													updateMedicineField(
														med.key,
														'mealTiming',
														selectedKey as string
													);
												}}
											>
												{timingMeals.map(
													(instruction) => (
														<DropdownItem
															key={
																instruction.key
															}
														>
															{instruction.label}{' '}
															({instruction.sig})
														</DropdownItem>
													)
												)}
											</DropdownMenu>
										</Dropdown>
									</div>

									{/* Treatment Duration Picker */}
									<DateRangePicker
										label="Treatment Duration"
										visibleMonths={2}
										variant="bordered"
										value={med.treatmentDuration || null}
										onChange={(newRange) => {
											updateMedicineField(
												med.key,
												'treatmentDuration',
												newRange
											);
										}}
									/>
								</div>
							))}
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
								{user?.state?.fullName || 'Unknown User'}
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
		</ProtectedClientComponent>
	);
};

export default Prescriptions;
