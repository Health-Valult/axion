'use server';

import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';

// Form validation schema
const FormSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
	redirectTo: z.string().optional(),
	latitude: z.string().optional(), // Keep as string since FormData passes strings
	longitude: z.string().optional(), // Keep as string since FormData passes strings
	ipAddress: z.string().optional(),
});

/**
 * Authenticates a user with provided credentials and location data
 * @param prevState Previous error state if any
 * @param formData Form data containing credentials and location information
 * @returns Error message or undefined on success
 */
export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	try {
		// Log raw form data for debugging
		console.log('Raw form data received:', {
			email: formData.get('email'),
			password: formData.get('password'), // Log password only in development
			latitude: formData.get('latitude'),
			longitude: formData.get('longitude'),
			ipAddress: formData.get('ipAddress'),
		});

		// Validate form fields
		const validatedFields = FormSchema.safeParse({
			email: formData.get('email'),
			password: formData.get('password'),
			redirectTo: formData.get('redirectTo'),
			latitude: formData.get('latitude'),
			longitude: formData.get('longitude'),
			ipAddress: formData.get('ipAddress'),
		});

		// Return validation error if any
		if (!validatedFields.success) {
			console.log('Validation error:', validatedFields.error.errors);
			return validatedFields.error.errors[0].message;
		}

		const { email, password, redirectTo, latitude, longitude, ipAddress } =
			validatedFields.data;

		// Print validated data for debugging
		console.log('Authentication attempt with data:', {
			email,
			redirectTo,
			latitude,
			longitude,
			ipAddress,
		});

		// Add additional logging before calling signIn
		console.log('About to call signIn with credentials provider');

		// Match the expected parameters format in the authorize function
		const result = await signIn('credentials', {
			redirect: false, // Handle redirects manually to properly process errors
			email,
			password,
			ipAddress,
			latitude,
			longitude,
		});

		console.log('Sign in result:', result);

		// Handle the result
		if (result?.error) {
			console.log('Sign in error type:', result.error);
			return result.error === 'CredentialsSignin'
				? 'Invalid email or password'
				: `Authentication failed: ${result.error}`;
		}

		// Successful authentication - no error to return
		console.log('Authentication successful');
		return 'success';
	} catch (error) {
		// Print the error for debugging
		console.error('Authentication error object:', error);
		console.error('Authentication error details:', {
			name: (error as Error).name,
			message: (error as Error).message,
			stack: (error as Error).stack,
		});

		// Handle authentication errors
		if (error instanceof AuthError) {
			console.log('Auth error instance confirmed');
			console.log('Auth error type:', error.type);
			console.log('Auth error message:', error.message);

			switch (error.type) {
				case 'CredentialsSignin':
					console.log(
						'CredentialsSignin error - Invalid credentials detected'
					);
					return 'Invalid email or password';
				case 'AccessDenied':
					console.log('AccessDenied error');
					return 'Access denied. Please contact support.';
				default:
					console.log(`Other auth error type: ${error.type}`);
					return `Authentication failed. Please try again.`;
			}
		}

		// For other types of errors
		console.log('Non-AuthError error caught');
		return 'An unexpected error occurred. Please try again.';
	}
}
