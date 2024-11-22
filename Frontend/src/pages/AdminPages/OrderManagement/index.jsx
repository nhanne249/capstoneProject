// import React from 'react';
import { Space, Table, Tag } from 'antd';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllOrdersByAdminThunk } from "../../../redux/action/order";
import { toast } from "react-toastify";
import { Button, Input, Form } from "antd";

const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Payment method',
    dataIndex: 'method',
    key: 'method',
  },
  {
    title: 'Paid',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {

          let color = tag === false ? 'volcano' : 'green';
          // let color = tag.length > 5 ? 'geekblue' : 'green';
          // if (tag === 'loser') {
          //   color = 'volcano';
          // }
          return (
            <Tag color={color} key={tag}>
              {/* {tag.toUpperCase()} */}
              isPaid
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Tag color={'geekblue'}>
          <a>Details</a>
        </Tag>
      </Space>
    ),
  },
];



const OrderManagement = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllOrdersByAdminThunk(page))
    .then((res) => {
      setOrders(res.payload.response);
      setIsReceived(true);
      console.log(res);
    });
  }, [isReceived]);

  const data = [
    {
      key: '1',
      method: 'MoMo',
      total: `$${32}`,
      date: '2024-10-27',

      tags: [false],
    },
    {
      key: '2',
      method: 'MoMo',
      total: `$${32}`,
      date: '2024-10-27',
      tags: [true],
    },
    {
      key: '3',      
      method: 'MoMo',
      total: `$${32}`,
      date: '2024-10-27',
      tags: [true],
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />;
    </div>
  );
};
export default OrderManagement;