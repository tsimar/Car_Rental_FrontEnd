import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    newLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});
export const { newLogin } = loginSlice.actions;

export default loginSlice.reducer;
