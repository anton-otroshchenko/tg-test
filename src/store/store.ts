import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import habitsReducer from './habitsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    habits: habitsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch