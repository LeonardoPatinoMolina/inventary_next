import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultarDatosOperador } from "@/services/consultasRequest";

export interface OperatorsState {
  operators: Array<any>;
  chargeReady: boolean;
}

const initialState: OperatorsState = {
  operators: [],
  chargeReady: false,
};

export const fetchOperators = createAsyncThunk('operators/fetch', async ()=>{
  const res = await consultarDatosOperador();
  if(!res.success) return [];
  if(res.success === null) return null;
  return res.data;
});

export const operatorsSlice = createSlice({
  name: "operators",
  
  initialState,
  reducers: {
    add_operator: (state, action) => {
      state.operators.push(action.payload);
    },
    set_chargeReady: (state, action) => {
      state.chargeReady = action.payload;
    },
    set_operators: (state, action) => {
      state.operators = action.payload;
    },
    init: (state, action)=>{
      state.products = action.payload;
      state.chargeReady = true
    },
  },
  extraReducers: (builder)=>{
    builder
    .addCase(fetchOperators.pending, (state, action)=>{
      state.chargeReady = false
    })
    .addCase(fetchOperators.fulfilled, (state, action)=>{
      state.operators = action.payload;
      state.chargeReady = true
    })
    .addCase(fetchOperators.rejected, (state, action)=>{
      state.chargeReady = false
    })
  }
});

export const {
  add_operator,
  set_chargeReady,
  set_operators,
  init,
} = operatorsSlice.actions;

export default operatorsSlice.reducer;