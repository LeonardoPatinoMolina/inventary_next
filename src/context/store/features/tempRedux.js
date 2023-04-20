import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idUserSelected: null,//id de usuario seleccionado
  codeProductSelected: null,//codigo de producto seleccionado
};
//estado temporal
//graciass a este esado podemos realizar algunas operaciones especificas
//en las cuales se requiere compartir estado en el abol de componentes
export const tempSlice = createSlice({
  name: "temp",
  initialState,
  reducers: {
    setIdUserSelected: (state, action)=>{
      state.idUserSelected = action.payload;
    },
    setCodeProductSelected: (state, action)=>{
      state.codeProductSelected = action.payload;
    },
  },
});

export const {
  setIdUserSelected,
  setCodeProductSelected,
} = tempSlice.actions;

export default tempSlice.reducer;
