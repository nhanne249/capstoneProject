import { createAsyncThunk } from "@reduxjs/toolkit";
import user from '../api/user'

const { getUserProfile, updateUserProfile,deleteUserAccount } = user;

export const getUserProfileThunk = createAsyncThunk(
    'getUserProfile',
    async () => {
        const res = await getUserProfile();
        return res;
    }
)
export const updateUserProfileThunk = createAsyncThunk(
    'updateUserProfile',
    async (data) => {
        const res = await updateUserProfile(data);
        return res;
    }
)
export const deleteUserAccountThunk = createAsyncThunk(
    'deleteUserAccount',
    async (data) => {
        const res = await deleteUserAccount(data);
        return res;
    }
)