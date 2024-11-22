import { transport } from "../../configs/transport";

const url ='/api/order';
const order = {
    createOrder: (data) => {
        // const dataSend = {
        //     cartItem: data.cartItem, // []
        //     paymentMethod: data.paymentMethod, // string
        //     rAddress: data.rAddress, // string
        //     rName: data.rName, //string
        //     rPhone: data.rPhone, // string
        // }
        return transport.post(`${url}`,data);
    },
    getAllOrdersByAdmin: (data) => {
        return transport.get(`${url}/admin?page=${data}`);
    },
    getOrderById: (data) => {
        return transport.get(`${url}/${data}`);
    },
    getAllOrders: () => {
        return transport.get(`${url}`);
    },
    updateOrderByAdmin: (data) => {
        // const dataSend = {
        //     cartItem: data.cartItem, // []
        //     status: data.status, // string
        //     paymentMethod: data.paymentMethod, // string
        //     rAddress: data.rAddress, // string
        //     rName: data.rName, //string
        //     rPhone: data.rPhone, // string
        // }
        return transport.put(`${url}/${data.id}`,data);
    },
    deleteOrderByAdmin: (data) => {
        return transport.delete(`${url}/${data}`);
    },

}
export default order;