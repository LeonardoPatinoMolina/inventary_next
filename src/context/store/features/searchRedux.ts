import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SearchState {
  filter?: string;
  query?: string;
  page?: number;
}

const initialState: SearchState = {
  filter: 'default',
  page: 1,
  query: '',
};

//estado de filtros
//gracias a este estado podemos administrar los filtros sobre los datos consultados
export const searchSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    set_filter: (state: SearchState, action: PayloadAction<SearchState>) => {
      state.filter = action.payload.filter;
    },
    set_query: (state: SearchState, action: PayloadAction<SearchState>) => {
      state.query = action.payload.query;
    },
    set_page: (state: SearchState, action: PayloadAction<SearchState>) => {
      state.page = action.payload.page;
    },
    reset_search: (state: SearchState, action: PayloadAction<void>)=>{
      state = initialState
    }
  },
});

export const {
  set_filter,
  set_query,
  set_page,
  reset_search
} = searchSlice.actions;