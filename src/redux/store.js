import { configureStore } from "@reduxjs/toolkit";
import idCompReducer from "./idCompSlice";
import loginSlice from "./loginSlice";
import newUserSlice from "./newUserSlice";
import userUseSlice from "./userUse";

export default configureStore({
  reducer: {
    idComp: idCompReducer,
    login: loginSlice,
    newUser: newUserSlice,
    userUse: userUseSlice,
  },
});
