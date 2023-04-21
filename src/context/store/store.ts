import { configureStore } from "@reduxjs/toolkit";
import { apiOperators } from "../api/apiOperators";
import { apiProducts } from "../api/apiProducts";
import { apiRecords } from "../api/apiRecords";
import filterReducer from "./features/filterRedux";
import loginReducer from "./features/loginRedux";
import tempReducer from "./features/tempRedux";


export const store = configureStore({
  reducer: {
    [apiOperators.reducerPath]: apiOperators.reducer,
    [apiProducts.reducerPath]: apiProducts.reducer,
    [apiRecords.reducerPath]: apiRecords.reducer,
    filter: filterReducer,
    login: loginReducer,
    temp: tempReducer,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(
    apiOperators.middleware, 
    apiProducts.middleware,
    apiRecords.middleware
  )
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

