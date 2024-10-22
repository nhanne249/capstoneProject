import { createSlice } from "@reduxjs/toolkit";

const signUp = createSlice({
  name: "signUpFunc",
  initialState: {
  },
  reducers: {
    
  },
  extraReducers: () => {
  }
});
export const {signUpFunc} = signUp.actions;
export default signUp;