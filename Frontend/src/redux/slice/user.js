import { createSlice } from "@reduxjs/toolkit";
import { getUserProfileThunk } from "../action/admin";

const user = createSlice({
    name: "userFunc",
    initialState: {
        getUserProfile: [],
    },
    reducers: {
        clearUserFunc: (state) => {
            state.getUserProfile = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            getUserProfileThunk.fulfilled,
            (state, { payload }) => {
                if (payload) {
                    state.getUserProfile = payload;
                }
            }
        );
    }
})
export const { userFunc } = user.actions;
export default user;