import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  loginUser: 'visit',
  idUser: null,

};
//estado referente login:
//gracias a este estado podemos decirle a la App el estado actual de la sesión de usuario
export const loginSlice = createSlice({
  name: "login",
  
  initialState,
  reducers: {
    set_isLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    set_loginUser: (state, action) => {
      state.loginUser = action.payload;
    },
    set_idUser: (state, action) => {
      state.idUser = action.payload;
    },
    init: (state, action) =>{
      state.loginUser =  action.payload.loginUser;
      state.idUser = action.payload.idUser;
      state.isLogin = action.payload.isLogin;
    },
  },
});

export const {
  set_isLogin,
  set_loginUser,
  set_idUser,
  init
} = loginSlice.actions;

export default loginSlice.reducer;
