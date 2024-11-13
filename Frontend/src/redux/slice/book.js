import { createSlice } from "@reduxjs/toolkit";
import { getAllBooksThunk,getAllBooksPublicThunk  } from "../action/book";

const book = createSlice({
    name: "bookFunc",
    initialState: {
        getAllBooks: [],
        getAllBooksPublic: [],
    },
    reducers: {
        clearAdminFunc: (state) => {
            state.getAllBooks = [];
            state.getAllBooksPublic = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            getAllBooksThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.getAllBooks = payload;
                }
            }
        );
        builder.addCase(
            getAllBooksPublicThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.getAllBooksPublic = payload;
                }
            }
        );
    }
})
export const { bookFunc } = book.actions;
export default book;