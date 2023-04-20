import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultarDatosRegistro } from "../../../services/consultasRequest";

const initialState = {
  records: [],
  recordsFilter: [],
  chargeReady: false,
};

export const fetchRecords = createAsyncThunk('records/fetch', async ()=>{
  const res = await consultarDatosRegistro();
  if(!res.success) return [];
  if(res.success === null) return null;
  return res.data;
});

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    add_record: (state, action) => {
      state.records.push(action.payload);
    },
    set_chargeReady: (state, action) => {
      state.chargeReady = action.payload;
    },
    set_records: (state, action) => {
      state.records = action.payload;
    },
    set_records_filter: (state, action) => {
      state.recordsFilter = action.payload;
    },
    init: (state, action)=>{
      state.products = action.payload;
      state.chargeReady = true
    },
  },
  extraReducers: (builder)=>{
    builder
    .addCase(fetchRecords.pending, (state, action)=>{
      state.chargeReady = false
    })
    .addCase(fetchRecords.fulfilled, (state, action)=>{
      state.records = action.payload;
      state.recordsFilter = action.payload;
      state.chargeReady = true
    })
    .addCase(fetchRecords.rejected, (state, action)=>{
      state.chargeReady = false
    })
  }
});

export const {
  add_record,
  set_chargeReady,
  set_records,
  set_records_filter,
  init,
} = recordsSlice.actions;

export default recordsSlice.reducer;
