import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsFilter: [],
  recordsFilter: [],
  filterElection: 'default',
  chargeReady: false,
};

//estado de filtros
//gracias a este estado podemos administrar los filtros sobre los datos consultados
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    set_chargeReady: (state, action) => {
      state.chargeReady = action.payload;
    },
    set_products_filter: (state, action) => {
      state.products = action.payload;
    },
    set_records_filter: (state, action) => {
      state.records = action.payload;
    },
    set_filterElection: (state, action)=>{
      state.filterElection = action.payload;
    },
  },
});

export const {
  set_chargeReady,
  set_products_filter,
  set_records_filter,
  set_filterElection,
} = filterSlice.actions;

export default filterSlice.reducer;
