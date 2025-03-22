interface Physician {
	name: string;
	designation: string;
	email: string;
}

export interface DiagnosedAilment {
	disease: string;
	currentMedication: string;
	progression: { date: string; doctor: Physician; update: string }[];
}

type Summary = {
	title: string;
	description: string;
}[];

// export interface Patient {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     dateOfBirth: string;
//     gender: "Male" | "Female"
//     emergencyContact?: {
//       name: string;
//       phone: string;
//       relation: string;
//     };
//     summary: {
//             title: string,
//             description: string
//      }[]
//     medicalHistory?: Prescription[];
//     medicalRecords?: Record[];
//     diagnosedAilments?: DiagnosedAilment[]
// };

export interface Patient {
	id: string;
	firstName: string;
	lastName: string;
	nic: string;
	name: string;
	dateOfBirth: string;
	gender: string;
	summary: Summary;
}
