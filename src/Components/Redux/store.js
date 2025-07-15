 // store.js
import { configureStore } from '@reduxjs/toolkit';
import manpowerReducer from './Slices/jobApplicationSlice';

export const store = configureStore({
  reducer: {
    manpower: manpowerReducer,
  },
});
