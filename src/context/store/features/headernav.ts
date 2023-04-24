import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface HeadernavState {
  active: string;
}
const initialState = {
  active: "icon"
}

export const headernavRedux = createSlice({
  name: "headernav",
  initialState,
  reducers: {
    setActive: (state: HeadernavState, action: PayloadAction<HeadernavState>)=>{
      state.active = action.payload.active
    }
  }
});

export const {setActive} = headernavRedux.actions;

export default headernavRedux.reducer;