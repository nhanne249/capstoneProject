import { createSlice } from "@reduxjs/toolkit";
import {signInThunk} from '../action/signIn'

const signIn = createSlice({
  name: "signInFunc",
  initialState: {
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(
      signInThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          if(payload?.message == "Sign in Successfully")
          state.issignIn = true;
      }
      }
    )
  }
});
export const {signInFunc} = signIn.actions;
export default signIn;