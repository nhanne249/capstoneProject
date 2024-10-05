import { transport } from "../../configs/transport";

const url ='/api/signup';
const signUp =  (data) => {
    return transport.post(`${url}`, JSON.stringify(data));
}
export default signUp;