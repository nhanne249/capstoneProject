import { createAsyncThunk } from "@reduxjs/toolkit";
import admin from '../api/admin'

const { getAllUsersByAdmin, getUser } = admin;

export const getAllUsersByAdminThunk = createAsyncThunk(
    'getAllUsersByAdmin',
    async (data) => {
        const res = await getAllUsersByAdmin(data);
        return res;
    }
)
export const getUserThunk = createAsyncThunk(
    'getUser',
    async (data) => {
        const res = await getUser(data);
        return res;
    }
)