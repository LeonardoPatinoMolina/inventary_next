import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface ProductRState {
  products: any[];
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  page?: number;
  totalPages?: number;
  total?: number;
}

const initialState: ProductRState = {
  products: [],
};

type TfetchProductByArgs = {
  query?: string;
  page?: number;
  filter?: string;
}

export const fetchProductBy = createAsyncThunk<any,TfetchProductByArgs>('productR/fetch', async (args)=>{
  const response = await fetch(`http://localhost:3000/api/product/by?page=${args?.page}&filter=${args?.filter}&query=${args?.query}`);
  const resJson = await response.json();
  return resJson;
});

export const productRSlice = createSlice({
  name: 'productR',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(fetchProductBy.pending,(state, action)=>{
      state.isLoading = true;
    })
    .addCase(fetchProductBy.fulfilled, (state, action)=>{
      state.products = action.payload.data
      state.page = action.payload.page
      state.totalPages = action.payload.totalPages
      state.total = action.payload.total
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    })
    .addCase(fetchProductBy.rejected,(state, action)=>{
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    })
  }
})