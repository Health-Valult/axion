

export type Appointment = {
    name: string;
    date: string;
    time: string;
  };

  export interface DiagnosisHistory {
    date: string;
    diagnosis_update: string;
    doctor: string;
  }
  
  export interface DiagnosisRecord {
    disease: string;
    medication: string;
    history: DiagnosisHistory[];
  }