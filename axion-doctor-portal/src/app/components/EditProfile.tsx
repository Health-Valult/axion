/* eslint-disable */
'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { getTokensFromCookies } from '../utils/auth';

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
}

const EditProfileDialog: React.FC<profileProps> = ({ open, onOpenChange }) => {
	const passwordForm = useForm<z.infer<typeof passwordSchema>>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	const onPasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
		const { sessionToken } = await getTokensFromCookies();
		try {
			const payload = {
				Old: data.currentPassword,
				New: data.newPassword,
			};

			const response = await fetch('http://localhost:3000/api/proxy9', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${sessionToken}`,
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				// Handle error responses
				if (response.status === 422) {
					const errorData = await response.json();
					// Handle validation errors
					console.error('Validation error:', errorData);
					// You might want to set form errors here
					return;
				}
				throw new Error(
					`Request failed with status ${response.status}`
				);
			}

			// Handle successful response
			const result = await response.json();
			console.log('Password successfully changed');
			// You might want to show a success message to the user

			// Reset the form
			passwordForm.reset();
		} catch (error) {
			console.error('Error changing password:', error);
			// Handle unexpected errors
			// You might want to show an error message to the user
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px] max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-350 scrollbar-track-gray-200 overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-xl font-montserrat">
						Change Password
					</DialogTitle>
				</DialogHeader>
				<Form {...passwordForm}>
					<form
						onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
						className="space-y-4"
					>
						<FormField
							control={passwordForm.control}
							name="currentPassword"
							render={({ field }: { field: any }) => (
								<FormItem>
									<FormLabel>Current Password</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
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
										<Input type="password" {...field} />
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
									<FormLabel>Confirm New Password</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end gap-2">
							<Button type="submit">Update Password</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EditProfileDialog;
