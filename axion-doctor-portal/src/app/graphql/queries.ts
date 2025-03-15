import { gql } from '@apollo/client';

// Individual GraphQL queries for each observation type
export const GET_ESR_OBSERVATIONS = gql`
	query GetESRObservations($patient: String!) {
		observationStack(patient: $patient, code: "ESR") {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_HEMOGLOBIN_OBSERVATIONS = gql`
	query GetHemoglobinObservations($patient: String!) {
		observationStack(patient: $patient, code: "Haemoglobin") {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_TLC_OBSERVATIONS = gql`
	query GetTLCObservations($patient: String!) {
		observationStack(patient: $patient, code: "Total Leukocyte Count") {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_NEUTROPHILS_OBSERVATIONS = gql`
	query GetNeutrophilsObservations($patient: String!) {
		observationStack(patient: $patient, code: "Neutrophils") {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_LYMPHOCYTES_OBSERVATIONS = gql`
	query GetLymphocytesObservations($patient: String!) {
		observationStack(patient: $patient, code: "Lymphocytes") {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_MONOCYTES_OBSERVATIONS = gql`
	query GetMonocytesObservations($patient: String!) {
		observationStack(patient: $patient, code: "Monocytes") {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_EOSINOPHILS_OBSERVATIONS = gql`
	query GetEosinophilsObservations($patient: String!) {
		observationStack(patient: $patient, code: "Eosinophils") {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_BASOPHILS_OBSERVATIONS = gql`
	query GetBasophilsObservations($patient: String!) {
		observationStack(patient: $patient, code: "Basophils") {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_PLATELET_OBSERVATIONS = gql`
	query GetPlateletObservations($patient: String!) {
		observationStack(patient: $patient, code: "Platelet Count") {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_RBC_OBSERVATIONS = gql`
	query GetRBCObservations($patient: String!) {
		observationStack(patient: $patient, code: "Total RBC Count") {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_HBA1C_OBSERVATIONS = gql`
	query GetHbA1cObservations($patient: String!) {
		observationStack(patient: $patient, code: "HbA1c") {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_SERUM_ELECTROLYTES = gql`
	query GetSerumElectrolytes($patient: String!) {
		observationStack(patient: $patient, code: "Serum Electrolytes") {
			Observations {
				timestamp
				value
				display
			}
		}
	}
`;

export const GET_LIPID_PROFILE = gql`
	query GetLipidProfile($patient: String!) {
		observationStack(patient: $patient, code: "Lipid Profile") {
			Observations {
				timestamp
				value
			}
		}
	}
`;
