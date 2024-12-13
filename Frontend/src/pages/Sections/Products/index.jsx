import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllBooksPublicThunk, searchBookThunk } from "../../../redux/action/book";
import { Pagination, Input } from "antd";
import "./styles.scss";
import Card from "../../../utils/components/card";
import { debounce } from "../../../utils/functions/debounce";

const { Search } = Input;

const Main = () => {
    const dispatch = useDispatch();
    const [dataReceived, setDataReceived] = useState();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isReceived, setIsReceived] = useState(false);
    const [page, setPage] = useState(1);

    //fetch all books by page
    useEffect(() => {
        if (searchKeyword != '')
            dispatch(searchBookThunk({ search: searchKeyword, page: page })).then((res) => {
                setDataReceived(res.payload.data);
                setIsReceived(true);
            });
        else dispatch(getAllBooksPublicThunk(page)).then((res) => {
            setDataReceived(res.payload.response);
            setIsReceived(true);
        });
    }, [isReceived]);

    const debounceSearchBook = debounce((value) => {
        if (value.target.value == '')
            setSearchKeyword('')
        else setSearchKeyword(value.target.value)
        setIsReceived(false);
    }, 1500);

    const handlePageChange = (e) => {
        setPage(e);
        setIsReceived(false);
    };
    return (
        <div className="flex flex-col h-full w-full px-5 pb-10 bg-white">
            <h1 className="text-5xl font-bold h-auto mb-5 mt-4 text-sky-800 self-center">Our Product</h1>
            <Search className="w-1/3 self-center" onChange={(values) => debounceSearchBook(values)} />
            <div className="w-auto h-auto ml-5 flex flex-col self-center mt-5">
                <div className="grid grid-cols-4 gap-10 w-full">
                    {isReceived && dataReceived?.data.map((book) => {
                        return (
                            <Card
                                id={book.id}
                                key={book.id}
                                link={book.image_id != null && book.image_id.length != 0 ? `${import.meta.env.VITE_BACKEND_API}/api/image/${book.image_id[0]}` : ""}
                                title={book.title}
                                sellingPrice={book.sellingPrice}
                            />
                        );
                    })}
                </div>
                {dataReceived && dataReceived?.total > 1 ? (
                    <Pagination
                        defaultCurrent={1}
                        total={dataReceived?.total || 0}
                        current={page}
                        pageSize={12}
                        onChange={handlePageChange}
                        className="self-end mt-10"
                    />
                ) : null}
            </div>
        </div>
    );
};

export default Main;
