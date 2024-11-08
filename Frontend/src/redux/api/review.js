import { transport } from "../../configs/transport";

const url ='/api/review';
const review = {
    getReviewByBookId: (data) => {
        // const data = {
        //     bookId: number
        // }
        return transport.get(`${url}`, data);
    },
    postReview: (data) => {
        // const data = {
        //     bookId: Number,
        //     rating: Number,
        //     content: string
        // }
        return transport.post(`${url}`, data);
    },
}
export default review;