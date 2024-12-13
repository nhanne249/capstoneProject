import { createAsyncThunk } from "@reduxjs/toolkit";
import payment from '../api/payment'

const { getQRCode, getPaymentInfo } = payment;

export const getQRCodeThunk = createAsyncThunk(
    'getQRCode',
    async (data) => {
        const res = await getQRCode(data);
        return res;
    }
)
export const getPaymentInfoThunk = createAsyncThunk(
    'getPaymentInfo',
    async (data) => {
        const res = await getPaymentInfo(data);
        return res;
    }
)