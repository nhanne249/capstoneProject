import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersByAdminThunk, getUserThunk } from "../action/admin";

const admin = createSlice({
    name: "adminFunc",
    initialState: {
        getAllUsersByAdmin: [],
        getUser: [],
    },
    reducers: {
        clearAdminFunc: (state) => {
            state.getAllUsersByAdmin = [];
            state.getUser = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            getAllUsersByAdminThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.getAllUsersByAdmin = payload;
                }
            }
        );
        builder.addCase(
            getUserThunk.fulfilled,
            (state, { payload }) => { 
                if (payload) { 
                    state.getUser = payload;
                }
            }
        )
    }
})
export const { adminFunc } = admin.actions;
export default admin;