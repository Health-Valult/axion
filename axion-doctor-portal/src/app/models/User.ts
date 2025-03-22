// interface examinedPatient {
// 	id: string;
// 	firstName: string;
// 	lastName: string;
// 	dateCheckedUp: string;
// 	briefSummary: string;
// 	checkUpSummary: string;
// }

// interface Note {
// 	id: string;
// 	content: string;
// }

export interface User {
	nic: string;
	fullName: string;
	email: string;
	officeHours: string;
	phone: string;
	location: string;
	specialisation: string;
	yearsOfExperience: number;
	qualifications: {
		degree: string;
		year: string;
		affliatedInstitute: string;
	}[];
	workingHospital: string;
}
