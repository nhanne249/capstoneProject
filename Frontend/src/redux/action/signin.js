import { createAsyncThunk } from "@reduxjs/toolkit";
import signIn from '../api/signIn'

export const signInThunk = createAsyncThunk(
    'signIn',
    async (data) => {
        const res = await signIn(data)
        return res
    }
)