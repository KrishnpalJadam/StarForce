 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../interceptors/axiosInterceptor'; // adjust path as needed

// 1️⃣ Create Job Application
export const createJobApplication = createAsyncThunk(
  'jobApplication/create',
  async (formData, thunkAPI) => {
    try {
      const response = await api.post('/jobApplication', formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2️⃣ Fetch All Applications
export const fetchAllApplications = createAsyncThunk(
  'jobApplication/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/jobApplication');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3️⃣ Get Application by ID
export const fetchApplicationById = createAsyncThunk(
  'jobApplication/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/jobApplication/${id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 4️⃣ Update Application
export const updateJobApplication = createAsyncThunk(
  'jobApplication/update',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await api.put(`/jobApplication/${id}`, updatedData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 5️⃣ Delete Application
export const deleteJobApplication = createAsyncThunk(
  'jobApplication/delete',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/jobApplication/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 6️⃣ Update Status Only
export const updateApplicationStatus = createAsyncThunk(
  'jobApplication/updateStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await api.patch(`/jobApplication/status/${id}`, { status });
      return { id, status };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🧠 Slice
const jobApplicationSlice = createSlice({
  name: 'jobApplication',
  initialState: {
    applications: [],
    selectedApplication: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedApplication: (state) => {
      state.selectedApplication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createJobApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJobApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload);
      })
      .addCase(createJobApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(fetchAllApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchAllApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(fetchApplicationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApplicationById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedApplication = action.payload;
      })
      .addCase(fetchApplicationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateJobApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJobApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = state.applications.map((app) =>
          app.id === action.payload.id ? action.payload : app
        );
      })
      .addCase(updateJobApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteJobApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJobApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = state.applications.filter((app) => app.id !== action.payload);
      })
      .addCase(deleteJobApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Status
      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { id, status } = action.payload;
        state.applications = state.applications.map((app) =>
          app.id === id ? { ...app, status } : app
        );
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedApplication } = jobApplicationSlice.actions;

export default jobApplicationSlice.reducer;
