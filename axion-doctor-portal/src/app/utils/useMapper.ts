/* eslint-disable */
import { User } from '../models/User';

/**
 * Maps API response data to the User model format required by Redux
 * @param apiResponse The raw API response data
 * @returns Properly formatted User object
 */
export function mapApiResponseToUserModel(apiResponse: any): User {
	// Handle case where API response might be nested
	const userData = apiResponse.userData || apiResponse;

	// Map each field with proper case and naming conventions
	return {
		nic: userData.NIC || '',
		fullName: userData.FullName || '',
		email: userData.Email || '',
		officeHours: userData.OfficeHours || '',
		phone: userData.Telephone || '',
		location: userData.Address || '',
		specialisation: userData.Specialization || '',
		yearsOfExperience: userData.Experience || 0,
		qualifications: (userData.Qualifications || []).map((qual: any) => ({
			degree: qual.degree || '',
			year: qual.year?.toString() || '',
			affliatedInstitute: qual.institution || '',
		})),
		workingHospital: userData.Affiliation || '',
	};
}
