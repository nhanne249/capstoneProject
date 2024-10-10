import { transport } from "../../configs/transport";

const url ='/api/admin/user';
const admin = {
    getAllUsersByAdmin: (data) => {
        return transport.get(`${url}s?page=${data.page}`);
    },
    getUser: (data) => {
        return transport.get(`${url}/${data.username}`);
    }
}
export default admin;