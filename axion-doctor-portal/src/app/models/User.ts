interface examinedPatient {
    id: string,
    firstName: string,
    lastName: string,
    dateCheckedUp: string,
    briefSummary: string,
    checkUpSummary: string
}

export interface User {
    id: string;
    nic: string,
    medicalLicenseNo: string
    firstName: string;
    lastName: string;
    email: string;
    officeHours: string;
    phone: string;
    location: string,
    gender: "Male" | "Female"
    designation: string,
    specialisation: string
    yearsOfExperience: number,
    qualifications: { qualification: string, date: string, affliatedInstitute: string }[]
    consultationFee: number,
    workingHospital: {
        name: string,
        address: string,
        tel: string
    }
    dateOfBirth: string;
    image: string,
    education: {
        degree: string;
        institution: string;
        year: string;
        description?: string;
    }
    recentPatients?: examinedPatient[],
    notes: string
};