import { gql } from '@apollo/client';

// ESR - LOINC code: 30341-2 (Erythrocyte sedimentation rate)
export const GET_ESR_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "30341-2") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Hemoglobin - LOINC code: 718-7 (Hemoglobin)
export const GET_HEMOGLOBIN_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "718-7") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Total Leukocyte Count (TLC) - LOINC code: 6690-2 (White blood cell count)
export const GET_TLC_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "6690-2") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Neutrophils - LOINC code: 751-8 (Neutrophils)
export const GET_NEUTROPHILS_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "751-8") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Lymphocytes - LOINC code: 731-0 (Lymphocytes)
export const GET_LYMPHOCYTES_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "731-0") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Monocytes - LOINC code: 742-7 (Monocytes)
export const GET_MONOCYTES_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "742-7") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Eosinophils - LOINC code: 711-2 (Eosinophils)
export const GET_EOSINOPHILS_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "711-2") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Basophils - LOINC code: 704-7 (Basophils)
export const GET_BASOPHILS_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "704-7") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Platelets - LOINC code: 777-3 (Platelets)
export const GET_PLATELET_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "777-3") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Red Blood Cells (RBC) - LOINC code: 789-8 (RBC)
export const GET_RBC_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "789-8") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Hematocrit Value (HCT) - LOINC code: 4544-3 (Hematocrit)
export const GET_HCT_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "4544-3") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

export const GET_CRP_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "1988-5") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Mean Corpuscular Volume (MCV) - LOINC code: 787-2 (MCV)
export const GET_MCV_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "787-2") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Mean Cell Hemoglobin (MCH) - LOINC code: 785-6 (MCH)
export const GET_MCH_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "785-6") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Mean Cell Hemoglobin Concentration (MCHC) - LOINC code: 786-4 (MCHC)
export const GET_MCHC_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "786-4") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// GraphQL query for Fasting Blood Glucose observations
// LOINC code 1558-6 is for Fasting glucose [Mass/volume] in Serum or Plasma
export const GET_FBG_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "1558-6") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// HbA1c - LOINC code: 4548-4 (Hemoglobin A1c)
export const GET_HBA1C_OBSERVATIONS = gql`
	query ObservationGraph {
		observationGraph(code: "4548-4") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Serum Electrolytes - Combined query for sodium, chloride, and potassium
export const GET_SERUM_ELECTROLYTES = gql`
	query GetSerumElectrolytes {
		sodium: observationGraph(code: "2951-2") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		chloride: observationGraph(code: "2075-0") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		potassium: observationGraph(code: "2823-3") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

// Lipid Profile - Combined query for all lipid components
export const GET_LIPID_PROFILE = gql`
	query GetLipidProfile {
		totalCholesterol: observationGraph(code: "2093-3") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		ldl: observationGraph(code: "13457-7") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		hdl: observationGraph(code: "2085-9") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		triglycerides: observationGraph(code: "2571-8") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		nonHdl: observationGraph(code: "43396-1") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		vldl: observationGraph(code: "13458-5") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;

export const GET_URINALYSIS_PROFILE = gql`
	query GetUrinalysisProfile {
		color: observationGraph(code: "5778-1") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		transparency: observationGraph(code: "5767-4") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		specificGravity: observationGraph(code: "5811-0") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		pH: observationGraph(code: "5803-7") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		protein: observationGraph(code: "5804-5") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		glucose: observationGraph(code: "5792-2") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		ketones: observationGraph(code: "5797-1") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		bilirubin: observationGraph(code: "5770-8") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		rbc: observationGraph(code: "13945-1") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		wbc: observationGraph(code: "5821-9") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		epithelialCells: observationGraph(code: "11277-1") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		casts: observationGraph(code: "5769-0") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		crystals: observationGraph(code: "5784-9") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
		bacteria: observationGraph(code: "25145-4") {
			Observations {
				display
				unit
				value
				timestamp
			}
		}
	}
`;
