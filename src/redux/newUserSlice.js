import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newUser: false,
};

export const newUserSlice = createSlice({
  name: "newUser",
  initialState,
  reducers: {
    newUser: (state, action) => {
      state.newUser = action.payload;
    },
  },
});
export const { newUser } = newUserSlice.actions;

export default newUserSlice.reducer;
