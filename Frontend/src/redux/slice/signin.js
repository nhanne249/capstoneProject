import { createSlice } from "@reduxjs/toolkit";
import {signinThunk} from '../action/signin'

const signin = createSlice({
  name: "signinFunc",
  initialState: {
    // isSignin: false,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(
      signinThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          // state.signinThunk = payload;
          if(payload?.message == "Sign in Successfully")
          state.isSignin = true;
      }
      }
    )
  }
});
export const {signinFunc} = signin.actions;
export default signin;