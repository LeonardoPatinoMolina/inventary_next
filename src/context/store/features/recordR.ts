import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface ProductRState {
  records?: any[];
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

const initialState: ProductRState = {
  records: [],
};

export const fetchRecordBy = createAsyncThunk('productR/fetch', async ()=>{
  const response = await fetch('http://localhost:3000/api/products');
  const resJson = await response.json();
  return resJson;
});

export const recordRSlice = createSlice({
  name: 'recordR',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(fetchRecordBy.pending,(state, action)=>{
      state.isLoading = true;
    })
    .addCase(fetchRecordBy.fulfilled, (state, action)=>{
      state.records = action.payload
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    })
    .addCase(fetchRecordBy.rejected,(state, action)=>{
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    })
  }
})