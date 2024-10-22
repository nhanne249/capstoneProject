import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersByAdminThunk } from "../action/admin";

const admin = createSlice({
    name: "adminFunc",
    initialState: {
        getAllUsersByAdmin: [],
    },
    reducers: {
        clearAdminFunc: (state) => {
            state.getAllUsersByAdmin = [];
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
    }
})
export const { adminFunc } = admin.actions;
export default admin;