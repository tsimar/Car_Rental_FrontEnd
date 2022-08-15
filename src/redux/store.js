import { configureStore } from "@reduxjs/toolkit";
import idCompReducer from "./idCompSlice";
import loginSlice from "./loginSlice";
import newUserSlice from "./newUserSlice";

export default configureStore({
  reducer: {
    idComp: idCompReducer,
    login: loginSlice,
    newUser: newUserSlice,
  },
});
