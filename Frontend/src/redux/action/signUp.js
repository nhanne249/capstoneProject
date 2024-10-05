import { createAsyncThunk } from "@reduxjs/toolkit";
import signUp from '../api/signUp';

export const signUpThunk = createAsyncThunk(
    'signUp',
    async (data) => {
        const res = await signUp(data)
        return res
    }
)