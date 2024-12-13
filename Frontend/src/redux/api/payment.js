import { transport } from "../../configs/transport";

const url ='/api/payos';
const payment = {
    getQRCode: (data) => {
        return transport.post(`${url}/create-payment-link`,data);
    },
    getPaymentInfo: () => {
        return transport.get(`${url}`);
    },
}
export default payment;