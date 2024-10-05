import { createSlice } from "@reduxjs/toolkit";
import {signUpThunk} from '../action/signUp'

const signUp = createSlice({
  name: "signUpFunc",
  initialState: {
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(
      signUpThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.signUpThunk = payload;
      }
      }
    )
  }
});
export const {signUpFunc} = signUp.actions;
export default signUp;