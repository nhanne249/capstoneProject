import { createAsyncThunk } from "@reduxjs/toolkit";
import image from '../api/image'

const { getImage, uploadImage } = image;

export const getImageThunk = createAsyncThunk(
    'getImage',
    async (data) => {
        const res = await getImage(data);
        return res;
    }
)
export const uploadImageThunk = createAsyncThunk(
    'uploadImage',
    async (data) => {
        const res = await uploadImage(data);
        return res;
    }
)