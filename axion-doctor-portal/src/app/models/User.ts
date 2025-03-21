interface examinedPatient {
	id: string;
	firstName: string;
	lastName: string;
	dateCheckedUp: string;
	briefSummary: string;
	checkUpSummary: string;
}

interface Note {
	id: string;
	content: string;
}

export interface User {
	id: string;
	nic: string;
	age: number;
	medicalLicenseNo: string;
	fullName: string;
	email: string;
	officeHours: string;
	phone: string;
	location: string;
	gender: 'Male' | 'Female';
	specialisation: string;
	yearsOfExperience: number;
	slmc: string;
	qualifications: {
		degree: string;
		year: string;
		affliatedInstitute: string;
	}[];
	consultationFee: number;
	workingHospital: string;
	image: string;
	recentPatients?: examinedPatient[];
	notes: Note[];
}
