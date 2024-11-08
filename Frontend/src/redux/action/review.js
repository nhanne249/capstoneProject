import { createAsyncThunk } from "@reduxjs/toolkit";
import review from '../api/review'

const { getReviewByBookId, postReview } = review;

export const getReviewByBookIdThunk = createAsyncThunk(
    'getReviewByBookId',
    async (data) => {
        const res = await getReviewByBookId(data);
        return res;
    }
)
export const postReviewThunk = createAsyncThunk(
    'postReview',
    async (data) => {
        const res = await postReview(data);
        return res;
    }
)