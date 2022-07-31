import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idComp: 0,
};

export const idCompSlice = createSlice({
  name: "idComp",
  initialState,
  reducers: {
    newIdComp: (state, action) => {
      // const newId = {
      //   title: action.payload.title,
      // };
      state.idComp = action.payload;
    },
  },
});

export const { newIdComp } = idCompSlice.actions;

export default idCompSlice.reducer;
