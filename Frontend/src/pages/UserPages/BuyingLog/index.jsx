import { Table, Tag, Modal, Button, Form, Input, Rate } from 'antd';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllOrdersThunk } from "../../../redux/action/order";
import { postReviewThunk } from '../../../redux/action/review';
import { toast } from 'react-toastify';

const BuyingLog = () => {
  const [detail, setDetail] = useState();
  const [product, setProduct] = useState();
  const [open, setOpen] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => <div>{text.slice(0, 10)}</div>,
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => <div className="text-base text-green-500">{text.slice(0, -3).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</div>
    },
    {
      title: "Payment method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        if (text === 'pending')
          return <Tag color={"orange"}>Pending</Tag>;
        else if (text === 'failure')
          return <Tag color={"red"}>Failure</Tag>;
        else if (text === 'transferring')
          return <Tag color={"blue"}>Transferring</Tag>;
        return <Tag color={"green"}>Done</Tag>;
      },
    },
    {
      title: 'Action',
      dataIndex: null,
      render: (values) => (
        <Tag color={'geekblue'}>
          <div className='cursor-pointer' onClick={() => { setDetail(values); setOpen(true) }}>Details</div>
        </Tag>
      ),
    },
  ];
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [isReceived, setIsReceived] = useState(false);

  useEffect(() => {
    dispatch(getAllOrdersThunk())
      .then((res) => {
        setOrders(res.payload.data);
        setIsReceived(true);
      });
  }, [isReceived]);

  const handlePostReview = (values) => {
    const dataSend = {
      bookId: product.id,
      rating: values.rating,
      content: values.content

    }
    dispatch(postReviewThunk(dataSend)).then(() => {
      toast.success("Your review has been posted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsReview(false);
      setProduct();
    })
  }
  return (
    <div className="flex flex-col w-auto h-fit">
      <h1 className="text-5xl font-bold h-auto mb-5 mt-4 text-sky-800">Order History</h1>
      <Table columns={columns} dataSource={orders} className='h-full' pagination={false} />
      {detail && <Modal
        width={1200}
        title={<div className='text-2xl font-bold text-sky-800'>Order {detail.id}</div>}
        open={open}
        centered={true}
        onCancel={() => {
          setOpen(false);
        }}
        footer={false}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xl font-bold text-gray-600">User Information</h4>
            <p>Receiver name: {detail.rName}</p>
            <p>Receiver phone: {detail.rPhone}</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-600">Order Status</h4>
            <div className='text-red-300'>Status: {detail.status}</div>
            <p>Payment Method: {detail.paymentMethod}</p>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col'>
            <h4 className="text-xl font-bold mb-2 text-gray-600">Order Items</h4>
            {detail.books.map((item, index) => (
              <div key={index} className="flex flex-col justify-between mb-2">
                <span className='text-base font-bold '>Product name: {item.title}</span>
                <div className='grid grid-cols-5 grid-rows-1 gap-4'>
                  <img
                    className="w-16 min-w-16 h-16 rounded"
                    src={`${import.meta.env.VITE_BACKEND_API}/api/image/${item.image_id[0]}`} alt="productimg" />
                  <span className="col-span-2 self-center text-base font-bold text-green-500">Quantity: {item.quantity}</span>
                  <span className="col-start-4 self-center text-base font-bold text-green-500">Price: {item.sellingPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</span>
                  <Button className="col-start-5 self-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    disabled={detail.status == 'transferring' || detail.status == 'pending' ? true : false}
                    onClick={() => {
                      setIsReview(true);
                      setProduct(item);
                      setOpen(false);
                      setDetail();
                    }}>
                    Review product
                  </Button>
                </div>

              </div>
            ))}
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-600">Shipping Address</h4>
            <p>{detail.rAddress}</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-600">Order Date</h4>
            <p>{detail.orderDate}</p>
          </div>
        </div>

        {/* Tổng giá trị */}
        <div className="text-right mt-4">
          <h3 className="text-xl font-bold">Total Amount: {detail.totalPrice.slice(0, -3).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</h3>
        </div>
      </Modal>}
      {product && <Modal width={600}
        title={<div className='text-2xl font-bold text-sky-800'>Review {product.title}</div>}
        open={isReview}
        centered={true}
        onCancel={() => {
          setIsReview(false);
          setDetail();
        }}
        footer={false}>
        <Form
          layout="horizontal"
          onFinish={handlePostReview}
          initialValues={{
            rating: 5,
          }}
          className="w-auto">
          <img
            className="w-40 h-40 rounded"
            src={`${import.meta.env.VITE_BACKEND_API}/api/image/${product.image_id[0]}`} alt="productimg" />
          <Form.Item name="rating">
            <Rate allowHalf />
          </Form.Item>
          <Form.Item name="content">
            <Input.TextArea placeholder='Let us know your experience!' />
          </Form.Item>
          <Form.Item>
            <Button className="col-start-5 self-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" htmlType='submit'>Review product</Button>
          </Form.Item>
        </Form>
      </Modal>}
    </div>
  );
};
export default BuyingLog;           