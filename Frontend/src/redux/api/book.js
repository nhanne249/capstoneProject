import { transport } from "../../configs/transport";

const url ='/api/book';
const book = {
    getAllBooks: (data) => {
        return transport.get(`${url}s?page=${data}`);
    },
    getAllBooksPublic: (data) => {
        return transport.get(`${url}s/public?page=${data}`);
    },
    searchBook: (data) => {
        return transport.get(`${url}s?search=${data.search}&page=${data.page}`);
    },
    getBookPublic: (data) => {
        return transport.get(`${url}/public/${data}`,);
    },
    getBook: (data) => {
        return transport.get(`${url}/${data}`,);
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
        return transport.put(`${url}/${data.id}`,data);
    },
    deleteBook: (data) => {
        return transport.delete(`${url}/${data}`,);
    },
    getNewestBook: () => {
        return transport.get(`${url}s/newest`);
    },
    filterBookByPrice: (data) => {
        return transport.get(`${url}s/sort?order=${data.order}&page=${data.page}`)
     }
}
export default book;