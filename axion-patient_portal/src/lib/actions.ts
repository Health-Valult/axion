// 'use server';
//
// import { AuthError } from 'next-auth';
// import { signIn } from '../../auth';
//
// export async function authenticate(
//     prevState: string | undefined,
//     formData: FormData
// ) {
//     try {
//         await signIn('credentials', {
//             email: formData.get('email') as string,
//             password: formData.get('password') as string,
//             redirectTo: formData.get('redirectTo') as string,
//         });
//     } catch (error) {
//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case 'CredentialsSignin':
//                     return 'Invalid credentials. Please try again.';
//                 default:
//                     return 'Authentication failed. Please try again.';
//             }
//         }
//         throw error;
//     }
// }