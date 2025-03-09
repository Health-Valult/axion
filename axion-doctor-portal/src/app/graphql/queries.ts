import { gql, useQuery } from '@apollo/client';

// Individual GraphQL queries for each observation type
export const GET_ESR_OBSERVATIONS = gql`
	query GetESRObservations($patient: String!) {
		observationStack(patient: $patient, code: "ESR") {
			observations {
				id
				date
				value {
					wintrobe
					westergren
				}
				unit
			}
		}
	}
`;

export const GET_HEMOGLOBIN_OBSERVATIONS = gql`
	query GetHemoglobinObservations($patient: String!) {
		observationStack(patient: $patient, code: "Haemoglobin") {
			observations {
				id
				date
				value {
					number
				}
				unit
			}
		}
	}
`;

export const GET_TLC_OBSERVATIONS = gql`
	query GetTLCObservations($patient: String!) {
		observationStack(patient: $patient, code: "Total Leukocyte Count") {
			observations {
				id
				date
				value {
					number
				}
				unit
			}
		}
	}
`;

export const GET_NEUTROPHILS_OBSERVATIONS = gql`
	query GetNeutrophilsObservations($patient: String!) {
		observationStack(patient: $patient, code: "Neutrophils") {
			observations {
				id
				date
				value {
					number
				}
				unit
			}
		}
	}
`;

export const GET_LYMPHOCYTES_OBSERVATIONS = gql`
	query GetLymphocytesObservations($patient: String!) {
		observationStack(patient: $patient, code: "Lymphocytes") {
			observations {
				id
				date
				value {
					number
				}
				unit
			}
		}
	}
`;

export const GET_MONOCYTES_OBSERVATIONS = gql`
	query GetMonocytesObservations($patient: String!) {
		observationStack(patient: $patient, code: "Monocytes") {
			observations {
				id
				date
				value {
					number
				}
				unit
			}
		}
	}
`;

export const GET_EOSINOPHILS_OBSERVATIONS = gql`
	query GetEosinophilsObservations($patient: String!) {
		observationStack(patient: $patient, code: "Eosinophils") {
			observations {
				id
				date
				value {
					number
				}
				unit
			}
		}
	}
`;

export const GET_BASOPHILS_OBSERVATIONS = gql`
	query GetBasophilsObservations($patient: String!) {
		observationStack(patient: $patient, code: "Basophils") {
			observations {
				id
				date
				value {
					number
				}
				unit
			}
		}
	}
`;

export const GET_PLATELET_OBSERVATIONS = gql`
	query GetPlateletObservations($patient: String!) {
		observationStack(patient: $patient, code: "Platelet Count") {
			observations {
				id
				date
				value {
					number
				}
				unit
			}
		}
	}
`;

export const GET_RBC_OBSERVATIONS = gql`
	query GetRBCObservations($patient: String!) {
		observationStack(patient: $patient, code: "Total RBC Count") {
			observations {
				id
				date
				value {
					number
				}
				unit
			}
		}
	}
`;

export const GET_HBA1C_OBSERVATIONS = gql`
	query GetHbA1cObservations($patient: String!) {
		observationStack(patient: $patient, code: "HbA1c") {
			observations {
				id
				date
				value {
					number
				}
				unit
			}
		}
	}
`;

export const GET_SERUM_ELECTROLYTES = gql`
	query GetSerumElectrolytes($patient: String!) {
		observationStack(patient: $patient, code: "Serum Electrolytes") {
			observations {
				id
				date
				subType
				value {
					number
				}
				unit
			}
		}
	}
`;

export const GET_LIPID_PROFILE = gql`
	query GetLipidProfile($patient: String!) {
		observationStack(patient: $patient, code: "Lipid Profile") {
			observations {
				id
				date
				value {
					totalCholesterol
					LDL
					HDL
					triglycerides
					nonHDL
					VLDL
				}
				unit
			}
		}
	}
`;
