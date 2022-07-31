import { configureStore } from "@reduxjs/toolkit";
import idCompReducer from "./idCompSlice";
// import idUserReducer from "./idUserSlice";

export default configureStore({
  reducer: {
    idComp: idCompReducer,
    // indexIdUser: idUserReducer,
  },
});
