import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllBooksThunk, deleteBookThunk } from "../../../redux/action/book";
import { Table, Pagination, Button, Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "./styles.scss";

const ProductManagement = () => {
  const dispatch = useDispatch();

  const [dataReceived, setDataReceived] = useState();

  const [openModal, setOpenModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllBooksThunk(page)).then((res) => {
      setDataReceived(res.payload.response);
      setIsReceived(true);
    });
  }, [isReceived]);
  const handlePageChange = (e) => {
    setPage(e);
    setIsReceived(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "4%",
    },
    {
      title: "Image",
      dataIndex: "image",
      width: "10%",
      render: (value) => <img src={value ? value[0] : ""} className="w-[100px] h-[100px]" />,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "35%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "10%",
      render: (value) => <div className="text-center">{value}</div>,
    },
    {
      title: "Cost price",
      dataIndex: "costPrice",
      width: "10%",
      render: (value) => <div className="">{value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</div>,
    },
    {
      title: "Sell price",
      dataIndex: "sellingPrice",
      width: "10%",
      render: (value) => <div className="">{value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</div>,
    },
    {
      title: "Actions",
      width: "21%",
      dataIndex: null,
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
    dispatch(deleteBookThunk(value)).then((res) => {
      if (res.payload.error) {
        toast.error(res.payload.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (res.payload.message == "Book deleted successfully") {
        toast.success(res.payload.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsReceived(false);
      }
    });
  };
  return (
    <div className="flex flex-col w-auto">
      <h1 className="text-3xl font-bold h-auto mb-10 mt-4 text-sky-800">Product management</h1>
      <Table bordered columns={columns} dataSource={dataReceived?.data || []} pagination={false} className="w-auto" />
      <Pagination
        defaultCurrent={1}
        total={dataReceived?.total || 0}
        current={page}
        pageSize={dataReceived?.pageSize || 10}
        onChange={handlePageChange}
        className="self-end my-5"
      />
      <Modal
        title={`Bạn muốn xóa sản phẩm ${dataToDelete?.title}?`}
        open={openModal}
        centered={true}
        onCancel={() => {
          setOpenModal(false);
          setDataToDelete();
        }}
        onOk={() => {
          setOpenModal(false);
          handleDeleteProduct(dataToDelete?.id);
        }}
      />
    </div>
  );
};
export default ProductManagement;
