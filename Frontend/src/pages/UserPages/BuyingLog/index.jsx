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
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
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



const BuyingLog = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState();
  const [isReceived, setIsReceived] = useState(false);

  useEffect(() => {
    dispatch(getAllOrdersByAdminThunk())
    .then((res) => {
      setOrders(res.payload.response);
      setIsReceived(true);
      console.log(res.payload.response);
    });
  }, [isReceived]);

  const data = [
    {
      key: '1',
      name: 'John Brown',
      total: 32,
      date: '2024-10-27',
      tags: [false],
    },
    {
      key: '2',
      name: 'Jim Green',
      total: 42,
      date: '2024-10-27',
      tags: [true],
    },
    {
      key: '3',
      name: 'Joe Black',
      total: 32,
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
export default BuyingLog;