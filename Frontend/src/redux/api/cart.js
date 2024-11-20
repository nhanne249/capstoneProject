import { transport } from "../../configs/transport";

const url ='/api/cart';
const cart = {
    getCart: (data) => {
        return transport.post(`${url}/sync`,data);
    },
    addBookToCart: (data) => {
        return transport.post(`${url}`, data);
    },
    deleteBookInCart: (data) => {
        return transport.delete(`${url}`,data);
    },
    getUserCart: () => {
        return transport.get(`${url}`);
    },
}
export default cart;