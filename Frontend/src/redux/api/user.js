import { transport } from "../../configs/transport";

const url ='/api/user';
const user = {
    getUserProfile: () => {
        return transport.get(`${url}`);
    },
    updateUserProfile: (data) => {
        // const data = {
        //     email: "",
        //     password: "",
        //     name: "",
        //     phone:"",
        // }
        return transport.put(`${url}`, data);
    },
    deleteUserAccount: () => {
        return transport.delete(`${url}`);
    }
}
export default user;