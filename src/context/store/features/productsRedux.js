import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultarDatosProducto } from "../../../services/consultasRequest";

const initialState = {
  products: [],
  productsFilter: [],
  chargeReady: false,
};

export const fetchProducts = createAsyncThunk('products/fetch', async ()=>{
  const res = await consultarDatosProducto();
  if(!res.success) return [];
  if(res.success === null) return null;
  return res.data;
});

export const productsSlice = createSlice({
  name: "products",
  
  initialState,
  reducers: {
    add_product: (state, action) => {
      state.products.push(action.payload);
    },
    set_chargeReady: (state, action) => {
      state.chargeReady = action.payload;
    },
    set_products: (state, action) => {
      state.products = action.payload;
    },
    set_products_filter: (state, action) => {
      state.productsFilter = action.payload;
    },
    init: async (state, action)=>{
      state.products = action.payload;
      state.chargeReady = true
    },
  },
  extraReducers: (builder)=>{
    builder
    .addCase(fetchProducts.pending, (state, action)=>{
      state.chargeReady = false
    })
    .addCase(fetchProducts.fulfilled, (state, action)=>{
      state.products = action.payload;
      state.productsFilter = action.payload;
      state.chargeReady = true
    })
    .addCase(fetchProducts.rejected, (state, action)=>{
      state.chargeReady = false
    })
  }
});

export const {
  add_product,
  set_chargeReady,
  set_products,
  set_products_filter,
  init,
} = productsSlice.actions;

export default productsSlice.reducer;
