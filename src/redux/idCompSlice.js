import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: 0,
};

export const idCompSlice = createSlice({
  name: "idComp",
  initialState,
  reducers: {
    newIdComp: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { newIdComp } = idCompSlice.actions;

export default idCompSlice.reducer;
