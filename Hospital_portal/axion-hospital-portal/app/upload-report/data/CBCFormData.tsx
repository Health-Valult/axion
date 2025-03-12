export interface CBCFormData {
    patientName: string;
    referredBy: string;
    ageSex: string;
    investigations: string;
    hemoglobin: string;
    totalLeukocyteCount: string;
    neutrophils: string;
    lymphocytes: string;
    eosinophils: string;
    monocytes: string;
    basophils: string;
    plateletCount: string;
    totalRBCCount: string;
    hematocrit: string;
    meanCorpuscularVolume: string;
    meanCellHemoglobin: string;
    meanCellHemoglobinConcentration: string;
    date?: string; // Making date optional here, but will be set when needed
  }
  