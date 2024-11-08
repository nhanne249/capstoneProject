import { transport } from "../../configs/transport";

const url ='/api/cart';
const cart = {
    getCart: () => {
        return transport.get(`${url}`);
    },
    addBookToCart: (data) => {
        return transport.post(`${url}`, data);
    },
    deleteBookInCart: (data) => {
        return transport.delete(`${url}`,data);
    },
}
export default cart;