import { transport } from "../../configs/transport";

const url ='/api/payos';
const payment = {
    getQRCode: (data) => {
        return transport.post(`${url}/create-payment-link`,data);
    },
    getPaymentInfo: (data) => {
        return transport.get(`${url}?id=${data}`);
    },
}
export default payment;