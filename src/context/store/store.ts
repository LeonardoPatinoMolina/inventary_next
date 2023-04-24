import { configureStore } from "@reduxjs/toolkit";
import { apiOperators } from "../api/apiOperators";
import { searchSlice } from "./features/searchRedux";
import loginReducer from "./features/loginRedux";
import tempReducer from "./features/tempRedux";
import headernavReducer from "./features/headernav";
import { productRSlice } from "./features/productR";
import { recordRSlice } from "./features/recordR";


export const store = configureStore({
  reducer: {
    [apiOperators.reducerPath]: apiOperators.reducer,
    search: searchSlice.reducer,
    login: loginReducer,
    temp: tempReducer,
    headernav: headernavReducer,
    productsR: productRSlice.reducer,
    recordR: recordRSlice.reducer,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(
    apiOperators.middleware, 
  )
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

