import { createAsyncThunk } from "@reduxjs/toolkit";
import cart from '../api/cart'

const { getCart, addBookToCart,deleteBookInCart,getUserCart } = cart;

export const getCartThunk = createAsyncThunk(
    'getCart',
    async (data) => {
        const res = await getCart(data);
        return res;
    }
)
export const getUserCartThunk = createAsyncThunk(
    'getUserCart',
    async (data) => {
        const res = await getUserCart(data);
        return res;
    }
)
export const addBookToCartThunk = createAsyncThunk(
    'addBookToCart',
    async (data) => {
        const res = await addBookToCart(data);
        return res;
    }
)
export const deleteBookInCartThunk = createAsyncThunk(
    'deleteBookInCart',
    async (data) => {
        const res = await deleteBookInCart(data);
        return res;
    }
)