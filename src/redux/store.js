import { configureStore } from "@reduxjs/toolkit";
import idCompReducer from "./idCompSlice";
import loginSlice from "./loginSlice";

export default configureStore({
  reducer: {
    idComp: idCompReducer,
    login: loginSlice,
  },
});
