
import { configureStore } from '@reduxjs/toolkit';
import manpowerReducer from './Slices/manpowerSlice';
import jobApplicationReducer from './Slices/jobApplicationSlice'

const store = configureStore({
  reducer: {
     
    manpower: manpowerReducer,
    jobApplications: jobApplicationReducer,
     
  },
});

export default store;
