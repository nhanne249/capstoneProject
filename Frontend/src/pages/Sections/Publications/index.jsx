import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllBooksThunk } from "../../../redux/action/book";
import { Table, Pagination, Button, Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./styles.scss";
import CardCustom from "../../../utils/components/card";

const Publications = () => {
  const dispatch = useDispatch();

  const [dataReceived, setDataReceived] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllBooksThunk(page))
    .then((res) => {
      setDataReceived(res.payload.response);
      setIsReceived(true);
    })
  }, [isReceived])

  const handlePageChange = (e) => {
    setPage(e);    
    setIsReceived(false);
  }

  return (
    <div>
        <div className="grid grid-cols-4 gap-10k">
            {dataReceived?.data.map((book) => {
                return (
                    <CardCustom key={book.id} className="!w-[200px] !h-[250px] min-h-[250px] min-w-[200px] overflow-hidden" imgLink={book.image[0]} title={book.title}/>
                )
            })}
        </div>

        <Pagination
        defaultCurrent={1}
        total={dataReceived?.total || 0}
        current={page}
        pageSize={dataReceived?.pageSize || 12}
        onChange={handlePageChange}
        className="self-end my-5"
      />
    </div>
  );
};
export default Publications;
