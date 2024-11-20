import axios from 'axios';
import Cookies from 'js-cookie'

const url ='/api/image';
const image = {
    getImage: (data) => {
        return axios.get(`${import.meta.env.VITE_BACKEND_API}${url}/${data}`, {
            responseType: 'blob',
        });
    },
    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return axios.post(`${import.meta.env.VITE_BACKEND_API}${url}`, formData, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('userPresent')}`,
                'Content-Type': 'multipart/form-data',
            },
        });
    },
}
export default image;