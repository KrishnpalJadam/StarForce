 // src/Components/Redux/store.js or src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
// import memberReducer from './slices/memberSlice';
import manpowerReducer from './Slices/jobApplicationSlice'; // add more slices if needed

const store = configureStore({
  reducer: {
    // members: memberReducer,
    manpower: manpowerReducer,
    // other slices...
  },
});

// ✅ Default export for use in main.jsx
export default store;
