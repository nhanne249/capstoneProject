import { createSlice } from "@reduxjs/toolkit";
import {signinThunk} from '../action/signin'

const signin = createSlice({
  name: "signinFunc",
  initialState: {
    login:[],
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(
      signinThunk.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.signinThunk = payload;
      }
      }
    )
  }
});
export const {signinFunc} = signin.actions;
export default signin;