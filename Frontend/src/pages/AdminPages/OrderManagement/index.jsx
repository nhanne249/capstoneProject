// import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllOrdersByAdminThunk, updateOrderByAdminThunk } from "../../../redux/action/order";
import { Modal, Pagination, Table, Tag, Select } from "antd";

const OrderManagement = () => {

  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [isReceived, setIsReceived] = useState(false);
  const [detail, setDetail] = useState();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

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

  const handlePageChange = (e) => {
    setPage(e);
    setIsReceived(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    dispatch(updateOrderByAdminThunk({ id: detail.id, status: value })).then(() => setIsReceived(false))
  };

  useEffect(() => {
    dispatch(getAllOrdersByAdminThunk(page))
      .then((res) => {
        setOrders(res.payload.data);
        setOpen(false)
        setDetail();
        setIsReceived(true);
      });
  }, [isReceived]);

  return (
    <div className="flex flex-col w-auto h-fit">
      <Table columns={columns} dataSource={orders?.data} pagination={false} />
      <Pagination
        defaultCurrent={1}
        total={orders?.total || 0}
        current={page}
        pageSize={orders?.pageSize || 10}
        onChange={handlePageChange}
        className="self-end my-5"
      />
      {detail && <Modal
        width={1200}
        title={<div className='text-2xl font-bold text-sky-800'>Order {detail.id}</div>}
        open={open}
        centered={true}
        onCancel={() => {
          setOpen(false);
          setDetail();
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

            <div className='text-red-300'>Status: <Select
              defaultValue={detail.status}
              className='text-red-300'
              onChange={handleChange}
              options={[
                {
                  value: 'success',
                  label: 'success',
                },
                {
                  value: 'pending',
                  label: 'pending',
                },
                {
                  value: 'failure',
                  label: 'failure',
                },
              ]}
            /></div>
            <p>Payment Method: {detail.paymentMethod}</p>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col'>
            <h4 className="text-xl font-bold mb-2 text-gray-600">Order Items</h4>
            {detail.cartItem.map((item, index) => (
              <div key={index} className="flex flex-col justify-between mb-2">
                <span className='text-base font-bold '>Product name: {item.title}</span>
                <div className='grid grid-cols-5 grid-rows-1 gap-4'>
                  <img
                    className="w-16 min-w-16 h-16 rounded"
                    src={`${import.meta.env.VITE_BACKEND_API}/api/image/${item.image_id[0]}`} alt="productimg" />
                  <span className="col-span-2 self-center text-base font-bold text-green-500">Quantity: {item.quantity}</span>
                  <span className="col-start-5 self-center text-base font-bold text-green-500">Price: {item.sellingPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</span>

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
    </div>
  );
};
export default OrderManagement;
