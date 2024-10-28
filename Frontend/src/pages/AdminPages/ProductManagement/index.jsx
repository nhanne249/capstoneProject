import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllBooksThunk } from "../../../redux/action/book";
import { Table, Pagination, Button, Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./styles.scss";

const ProductManagement = () => {
  const dispatch = useDispatch();

  const [dataReceived, setDataReceived] = useState();

  const [openModal, setOpenModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState();
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


  const columns = [
    {
      title: "ID",
      // className: "flex justify-center",
      dataIndex: "id",
      key: null,
      width: "4%",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "6%",
      render: (value) => <img src={value[0]} className="w-[50px] h-[50px]" />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "35%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "10%",
    },
    // {
    //   title: "Sold amount",
    //   dataIndex: "sold",
    //   key: "sold",
    //   width: "15%",
    // },
    {
      title: "Cost price",
      dataIndex: "costPrice",
      key: "costPrice",
      width: "10%",
      render: (value) => <div className="">{value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND</div>
    },
    {
      title: "Sell price",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
      width: "10%",
      render: (value) => <div className="">{value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND</div>

    },
    {
      title: "Edit",
      dataIndex: null,
      key: null,
      width: "25%",
      // className: "flex justify-center",
      render: (value) => (
        <Tooltip placement="top" title={"Delete product"}>
          <Button
            onClick={() => {
              setOpenModal(true);
              setDataToDelete(value);
            }}
            icon={<DeleteOutlined />}
            className="border-none"
          />
        </Tooltip>
      ),
    },
  ];

  const handleDeleteProduct = (value) => {
    console.log(value);
    setIsReceived(false);
  };
  return (
    <div className="flex flex-col w-auto">
      <h1 className="text-3xl font-bold h-auto mb-10 mt-4 text-sky-800">
        Product management
      </h1>
      <Table
        bordered
        columns={columns}
        dataSource={dataReceived?.data || []}
        pagination={false}
        className="w-auto"
      />
      <Pagination
        defaultCurrent={1}
        total={dataReceived?.total || 0}
        current={page}
        pageSize={dataReceived?.pageSize || 10}
        onChange={handlePageChange}
        className="self-end my-5"
      />
      <Modal
        title={`Bạn muốn xóa tài khoản của ${dataToDelete?.name}?`}
        open={openModal}
        centered={true}
        onCancel={() => {
          setOpenModal(false);
          setDataToDelete();
        }}
        onOk={() => {
          setOpenModal(false);
          // handleDeleteProduct(dataToDelete?.id);
        }}
      />
    </div>
  );
};
export default ProductManagement;
