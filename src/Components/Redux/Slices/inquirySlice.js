import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../interceptors/axiosInterceptor'; // Adjust if needed

// ➕ CREATE Inquiry
export const createInquiry = createAsyncThunk(
  'inquiries/create',
  async (formData, thunkAPI) => {
    try {
      const response = await api.post('/inquiries', formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 📥 GET All Inquiries
export const fetchInquiries = createAsyncThunk(
  'inquiries/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/inquiries');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 📤 GET Inquiry by ID
export const fetchInquiryById = createAsyncThunk(
  'inquiries/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/inquiries/${id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✏️ UPDATE Inquiry
export const updateInquiry = createAsyncThunk(
  'inquiries/update',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await api.put(`/inquiries/${id}`, updatedData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ❌ DELETE Inquiry
export const deleteInquiry = createAsyncThunk(
  'inquiries/delete',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/inquiries/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🧠 Inquiry Slice
const inquirySlice = createSlice({
  name: 'inquiries',
  initialState: {
    list: [],
    selectedInquiry: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedInquiry: (state) => {
      state.selectedInquiry = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createInquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(fetchInquiries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(fetchInquiryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInquiryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedInquiry = action.payload;
      })
      .addCase(fetchInquiryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateInquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.map((inquiry) =>
          inquiry.id === action.payload.id ? action.payload : inquiry
        );
      })
      .addCase(updateInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteInquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((inquiry) => inquiry.id !== action.payload);
      })
      .addCase(deleteInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedInquiry } = inquirySlice.actions;

export default inquirySlice.reducer;
