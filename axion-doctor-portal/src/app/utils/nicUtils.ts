/**
 * Determines gender from Sri Lankan National Identity Card (NIC) number
 *
 * For a 12-digit NIC number: Examines the 6th, 7th, and 8th digits
 * For a 9-digit (old) NIC number: Examines the 3rd, 4th, and 5th digits
 *
 * If the value is >= 500, the person is female
 * If the value is < 500, the person is male
 *
 * @param nic - The NIC number of the patient
 * @returns "Male" or "Female" based on the NIC number
 */
export function determineGenderFromNIC(nic: string): string {
	// Remove any whitespace and ensure uppercase for 'v' handling
	const cleanNIC = nic.trim().toUpperCase();

	// Handle both old (9-digit) and new (12-digit) NIC formats
	let genderDigits: string;

	if (cleanNIC.length === 12) {
		// New NIC format (12 digits): YYYYMMDDXXXX
		genderDigits = cleanNIC.substring(5, 8);
	} else if (cleanNIC.length === 10 && cleanNIC.endsWith('V')) {
		// Old NIC format with 'V' at the end: YYMMDDXXXV
		genderDigits = cleanNIC.substring(2, 5);
	} else if (cleanNIC.length === 9) {
		// Old NIC format without 'V': YYMMDDXXX
		genderDigits = cleanNIC.substring(2, 5);
	} else {
		// Invalid NIC format
		console.error('Invalid NIC format:', nic);
		return 'Unknown';
	}

	// Parse digits to determine gender
	const dayValue = parseInt(genderDigits, 10);

	// Determine gender based on the value
	if (dayValue >= 500) {
		return 'Female';
	} else {
		return 'Male';
	}
}
