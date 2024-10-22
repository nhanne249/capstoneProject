import { transport } from "../../configs/transport";

const url ='/api/book';
const book = {
    getAllBooks: (data) => {
        return transport.get(`${url}s?page=${data}`);
    },
    searchBook: (data) => {
        return transport.get(`${url}s?search=${data.search}&page=${data.page}`);
    },
    getBook: (data) => {
        return transport.get(`${url}/${data.id}`);
    },
    createBook: (data) => {
        // cosnt data = {
        //     title: "",
        //     quantity: "",
        //     author: 0,
        //     image: [],
        //     description: "",
        //     costPrice: 0,
        //     sellingPrice: 0
        // }
        return transport.post(`${url}`,data);
    },
    updateBook: (data) => {
        const dataSend = {
            title: data.title,
            quantity: data.quantity,
            author: data.author,
            image: data.image,
            description: data.description,
            costPrice: data.costPrice,
            sellingPrice: data.sellingPrice
        }
        return transport.put(`${url}/${data.id}`,dataSend);
    },
    deleteBook: (data) => {
        return transport.delete(`${url}/${data}`);
    }
}
export default book;