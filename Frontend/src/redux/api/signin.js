import { transport } from "../../configs/transport";

const url2 ='/signin';
const signin =  (data) => {
    return transport.post(`${url2}`, JSON.stringify(data));
}
export default signin;