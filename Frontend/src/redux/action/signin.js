import { createAsyncThunk } from "@reduxjs/toolkit";
import signin from '../api/signin'

export const signinThunk = createAsyncThunk(
    'signin',
    async (data) => {
        const res = await signin(data)
        return res
    }
)