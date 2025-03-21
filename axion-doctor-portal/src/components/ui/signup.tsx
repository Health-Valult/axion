'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperSeparator,
	StepperTrigger,
} from './stepper';
import { useState, useEffect } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './select';
import { Textarea } from './textarea';
import { AxionLogo } from '@/app/components/SideBar';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
// New imports for email verification
import { v4 as uuidv4 } from 'uuid';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { InputOtp } from '@heroui/input-otp';

const nicRegex = /^([0-9]{12}|[0-9]{9}[vV])$/;
const phoneRegex = /^[0-9]{10}$/;
const slmcRegex = /^SLMC[0-9]{5}$/;
const passRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,20}$/;

const formSchema = z.object({
	fullName: z.string().min(2, 'Name must be at least 2 characters'),
	nic: z.string().regex(nicRegex, 'Invalid NIC format'),
	email: z.string().email('Invalid email address'),
	phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
	address: z.string().min(5, 'Address is required'),
	specialization: z.string().min(2, 'Specialization is required'),
	affiliation: z.string().min(2, 'Hospital/Clinic affiliation is required'),
	officeHours: z.string().min(2, 'Office hours are required'),
	slmcNumber: z.string().regex(slmcRegex, 'Invalid SLMC registration number'),
	experience: z.number().min(0, 'Invalid years of experience'),
	qualifications: z
		.array(
			z.object({
				degree: z.string(),
				institution: z.string(),
				year: z.number(),
			})
		)
		.optional()
		.default([
			{
				degree: 'MBBS',
				institution: 'University of Colombo',
				year: 2020,
			},
		]),
	password: z
		.string()
		.regex(
			passRegex,
			'Password must be at least 8 characters, including a number, uppercase letter, lowercase letter, and a special character (@, !, #, $, %, ^, &, *)'
		),
});

const steps = [
	'Personal Details',
	'Contact Info',
	'Professional Info',
	'Credentials',
	'Complete',
];

export function DoctorSignup() {
	const [currentStep, setCurrentStep] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [validatedSteps, setValidatedSteps] = useState<number[]>([]);
	const [renderKey, setRenderKey] = useState(0);

	// New states for email verification
	const [tempID] = useState(uuidv4());
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [otp, setOtp] = useState('');
	const [isVerifying, setIsVerifying] = useState(false);
	const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(
		null
	);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			nic: '',
			email: '',
			phone: '',
			address: '',
			specialization: '',
			affiliation: '',
			officeHours: '',
			slmcNumber: '',
			experience: 0,
			qualifications: [],
			password: '',
		},
	});

	const sendVerificationEmail = async (email: string) => {
		try {
			setIsLoading(true);

			const verificationData = {
				type: 'email',
				tempID: tempID,
				data: email,
			};

			const response = await fetch('http://localhost:3000/api/proxy5', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(verificationData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				toast.error(
					`Verification email failed: ${
						errorData.message || 'Unknown error'
					}`
				);
				throw new Error(errorData.message || 'Verification failed');
			}

			toast.success('Verification code sent to your email');
			setIsDialogOpen(true);
		} catch (error) {
			toast.error('Error sending verification email: ' + error);
		} finally {
			setIsLoading(false);
		}
	};

	const verifyOtp = async () => {
		try {
			setIsVerifying(true);

			const verificationData = {
				tempID: tempID,
				otp: otp,
			};

			const response = await fetch('http://localhost:3000/api/proxy6', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(verificationData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				toast.error(
					`OTP verification failed: ${
						errorData.message || 'Invalid OTP'
					}`
				);
				throw new Error(errorData.message || 'Verification failed');
			}

			toast.success('Email verified successfully');
			setIsDialogOpen(false);

			// Now submit the doctor registration
			if (formData) {
				await submitDoctorRegistration(formData);
			}
		} catch (error) {
			toast.error('Error verifying OTP: ' + error);
		} finally {
			setIsVerifying(false);
		}
	};

	const submitDoctorRegistration = async (
		values: z.infer<typeof formSchema>
	) => {
		try {
			setIsLoading(true);

			// Prepare the data in the format expected by the API
			const doctorData = {
				FullName: values.fullName,
				NIC: values.nic,
				Email: values.email,
				Telephone: values.phone,
				Address: values.address,
				Specialization: values.specialization,
				Affiliation: values.affiliation,
				OfficeHours: values.officeHours,
				SlmcNumber: values.slmcNumber,
				Experience: values.experience,
				Qualifications: values.qualifications || [],
				Password: values.password,
			};

			const response = await fetch('http://localhost:3000/api/proxy2', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(doctorData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				toast.error(
					`Registration failed: ${
						errorData.message || 'Unknown error'
					}`
				);
				throw new Error(errorData.message || 'Registration failed');
			}

			const result = await response.json();
			toast.success('Registration successful! Redirecting to login...');

			// Redirect to login page on success
			setTimeout(() => {
				router.push('/login');
			}, 1500);
		} catch (error) {
			toast.error('Error during registration: ' + error);
		} finally {
			setIsLoading(false);
		}
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// Store form data for later use after OTP verification
		setFormData(values);

		// Start email verification flow
		await sendVerificationEmail(values.email);
	};

	// Function to handle next button click
	const handleNext = async () => {
		// Validate fields in current step before proceeding
		let isValid = true;

		switch (currentStep) {
			case 0:
				isValid = await form.trigger(['fullName', 'nic']);
				break;
			case 1:
				isValid = await form.trigger(['email', 'phone', 'address']);
				break;
			case 2:
				isValid = await form.trigger([
					'specialization',
					'affiliation',
					'officeHours',
				]);
				break;
			case 3:
				isValid = await form.trigger([
					'slmcNumber',
					'experience',
					'password',
				]);
				break;
		}

		if (isValid) {
			// Mark current step as validated
			if (!validatedSteps.includes(currentStep)) {
				setValidatedSteps([...validatedSteps, currentStep]);
			}
			setCurrentStep((prev) => prev + 1);
			setRenderKey((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		setCurrentStep((prev) => Math.max(0, prev - 1));
		setRenderKey((prev) => prev + 1); // Also force re-render when going back
	};

	const renderStepContent = (step: number) => {
		switch (step) {
			case 0:
				return (
					<>
						<FormField
							control={form.control}
							name="fullName"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your full name"
											{...field}
											value={field.value} // Explicitly set value from form state
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="nic"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>NIC</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your NIC number"
											{...field}
											value={field.value} // Explicitly set value from form state
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				);

			case 1:
				return (
					<>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="youremail@example.com"
											{...field}
											value={field.value} // Explicitly set value from form state
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value} // Explicitly set value from form state
											placeholder="+94XXXXXXXXX"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter your full address"
											{...field}
											value={field.value} // Explicitly set value from form state
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				);

			case 2:
				return (
					<>
						<FormField
							control={form.control}
							name="specialization"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Specialization</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select specialization" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="cardiology">
												Cardiology
											</SelectItem>
											<SelectItem value="dermatology">
												Dermatology
											</SelectItem>
											<SelectItem value="neurology">
												Neurology
											</SelectItem>
											<SelectItem value="orthopedics">
												Orthopedics
											</SelectItem>
											<SelectItem value="pediatrics">
												Pediatrics
											</SelectItem>
											<SelectItem value="psychiatry">
												Psychiatry
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="affiliation"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>
										Hospital/Clinic Affiliation
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your hospital or clinic"
											{...field}
											value={field.value} // Explicitly set value from form state
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="officeHours"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Office Hours</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value} // Explicitly set value from form state
											placeholder="e.g., Mon-Fri 9:00 AM - 5:00 PM"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				);

			case 3:
				return (
					<>
						<FormField
							control={form.control}
							name="slmcNumber"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>
										SLMC Registration Number
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your 5-digit SLMC number"
											{...field}
											value={field.value} // Explicitly set value from form state
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="experience"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Years of Experience</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="0"
											{...field}
											value={field.value.toString()} // Explicitly set value from form state
											onChange={(e) =>
												field.onChange(
													Number(e.target.value)
												)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Enter a secure password"
											{...field}
											value={field.value} // Explicitly set value from form state
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				);

			case 4:
				return (
					<div className="text-center">
						<h3 className="text-lg font-medium">Review & Submit</h3>
						<p className="text-muted-foreground">
							Please review your information before submitting
						</p>
						<Button
							className="mt-4"
							type="submit"
							disabled={isLoading}
						>
							{isLoading
								? 'Processing...'
								: 'Complete Registration'}
						</Button>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="flex min-h-screen w-full items-center justify-center">
			<div className="mx-auto w-5/12 space-y-8">
				<div className="space-y-2 text-center">
					<div className="justify-center flex">
						<AxionLogo width={32} height={32} />
					</div>
					<h1 className="text-3xl font-bold">Doctor Registration</h1>
					<p className="text-muted-foreground">
						Please fill in your details to register
					</p>
				</div>

				<Stepper value={currentStep} onValueChange={setCurrentStep}>
					{steps.map((step, index) => (
						<StepperItem
							key={step}
							step={index}
							className="[&:not(:last-child)]:flex-1"
							loading={isLoading}
						>
							<StepperTrigger asChild>
								<StepperIndicator />
							</StepperTrigger>
							{index < steps.length && <StepperSeparator />}
						</StepperItem>
					))}
				</Stepper>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div key={renderKey}>
							{renderStepContent(currentStep)}
						</div>

						<div className="flex justify-between">
							<Button
								type="button"
								variant="outline"
								onClick={handleBack}
								disabled={currentStep === 0}
							>
								Previous
							</Button>
							{currentStep === steps.length - 1 ? null : (
								<Button type="button" onClick={handleNext}>
									Next
								</Button>
							)}
						</div>
					</form>
				</Form>

				{/* Email Verification Dialog */}
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Verify your email</DialogTitle>
							<DialogDescription>
								We have sent an OTP to your email. Please enter
								it below to verify your account.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid items-center gap-4">
								<Label htmlFor="otp" className="text-center">
									Enter OTP
								</Label>
								<InputOtp
									length={6}
									value={otp}
									onValueChange={setOtp}
									className="mx-auto"
								/>
							</div>
						</div>
						<DialogFooter>
							<Button
								type="button"
								onClick={verifyOtp}
								disabled={isVerifying || otp.length !== 6}
							>
								{isVerifying ? 'Verifying...' : 'Verify'}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
