import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import patientReducer from "./patientSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        patient: patientReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;