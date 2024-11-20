import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { useDispatch } from "react-redux";
import { getAllBooksThunk, deleteBookThunk, updateBookThunk, createBookThunk } from "../../../redux/action/book";
import { uploadImageThunk } from "../../../redux/action/image";
import { Table, Pagination, Button, Modal, Tooltip, Form, Input, InputNumber } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Progress from "../../../utils/components/progress";
import "./styles.scss";

const { TextArea } = Input;

const ProductManagement = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [dataReceived, setDataReceived] = useState();
  const [fieldId, setFieldId] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddBookModal, setOpenAddBookModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageIdList, setImageIdList] = useState([]);
  const [isReceived, setIsReceived] = useState(false);
  const [inProgress, setInProgress] = useState(false);
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
      dataIndex: "image_id",
      width: "10%",
      render: (value) => {
        return value != null && value.length > 0 ? (
          <img src={`${import.meta.env.VITE_BACKEND_API}/api/image/${value[0]}`} className="w-[100px] h-[100px]" />
        ) : (
          <p className="text-xs text-slate-400">Not have image yet</p>
        );
      },
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
      render: (values) => (
        <div>
          <Tooltip placement="top" title={"Delete product"}>
            <Button
              onClick={() => {
                flushSync(() => {
                  setFieldId({ id: values.id, title: values.title });
                });
                setOpenDeleteModal(true);
              }}
              icon={<DeleteOutlined />}
              className="border-none"
            />
          </Tooltip>
          <Tooltip placement="top" title={"Edit product"}>
            <Button
              onClick={() => {
                flushSync(() => {
                  setFieldId({ id: values.id, title: values.title });
                });
                if (values.image_id != null) setImageIdList(values.image_id);
                formEdit.setFieldValue("title", values.title);
                formEdit.setFieldValue("author", values.author);
                formEdit.setFieldValue("description", values.description);
                formEdit.setFieldValue("quantity", values.quantity);
                formEdit.setFieldValue("costPrice", values.costPrice);
                formEdit.setFieldValue("sellingPrice", values.sellingPrice);
                setOpenEditModal(true);
              }}
              icon={<EditOutlined />}
              className="border-none"
            />
          </Tooltip>
        </div>
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
        setOpenDeleteModal(false);
        setIsReceived(false);
      }
    });
  };

  const handleUploadImage = () => {
    setInProgress(true);
    flushSync(() => {
      dispatch(uploadImageThunk(selectedFile)).then((response) => {
        setImageIdList((prevState) => [...(prevState || []), response.payload.data.image_id]);
        setInProgress(false);
      });
    });
    setSelectedFile();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleEditData = (values) => {
    const dataSend = {
      id: fieldId?.id,
      title: values.title,
      author: values.author,
      quantity: values.quantity,
      costPrice: parseFloat(values.costPrice),
      sellingPrice: parseFloat(values.sellingPrice),
      description: values.description,
      image_id: imageIdList,
    };
    dispatch(updateBookThunk(dataSend)).then((res) => {
      if (res.payload.message == "Book updated successfully") {
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
        setOpenEditModal(false);
        setImageIdList([]);
        [];
        setFieldId();
        setIsReceived(false);
      }
    });
  };

  const handleAddBoook = (values) => {
    const dataSend = {
      title: values.title,
      author: values.author,
      quantity: values.quantity,
      costPrice: parseFloat(values.costPrice),
      sellingPrice: parseFloat(values.sellingPrice),
      description: values.description,
      image_id: imageIdList,
    };
    dispatch(createBookThunk(dataSend)).then((res) => {
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
      setOpenAddBookModal(false);
      setImageIdList([]);
      [];
      setIsReceived(false);
    });
  };
  console.log(selectedFile);
  return (
    <div className="flex flex-col w-auto">
      <h1 className="text-3xl font-bold h-auto mb-5 mt-4 text-sky-800">Product management</h1>
      <Button
        className="w-52 h-12 z-10 mb-5 bg-sky-300 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-sky-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
        onClick={() => setOpenAddBookModal(true)}
      >
        Add new book
      </Button>
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
        title={`Delete book ${fieldId?.title}?`}
        open={openDeleteModal}
        centered={true}
        onCancel={() => {
          flushSync(() => setFieldId());
          setOpenDeleteModal(false);
        }}
        onOk={() => {
          handleDeleteProduct(fieldId?.id);
        }}
      />
      <Modal
        width={1200}
        title={`Edit ${fieldId?.title}?`}
        open={openEditModal}
        centered={true}
        onCancel={() => {
          flushSync(() => {
            setImageIdList([]);
          });
          setOpenEditModal(false);
        }}
        footer={false}
      >
        <Form layout="horizontal" onFinish={handleEditData} className="w-auto" form={formEdit}>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="px-2 pb-1 font-medium text-base">Title</div>
              <Form.Item name="title">
                <Input className="!w-[720px] h-10 text-base" />
              </Form.Item>
            </div>
            <div className="flex flex-col">
              <div className="px-2 pb-1 font-medium text-base">Author</div>
              <Form.Item name="author">
                <Input className="!w-[360px] h-10 text-base" />
              </Form.Item>
            </div>
          </div>
          <div className="px-2 pb-1 font-medium text-base">Description</div>
          <Form.Item name="description">
            <TextArea className="!w-full h-10 text-base" />
          </Form.Item>
          <div className="px-2 pb-1 font-medium text-base">Image</div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-2">
              {imageIdList.length != 0 ? (
                imageIdList.map((imageId, index) => {
                  return <img key={index} src={`${import.meta.env.VITE_BACKEND_API}/api/image/${imageId}`} className="w-40 h-40 rounded-xl" />;
                })
              ) : (
                <div className="px-2 pb-1 font-light text-base">Don't have image!</div>
              )}
            </div>
            <div className="py-5 flex flex-row w-full">
              <label htmlFor="fileInput" className="cursor-pointer bg-sky-300 !text-white py-2 px-4 rounded mr-5">
                Add image
              </label>
              <input id="fileInput" type="file" className="!hidden" onChange={handleFileChange} />
              {selectedFile && <p> {selectedFile.name}</p>}
              <button
                type="button"
                className="cursor-pointer bg-white !text-sky-800 py-2 px-4 rounded disabled:cursor-not-allowed"
                disabled={selectedFile == null ? true : false}
                onClick={handleUploadImage}
              >
                {inProgress ? <Progress /> : "Upload"}
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="px-2 pb-1 font-medium text-base">Quantity</div>
              <Form.Item name="quantity">
                <InputNumber className="!w-28 h-10 text-base" />
              </Form.Item>
            </div>
            <div className="flex flex-col">
              <div className="px-2 pb-1 font-medium text-base">Cost price</div>
              <Form.Item name="costPrice">
                <InputNumber className="!w-80 h-10 text-base" />
              </Form.Item>
            </div>
            <div className="flex flex-col">
              <div className="px-2 pb-1 font-medium text-base">Selling price</div>
              <Form.Item name="sellingPrice">
                <InputNumber className="!w-80 h-10 text-base" />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button
              className="w-52 h-12 z-10 bg-sky-300 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-sky-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add book */}
      <Modal
        width={1200}
        title={`Add new book`}
        open={openAddBookModal}
        centered={true}
        onCancel={() => {
          setOpenAddBookModal(false);
          setImageIdList([]);
          form.resetFields();
        }}
        footer={false}
      >
        <Form layout="horizontal" onFinish={handleAddBoook} className="w-auto" form={form}>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="px-2 pb-1 font-medium text-base">Title</div>
              <Form.Item name="title">
                <Input className="!w-[720px] h-10 text-base" />
              </Form.Item>
            </div>
            <div className="flex flex-col">
              <div className="px-2 pb-1 font-medium text-base">Author</div>
              <Form.Item name="author">
                <Input className="!w-[360px] h-10 text-base" />
              </Form.Item>
            </div>
          </div>
          <div className="px-2 pb-1 font-medium text-base">Description</div>
          <Form.Item name="description">
            <TextArea className="!w-full h-10 text-base" />
          </Form.Item>
          <div className="px-2 pb-1 font-medium text-base">Image</div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              {imageIdList.length != 0 ? (
                imageIdList.map((imageId, index) => {
                  return <img key={index} src={`${import.meta.env.VITE_BACKEND_API}/api/image/${imageId}`} className="w-40 h-40 rounded-xl" />;
                })
              ) : (
                <div className="px-2 pb-1 font-light text-base">Don't have image!</div>
              )}
            </div>
            <div className="py-5 flex flex-row w-full">
              <label htmlFor="fileInput" className="cursor-pointer bg-sky-300 !text-white py-2 px-4 rounded mr-5">
                Add image
              </label>
              <input id="fileInput" type="file" className="!hidden" onChange={handleFileChange} />
              {selectedFile && <p> {selectedFile.name}</p>}
              <button
                type="button"
                className="cursor-pointer bg-white !text-sky-800 py-2 px-4 rounded disabled:cursor-not-allowed"
                disabled={selectedFile == null ? true : false}
                onClick={handleUploadImage}
              >
                {inProgress ? <Progress /> : "Upload"}
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="px-2 pb-1 font-medium text-base">Quantity</div>
              <Form.Item name="quantity">
                <InputNumber className="!w-28 h-10 text-base" />
              </Form.Item>
            </div>
            <div className="flex flex-col">
              <div className="px-2 pb-1 font-medium text-base">Cost price</div>
              <Form.Item name="costPrice">
                <InputNumber className="!w-80 h-10 text-base" />
              </Form.Item>
            </div>
            <div className="flex flex-col">
              <div className="px-2 pb-1 font-medium text-base">Selling price</div>
              <Form.Item name="sellingPrice">
                <InputNumber className="!w-80 h-10 text-base" />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button
              className="w-52 h-12 z-10 bg-sky-300 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-sky-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
              htmlType="submit"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default ProductManagement;
