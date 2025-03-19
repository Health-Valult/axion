export interface Patient {
    id: string;
    imageUrl: string | null;
    nationalId: string;
    name: string;
    age: number;
    gender: string;
    lastVisit: string;
    registrationDate?: string;
    birthdate?: string;
    email?: string;
    phone?: string;
    location?: string;
    medicalHistory?: {
      bloodGroup?: string;
      condition?: string;
      allergies?: string[];
    };
    labReports?: {
      id: string;
      name: string;
      date: string;
      type: string;
    }[];
  }
  