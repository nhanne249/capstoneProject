import { createAsyncThunk } from "@reduxjs/toolkit";
import order from '../api/order'

const { createOrder, getAllOrdersByAdmin,getOrderById,getAllOrders,updateOrderByAdmin,deleteOrderByAdmin } = order;

export const createOrderThunk = createAsyncThunk(
    'createOrder',
    async (data) => {
        const res = await createOrder(data);
        return res;
    }
)
export const getAllOrdersByAdminThunk = createAsyncThunk(
    'getAllOrdersByAdmin',
    async (data) => {
        const res = await getAllOrdersByAdmin(data);
        return res;
    }
)
export const getOrderByIdThunk = createAsyncThunk(
    'getOrderById',
    async (data) => {
        const res = await getOrderById(data);
        return res;
    }
)
export const getAllOrdersThunk = createAsyncThunk(
    'getAllOrders',
    async (data) => {
        const res = await getAllOrders(data);
        return res;
    }
)
export const updateOrderByAdminThunk = createAsyncThunk(
    'updateOrderByAdmin',
    async (data) => {
        const res = await updateOrderByAdmin(data);
        return res;
    }
)
export const deleteOrderByAdminThunk = createAsyncThunk(
    'deleteOrderByAdmin',
    async (data) => {
        const res = await deleteOrderByAdmin(data);
        return res;
    }
)