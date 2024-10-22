import { createSlice } from "@reduxjs/toolkit";

const signIn = createSlice({
  name: "signInFunc",
  initialState: {
  },
  reducers: {
    
  },
  extraReducers: () => {

  }
});
export const {signInFunc} = signIn.actions;
export default signIn;