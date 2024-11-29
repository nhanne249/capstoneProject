// import React from 'react';
import { Space, Table, Tag } from 'antd';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllOrdersThunk } from "../../../redux/action/order";
import { toast } from "react-toastify";
import { Button, Input, Form } from "antd";
import { useNavigate } from 'react-router-dom';





const BuyingLog = () => {
    const handleShowDetail = (id) => {
      console.log(id);
      navigate(`${id}`)
    }
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
          render: (text) => <a>{text.slice(0,10)}</a>,
      },
      {
        title: "Total",
        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (text) => <a>{text} VND</a>,
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
          if(text === 'pending')
            return <Tag color={"orange"}>Pending</Tag>;
          return <Tag color={"green"}>Done</Tag>;
        },
      },
      {
        title: 'Action',
        dataIndex: null,
        render: (values) => (
          <Space size="middle">
            <Tag color={'geekblue'}>
              <div className='cursor-pointer' onClick={() => {handleShowDetail(values.id)}}>Details</div>
            </Tag>
          </Space>
        ),
      },
    ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [isReceived, setIsReceived] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllOrdersThunk(page))
    .then((res) => {
      setOrders(res.payload.data);
      setIsReceived(true);
      console.log(res);
    });
  }, [isReceived]);

  const data = [
  ];

  return (
    <div>
      <Table columns={columns} dataSource={orders} />;
    </div>
  );
};
export default BuyingLog;