import { transport } from "../../configs/transport";

const url ='/api/admin';
const admin = {
    getAllUsersByAdmin: (data) => {
        return transport.get(`${url}/users?page=${data.page}`);
    },
    getUser: (data) => {
        return transport.get(`${url}/${data.username}`);
    },
    deleteUser: (data) => {
        return transport.delete(`${url}/${data.username}`);
    }
}
export default admin;