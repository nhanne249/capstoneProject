import { transport } from "../../configs/transport";

const url ='/api/signIn';
const signIn =  (data) => {
    return transport.post(`${url}`, JSON.stringify(data));
}
export default signIn;