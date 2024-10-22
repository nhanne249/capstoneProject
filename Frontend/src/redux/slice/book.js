import { createSlice } from "@reduxjs/toolkit";
import { getAllBooksThunk,  } from "../action/book";

const book = createSlice({
    name: "bookFunc",
    initialState: {
        getAllBooks: [],
    },
    reducers: {
        clearAdminFunc: (state) => {
            state.getAllBooks = [];
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
    }
})
export const { bookFunc } = book.actions;
export default book;