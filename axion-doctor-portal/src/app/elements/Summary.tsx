/* eslint-disable */
'use client';

import React from 'react';
import { useQuery, ApolloError } from '@apollo/client';
import { User, Pill, AlertTriangle, Shield, Loader2 } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
	GET_ALLERGIES,
	GET_IMMUNIZATIONS,
	GET_MEDICATIONS,
} from '../graphql/queries';

interface SummaryProps {
	name: string;
	age: number;
	gender: string;
}

export interface Medication {
	display: string;
	dosage: string;
	route: string;
	meta: {
		created?: string;
		updated?: string;
		source?: string;
		duration?: string;
		reason?: string;
		treatmentDuration?: {
			start: string;
			end: string;
		};
	};
}

export interface MedicationsResponse {
	medications: {
		medications: Medication[];
	};
}

// Allergy types
export interface Allergy {
	criticality: 'HIGH' | 'MEDIUM' | 'LOW';
	severity: 'SEVERE' | 'MODERATE' | 'MILD';
	category: 'food' | 'medication' | 'environment';
	active: boolean;
	source: 'PATIENTREPORTED' | 'DOCTORRECORDED';
	verificationStatus: 'CONFIRMED' | 'SUSPECTED';
	meta: {
		created: string;
		updated: string;
		source: string;
	};
}

export interface AllergiesResponse {
	allergys: {
		allergyIntolerances: Allergy[];
	};
}

// Immunization types
export interface Immunization {
	display: string;
	dosage: string;
	unit: string;
	site: string;
	timestamp: string;
	meta: {
		created: string;
		updated: string;
		source: string;
	};
}

export interface ImmunizationsResponse {
	immunization: {
		immunizations: Immunization[];
	};
}

// Combined response types for useQuery hooks
export interface MedicationsData {
	medications?: {
		medications?: Medication[] | null;
	} | null;
}

export interface AllergiesData {
	allergys?: {
		allergyIntolerances?: Allergy[] | null;
	} | null;
}

export interface ImmunizationsData {
	immunization?: {
		immunizations?: Immunization[] | null;
	} | null;
}

// Helper function to format date
const formatDate = (dateString: string): string => {
	try {
		return format(new Date(dateString), 'MMM dd, yyyy');
	} catch (e) {
		return 'Invalid date';
	}
};

// Severity color mapping
const getSeverityColor = (severity: string | undefined): string => {
	switch (severity?.toUpperCase()) {
		case 'SEVERE':
			return 'bg-red-500';
		case 'MODERATE':
			return 'bg-orange-500';
		case 'MILD':
			return 'bg-yellow-500';
		default:
			return 'bg-gray-500';
	}
};

// Criticality badge variant
const getCriticalityVariant = (
	criticality: string | undefined
): 'default' | 'destructive' | 'secondary' | 'outline' => {
	switch (criticality?.toUpperCase()) {
		case 'HIGH':
			return 'destructive';
		case 'MEDIUM':
			return 'default';
		case 'LOW':
			return 'secondary';
		default:
			return 'outline';
	}
};

const Summary: React.FC = () => {
	// Fetch medications data
	const {
		data: medicationsData,
		loading: medicationsLoading,
		error: medicationsError,
	} = useQuery<MedicationsData>(GET_MEDICATIONS);

	// Fetch allergies data
	const {
		data: allergiesData,
		loading: allergiesLoading,
		error: allergiesError,
	} = useQuery<AllergiesData>(GET_ALLERGIES);

	// Fetch immunizations data
	const {
		data: immunizationsData,
		loading: immunizationsLoading,
		error: immunizationsError,
	} = useQuery<ImmunizationsData>(GET_IMMUNIZATIONS);

	// Format medications data
	const medications: Medication[] =
		medicationsData?.medications?.medications || [];
	const medicationsDescription: string =
		medications.length > 0
			? medications
					.map((med) => `${med.display} (${med.dosage})`)
					.join(', ')
			: 'No medications recorded';

	// Format allergies data
	const allergies: Allergy[] =
		allergiesData?.allergys?.allergyIntolerances || [];

	// Format immunizations data
	const immunizations: Immunization[] =
		immunizationsData?.immunization?.immunizations || [];
	const immunizationsDescription: string =
		immunizations.length > 0
			? immunizations
					.map(
						(imm) => `${imm.display} (${formatDate(imm.timestamp)})`
					)
					.join(', ')
			: 'No immunizations recorded';

	// Loading state
	const isLoading: boolean =
		medicationsLoading || allergiesLoading || immunizationsLoading;

	// Error state
	const hasError: boolean =
		!!medicationsError || !!allergiesError || !!immunizationsError;

	return (
		<Card className="w-full shadow-md border-gray-300 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg">
			<CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
				<div className="flex items-start justify-between">
					<div className="flex items-center space-x-4">
						<div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center">
							<User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
						</div>
					</div>
					<Badge variant="outline" className="text-sm px-3 py-1">
						Patient Summary
					</Badge>
				</div>
			</CardHeader>

			{isLoading ? (
				<CardContent className="py-8">
					<div className="flex flex-col items-center justify-center space-y-2">
						<Loader2 className="h-8 w-8 animate-spin text-blue-500" />
						<p className="text-sm text-gray-500">
							Loading patient data...
						</p>
					</div>
				</CardContent>
			) : hasError ? (
				<CardContent className="py-8">
					<div className="flex flex-col items-center justify-center space-y-2 text-red-500">
						<AlertTriangle className="h-8 w-8" />
						<p>
							Error loading patient data. Please try again later.
						</p>
					</div>
				</CardContent>
			) : (
				<CardContent className="grid gap-6 p-6">
					{/* Medications Section */}
					<div className="space-y-3">
						<div className="flex items-center space-x-2">
							<Pill className="h-5 w-5 text-blue-600 dark:text-blue-400" />
							<h3 className="text-base font-semibold text-gray-800 dark:text-white">
								Medications
							</h3>
						</div>
						<div className="ml-7 space-y-2">
							{medications.length > 0 ? (
								medications.map((med, idx) => (
									<div
										key={idx}
										className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
									>
										<p className="font-medium text-gray-800 dark:text-gray-200">
											{med.display}
										</p>
										<div className="mt-1 flex flex-wrap gap-2">
											<Badge
												variant="secondary"
												className="text-xs"
											>
												{med.dosage}
											</Badge>
											<Badge
												variant="outline"
												className="text-xs"
											>
												{med.route}
											</Badge>
										</div>
									</div>
								))
							) : (
								<p className="text-sm text-gray-500 dark:text-gray-400 italic">
									No medications recorded
								</p>
							)}
						</div>
					</div>

					{/* Allergies Section */}
					<div className="space-y-3">
						<div className="flex items-center space-x-2">
							<AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
							<h3 className="text-base font-semibold text-gray-800 dark:text-white">
								Allergies
							</h3>
						</div>
						<div className="ml-7 space-y-2">
							{allergies.length > 0 ? (
								allergies.map((allergy, idx) => (
									<div
										key={idx}
										className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
									>
										<div className="flex items-center justify-between">
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<div className="flex items-center">
															<span
																className={`h-3 w-3 rounded-full ${getSeverityColor(
																	allergy.severity
																)} mr-2`}
															></span>
															<p className="font-medium text-gray-800 dark:text-gray-200 capitalize">
																{
																	allergy.category
																}{' '}
																Allergy
															</p>
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>
															Severity:{' '}
															{allergy.severity}
														</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
											<Badge
												variant={getCriticalityVariant(
													allergy.criticality
												)}
											>
												{allergy.criticality} Risk
											</Badge>
										</div>
										<div className="mt-2">
											<Badge
												variant="outline"
												className="text-xs"
											>
												{allergy.verificationStatus}
											</Badge>
											<Badge
												variant="outline"
												className="text-xs ml-2"
											>
												{allergy.source}
											</Badge>
										</div>
									</div>
								))
							) : (
								<p className="text-sm text-gray-500 dark:text-gray-400 italic">
									No allergies recorded
								</p>
							)}
						</div>
					</div>

					{/* Immunizations Section */}
					<div className="space-y-3">
						<div className="flex items-center space-x-2">
							<Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
							<h3 className="text-base font-semibold text-gray-800 dark:text-white">
								Immunizations
							</h3>
						</div>
						<div className="ml-7 space-y-2">
							{immunizations.length > 0 ? (
								immunizations.map((imm, idx) => (
									<div
										key={idx}
										className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
									>
										<p className="font-medium text-gray-800 dark:text-gray-200">
											{imm.display}
										</p>
										<div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
											<p>
												{imm.dosage} {imm.unit} •{' '}
												{imm.site}
											</p>
											<p className="text-xs mt-1">
												Administered:{' '}
												{formatDate(imm.timestamp)}
											</p>
										</div>
									</div>
								))
							) : (
								<p className="text-sm text-gray-500 dark:text-gray-400 italic">
									No immunizations recorded
								</p>
							)}
						</div>
					</div>
				</CardContent>
			)}

			<CardFooter className="bg-gray-50 dark:bg-gray-900 px-6 py-4 flex justify-between">
				<p className="text-xs text-gray-500 dark:text-gray-400">
					Last updated: {format(new Date(), 'MMM dd, yyyy • h:mm a')}
				</p>
				<Badge variant="outline" className="text-xs">
					Connected
				</Badge>
			</CardFooter>
		</Card>
	);
};

export default Summary;
