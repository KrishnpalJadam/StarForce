
import { configureStore } from '@reduxjs/toolkit';
import manpowerReducer from './Slices/manpowerSlice';
import jobApplicationReducer from './Slices/jobApplicationSlice'
import companyReducer from './Slices/companySlice';
import inquiryReducer from './Slices/inquirySlice';
const store = configureStore({
  reducer: {
     
    manpower: manpowerReducer,
    jobApplications: jobApplicationReducer,
    companies: companyReducer,
    inquiries: inquiryReducer,
     
  },
});

export default store;
