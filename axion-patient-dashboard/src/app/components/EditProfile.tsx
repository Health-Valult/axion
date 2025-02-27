'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Avatar } from '@heroui/react';
import { Pencil, Upload, X, Plus, Trash2 } from 'lucide-react';

// Form schemas
const personalInfoSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	title: z.string().min(2, 'Title is required'),
	email: z.string().email('Invalid email address'),
	phone: z.string().min(10, 'Phone number is required'),
	officeHours: z.string().min(2, 'Office hours are required'),
	location: z.string().min(2, 'Location is required'),
	affiliation: z.string().min(2, 'Affiliation is required'),
	experience: z.string().min(2, 'Experience is required'),
});

const passwordSchema: z.ZodSchema = z
	.object({
		currentPassword: z
			.string()
			.min(8, 'Password must be at least 8 characters'),
		newPassword: z
			.string()
			.min(8, 'Password must be at least 8 characters'),
		confirmPassword: z
			.string()
			.min(8, 'Password must be at least 8 characters'),
	})
	.refine(
		(data: z.infer<typeof passwordSchema>) =>
			data.newPassword === data.confirmPassword,
		{
			message: "Passwords don't match",
			path: ['confirmPassword'],
		}
	);

interface profileProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialData: {
		image: string;
		firstName: string;
		lastName: string;
		designation: string;
		yearsOfExperience: string;
		workingHospital: { name: string };
		officeHours: string;
		email: string;
		phone: string;
		location: string;
		education: {
			degree: string;
			institution: string;
			year: string;
			description: string;
		}[];
	};
	onSave: (data: any) => void;
}

const EditProfileDialog: React.FC<profileProps> = ({
	open,
	onOpenChange,
	initialData,
	onSave,
}) => {
	const [activeTab, setActiveTab] = useState('personal');
	const [imagePreview, setImagePreview] = useState(initialData.image);

	// Forms
	const personalForm = useForm<z.infer<typeof personalInfoSchema>>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			name: initialData.firstName,
			title: initialData.designation,
			email: initialData.email,
			phone: initialData.phone,
			officeHours: initialData.officeHours,
			location: initialData.location,
			affiliation: initialData.workingHospital.name,
			experience: initialData.yearsOfExperience,
		},
	});

	const passwordForm = useForm<z.infer<typeof passwordSchema>>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	// Education and achievements state
	const [educationItems, setEducationItems] = useState([
		{
			degree: 'MD in Cardiology',
			institution: 'Harvard Medical School',
			year: '2005',
		},
		{
			degree: 'Residency in Internal Medicine',
			institution: 'Massachusetts General Hospital',
			year: '2008',
		},
		{
			degree: 'Fellowship in Interventional Cardiology',
			institution: 'Cleveland Clinic',
			year: '2010',
		},
	]);

	const [newEducation, setNewEducation] = useState({
		degree: '',
		institution: '',
		year: '',
	});

	// Handle image upload
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	// Form submissions
	const onPersonalSubmit = (data: z.infer<typeof personalInfoSchema>) => {
		onSave({ ...data, image: imagePreview });
		setActiveTab('education');
	};

	const onPasswordSubmit = (data: z.infer<typeof passwordSchema>) => {
		passwordForm.reset();
	};

	// Education handlers
	const addEducation = () => {
		if (
			newEducation.degree &&
			newEducation.institution &&
			newEducation.year
		) {
			setEducationItems([...educationItems, newEducation]);
			setNewEducation({ degree: '', institution: '', year: '' });
		}
	};

	const removeEducation = (index: number) => {
		setEducationItems(educationItems.filter((_, i) => i !== index));
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px] max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-350 scrollbar-track-gray-200 overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-xl font-montserrat">
						Edit Profile
					</DialogTitle>
				</DialogHeader>

				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="w-full"
				>
					<TabsList className="grid grid-cols-3 mb-4">
						<TabsTrigger value="personal">Personal</TabsTrigger>
						<TabsTrigger value="education">Education</TabsTrigger>
						<TabsTrigger value="password">Password</TabsTrigger>
					</TabsList>

					<TabsContent value="personal">
						<Form {...personalForm}>
							<form
								onSubmit={personalForm.handleSubmit(
									onPersonalSubmit
								)}
								className="space-y-4"
							>
								<div className="flex justify-center mb-4">
									<div className="relative">
										<Avatar
											className="h-24 w-24 border-2 border-primary/20"
											src={imagePreview}
										></Avatar>

										<Label
											htmlFor="picture"
											className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center cursor-pointer"
										>
											<Pencil className="h-4 w-4 text-white" />
										</Label>

										<Input
											id="picture"
											type="file"
											accept="image/*"
											className="hidden"
											onChange={handleImageChange}
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={personalForm.control}
										name="name"
										render={({ field }: { field: any }) => (
											<FormItem>
												<FormLabel>Full Name</FormLabel>
												<FormControl>
													<Input
														placeholder="Dr. John Doe"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={personalForm.control}
										name="title"
										render={({ field }: { field: any }) => (
											<FormItem>
												<FormLabel>
													Specialization
												</FormLabel>
												<FormControl>
													<Input
														placeholder="Cardiologist"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={personalForm.control}
										name="email"
										render={({ field }: { field: any }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														placeholder="doctor@example.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={personalForm.control}
										name="phone"
										render={({ field }: { field: any }) => (
											<FormItem>
												<FormLabel>Phone</FormLabel>
												<FormControl>
													<Input
														placeholder="+1 (555) 123-4567"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={personalForm.control}
									name="affiliation"
									render={({ field }: { field: any }) => (
										<FormItem>
											<FormLabel>
												Hospital/Clinic Affiliation
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Mayo Clinic"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={personalForm.control}
										name="experience"
										render={({ field }: { field: any }) => (
											<FormItem>
												<FormLabel>
													Experience
												</FormLabel>
												<FormControl>
													<Input
														placeholder="15+ years"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={personalForm.control}
										name="officeHours"
										render={({ field }: { field: any }) => (
											<FormItem>
												<FormLabel>
													Office Hours
												</FormLabel>
												<FormControl>
													<Input
														placeholder="Mon-Fri: 9AM-5PM"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={personalForm.control}
									name="location"
									render={({ field }: { field: any }) => (
										<FormItem>
											<FormLabel>Location</FormLabel>
											<FormControl>
												<Input
													placeholder="123 Medical Center Dr, Boston, MA"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex justify-end">
									<Button type="submit">
										Save & Continue
									</Button>
								</div>
							</form>
						</Form>
					</TabsContent>

					<TabsContent value="education">
						<div className="space-y-4">
							<h3 className="font-medium">Qualifications</h3>

							<div className="space-y-3">
								{educationItems.map((item, index) => (
									<div
										key={index}
										className="flex items-start justify-between p-3 border rounded-md"
									>
										<div>
											<p className="font-medium">
												{item.degree}
											</p>
											<p className="text-sm text-muted-foreground">
												{item.institution}, {item.year}
											</p>
										</div>
										<Button
											variant="ghost"
											size="icon"
											onClick={() =>
												removeEducation(index)
											}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								))}
							</div>

							<div className="border rounded-md p-4">
								<h4 className="text-sm font-medium mb-3">
									Add New Education
								</h4>
								<div className="grid gap-3">
									<div>
										<Label htmlFor="degree">
											Degree/Certification
										</Label>
										<Input
											id="degree"
											value={newEducation.degree}
											onChange={(e) =>
												setNewEducation({
													...newEducation,
													degree: e.target.value,
												})
											}
											placeholder="MD in Cardiology"
										/>
									</div>
									<div>
										<Label htmlFor="institution">
											Institution
										</Label>
										<Input
											id="institution"
											value={newEducation.institution}
											onChange={(e) =>
												setNewEducation({
													...newEducation,
													institution: e.target.value,
												})
											}
											placeholder="Harvard Medical School"
										/>
									</div>
									<div>
										<Label htmlFor="year">Year</Label>
										<Input
											id="year"
											value={newEducation.year}
											onChange={(e) =>
												setNewEducation({
													...newEducation,
													year: e.target.value,
												})
											}
											placeholder="2005"
										/>
									</div>
									<Button
										onClick={addEducation}
										className="w-full"
									>
										<Plus className="h-4 w-4 mr-2" /> Add
										Education
									</Button>
								</div>
							</div>

							<div className="flex justify-end gap-2">
								<Button
									variant="outline"
									onClick={() => setActiveTab('personal')}
								>
									Back
								</Button>
								<Button
									onClick={() => setActiveTab('password')}
								>
									Continue
								</Button>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="password">
						<Form {...passwordForm}>
							<form
								onSubmit={passwordForm.handleSubmit(
									onPasswordSubmit
								)}
								className="space-y-4"
							>
								<FormField
									control={passwordForm.control}
									name="currentPassword"
									render={({ field }: { field: any }) => (
										<FormItem>
											<FormLabel>
												Current Password
											</FormLabel>
											<FormControl>
												<Input
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={passwordForm.control}
									name="newPassword"
									render={({ field }: { field: any }) => (
										<FormItem>
											<FormLabel>New Password</FormLabel>
											<FormControl>
												<Input
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={passwordForm.control}
									name="confirmPassword"
									render={({ field }: { field: any }) => (
										<FormItem>
											<FormLabel>
												Confirm New Password
											</FormLabel>
											<FormControl>
												<Input
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex justify-end gap-2">
									<Button
										variant="outline"
										onClick={() =>
											setActiveTab('education')
										}
									>
										Back
									</Button>
									<Button type="submit">
										Update Password
									</Button>
								</div>
							</form>
						</Form>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default EditProfileDialog;
