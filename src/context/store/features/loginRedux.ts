import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  isLogin: boolean;
  loginUser: "visit" | "operator"|"admin";
  idUser?: number;
}

const initialState: LoginState = {
  isLogin: false,
  loginUser: "visit",
};
//estado referente login:
//gracias a este estado podemos decirle a la App el estado actual de la sesión de usuario
export const loginSlice = createSlice({
  name: "login",
  
  initialState,
  reducers: {
    set_isLogin: (state: LoginState, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    set_loginUser: (state: LoginState, action: PayloadAction<"visit" | "operator"|"admin">) => {
      state.loginUser = action.payload;
    },
    set_idUser: (state: LoginState, action: PayloadAction<number>) => {
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
