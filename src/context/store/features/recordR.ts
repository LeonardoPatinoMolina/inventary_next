import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProductRState {
  records: any[];
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  page?: number;
  totalPages?: number;
  total?: number;
}
type TfetchRecordByArgs = {
  query?: string;
  page?: number;
  filter?: string;
}

const initialState: ProductRState = {
  records: [],
};

export const fetchRecordBy = createAsyncThunk<any, TfetchRecordByArgs>('productR/fetch', async (args)=>{
  const response = await fetch('http://localhost:3000/api/record/all');
  return response.json();
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
      state.records = action.payload.data
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