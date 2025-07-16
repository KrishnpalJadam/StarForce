
import { configureStore } from '@reduxjs/toolkit';
import manpowerReducer from './Slices/manpowerSlice';
import jobApplicationReducer from './Slices/jobApplicationSlice'
import companyReducer from './Slices/companySlice';
const store = configureStore({
  reducer: {
     
    manpower: manpowerReducer,
    jobApplications: jobApplicationReducer,
    companies: companyReducer,
     
  },
});

export default store;
