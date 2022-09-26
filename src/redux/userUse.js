import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: true,
};

export const userUseSlice = createSlice({
  name: "userUse",
  initialState,
  reducers: {
    userOrDeveloper: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { userOrDeveloper } = userUseSlice.actions;

export default userUseSlice.reducer;
