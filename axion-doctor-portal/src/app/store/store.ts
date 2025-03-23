// store.ts (updated with persistence)
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // Using sessionStorage
import userReducer from './userSlice';
import patientReducer from './patientSlice';

// Configuration for redux-persist
const userPersistConfig = {
	key: 'user',
	storage,
	// You can add blacklist or whitelist if you want to control what gets persisted
	// whitelist: ['state'] // Only persist the state field
};

// Create the persisted reducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
	reducer: {
		user: persistedUserReducer,
		patient: patientReducer,
	},
	// Add this middleware config to avoid serializability errors with persist
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
			},
		}),
});

// Create the persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
