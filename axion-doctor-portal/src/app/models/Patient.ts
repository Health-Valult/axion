interface Prescription {
    id: number,
    name: string,
    dateTime: string,
    indication: Indication,
    content: string,
    treatment: string[],
};

type Indication = "Diagnosis" | "Symptoms" | "Signs";

interface Record {
    date: string,
    hospital: {
        name: string,
        address: string,
        tel: string
    },
    record: string,
    pdf?: Buffer
};

interface Physician {
    name: string,
    designation: string,
    email: string
};

export interface DiagnosedAilment {
    disease: string,
    currentMedication: string,
    progression: { date: string, doctor: Physician, update: string }[] 
};

type Summary = {
    chiefComplaint: string;
    hpi: string;
    pmh: string;
    psh: string;
    medications: string;
    allergies: string;
    fhx: string;
    shx: string;
    vitals: string;
    recentLabs: string;
    immunizations: string;
    ros: string;
  };



export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: "Male" | "Female"
    emergencyContact?: {
      name: string;
      phone: string;
      relation: string;
    };
    summary: {
            title: string,
            description: string
     }[]
    medicalHistory?: Prescription[]; 
    medicalRecords?: Record[];
    diagnosedAilments?: DiagnosedAilment[]
};