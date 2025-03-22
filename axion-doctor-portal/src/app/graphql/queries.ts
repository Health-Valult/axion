import { gql } from '@apollo/client';

// Individual GraphQL queries for each observation type
export const GET_ESR_OBSERVATIONS = gql`
	query GetESRObservations {
		observationStack {
			Observations {
				timestamp
				value
			}
		}
	}
`;

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

export const GET_TLC_OBSERVATIONS = gql`
	query GetTLCObservations {
		observationStack {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_NEUTROPHILS_OBSERVATIONS = gql`
	query GetNeutrophilsObservations {
		observationStack {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_LYMPHOCYTES_OBSERVATIONS = gql`
	query GetLymphocytesObservations {
		observationStack {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_MONOCYTES_OBSERVATIONS = gql`
	query GetMonocytesObservations {
		observationStack {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_EOSINOPHILS_OBSERVATIONS = gql`
	query GetEosinophilsObservations {
		observationStack {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_BASOPHILS_OBSERVATIONS = gql`
	query GetBasophilsObservations {
		observationStack {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_PLATELET_OBSERVATIONS = gql`
	query GetPlateletObservations {
		observationStack {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_RBC_OBSERVATIONS = gql`
	query GetRBCObservations {
		observationStack {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_HBA1C_OBSERVATIONS = gql`
	query GetHbA1cObservations {
		observationStack {
			Observations {
				timestamp
				value
			}
		}
	}
`;

export const GET_SERUM_ELECTROLYTES = gql`
	query GetSerumElectrolytes {
		observationStack {
			Observations {
				timestamp
				value
				display
			}
		}
	}
`;

export const GET_LIPID_PROFILE = gql`
	query GetLipidProfile {
		observationStack {
			Observations {
				timestamp
				value
			}
		}
	}
`;
