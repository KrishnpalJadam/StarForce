import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../interceptors/axiosInterceptor'; // Adjust path as needed

// 🔁 Create a Manpower Request
export const createManpowerRequest = createAsyncThunk(
  'manpower/create',
  async (formData, thunkAPI) => {
    try {
      const response = await api.post('/manpower', formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 📥 Get All Manpower Requests
export const fetchManpowerRequests = createAsyncThunk(
  'manpower/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/manpower');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 📥 Get Single Manpower Request
export const fetchManpowerById = createAsyncThunk(
  'manpower/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/manpower-request/${id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔄 Update Manpower Request
export const updateManpowerRequest = createAsyncThunk(
  'manpower/update',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await api.put(`/manpower-request/${id}`, updatedData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🗑 Delete Manpower Request
export const deleteManpowerRequest = createAsyncThunk(
  'manpower/delete',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/manpower/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🧠 Slice
const manpowerSlice = createSlice({
  name: 'manpower',
  initialState: {
    requests: [],
    selectedRequest: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedRequest: (state) => {
      state.selectedRequest = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createManpowerRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createManpowerRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload);
      })
      .addCase(createManpowerRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(fetchManpowerRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchManpowerRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchManpowerRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(fetchManpowerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchManpowerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRequest = action.payload;
      })
      .addCase(fetchManpowerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateManpowerRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateManpowerRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = state.requests.map((req) =>
          req.id === action.payload.id ? action.payload : req
        );
      })
      .addCase(updateManpowerRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteManpowerRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteManpowerRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = state.requests.filter((req) => req.id !== action.payload);
      })
      .addCase(deleteManpowerRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedRequest } = manpowerSlice.actions;

export default manpowerSlice.reducer;
