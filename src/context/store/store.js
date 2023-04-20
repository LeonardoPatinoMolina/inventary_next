import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./features/productsRedux";
import recordsReducer from "./features/recordsRedux";
import operatorsReducer from "./features/operatorsRedux";
import filterReducer from "./features/filterRedux";
import loginReducer from "./features/loginRedux";
import tempReducer from "./features/tempRedux";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    records: recordsReducer,
    operators: operatorsReducer,
    filter: filterReducer,
    login: loginReducer,
    temp: tempReducer,
  },
});

