import { createAsyncThunk } from "@reduxjs/toolkit";
import book from '../api/book'

const { getAllBooks,getAllBooksPublic, searchBook,getBook,getBookPublic,createBook,updateBook,deleteBook,getNewestBook,filterBookByPrice, } = book;

export const getAllBooksThunk = createAsyncThunk(
    'getAllBooks',
    async (data) => {
        const res = await getAllBooks(data);
        return res;
    }
)
export const getAllBooksPublicThunk = createAsyncThunk(
    'getAllBooksPublic',
    async (data) => {
        const res = await getAllBooksPublic(data);
        return res;
    }
)
export const searchBookThunk = createAsyncThunk(
    'searchBook',
    async (data) => {
        const res = await searchBook(data);
        return res;
    }
)
export const getBookThunk = createAsyncThunk(
    'getBook',
    async (data) => {
        const res = await getBook(data);
        return res;
    }
)
export const getBookPublicThunk = createAsyncThunk(
    'getBookPublic',
    async (data) => {
        const res = await getBookPublic(data);
        return res;
    }
)
export const createBookThunk = createAsyncThunk(
    'createBook',
    async (data) => {
        const res = await createBook(data);
        return res;
    }
)
export const updateBookThunk = createAsyncThunk(
    'updateBook',
    async (data) => {
        const res = await updateBook(data);
        return res;
    }
)
export const deleteBookThunk = createAsyncThunk(
    'deleteBook',
    async (data) => {
        const res = await deleteBook(data);
        return res;
    }
)
export const getNewestBookThunk = createAsyncThunk(
    'getNewestBook',
    async (data) => {
        const res = await getNewestBook(data);
        return res;
    }
)
export const filterBookByPriceThunk = createAsyncThunk(
    'filterBookByPrice',
    async (data) => {
        const res = await filterBookByPrice(data);
        return res;
    }
)