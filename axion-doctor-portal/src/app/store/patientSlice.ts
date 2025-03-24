/* eslint-disable */
import { Patient } from '../models/Patient';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Patient type
type PatientState = { state: null } | { state: Patient };

// Define the initial state
const initialState: PatientState = { state: null };

const patientSlice = createSlice({
	name: 'patient',
	initialState: { state: null } satisfies PatientState as PatientState,
	reducers: {
		selectPatient: (
			state,
			action: PayloadAction<PatientState>
		): PatientState => {
			return action.payload;
		},
		clearPatient: (): PatientState => ({ state: null }),
	},
});

export const { selectPatient, clearPatient } = patientSlice.actions;
export default patientSlice.reducer;
