/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/User';

// Define the User type with state wrapper
type UserState = { state: null } | { state: User };

// Initial state following your structure
const initialState: UserState = { state: null };

const userSlice = createSlice({
	name: 'user',
	initialState: { state: null } satisfies UserState as UserState,
	reducers: {
		loginDoctor: (state, action: PayloadAction<UserState>) => {
			return action.payload;
		},
		editProfile: (state, action: PayloadAction<UserState>) => {
			if ('state' in state && state.state) {
				Object.assign(state.state, action.payload.state);
			}
		},
		logoutDoctor: (): UserState => ({ state: null }),
	},
});

export const { loginDoctor, editProfile, logoutDoctor } = userSlice.actions;
export default userSlice.reducer;
