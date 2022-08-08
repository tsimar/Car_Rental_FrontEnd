import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idComp: 0,
};

export const idCompSlice = createSlice({
  name: "idComp",
  initialState,
  reducers: {
    newIdComp: (state, action) => {
      state.idComp = action.payload;
    },
  },
});

export const { newIdComp } = idCompSlice.actions;

export default idCompSlice.reducer;
