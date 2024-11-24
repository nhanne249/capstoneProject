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
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
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
  const [orders, setOrders] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllOrdersThunk(page))
    .then((res) => {
      setOrders(res.payload.response);
      setIsReceived(true);
      console.log(res);
    });
  }, [isReceived]);

  const data = [
    {
      id: '1',
      method: 'MoMo',
      total: `$${32}`,
      date: '2024-10-27',
      tags: [false],
    },
    {
      id: '2',
      method: 'MoMo',
      total: `$${32}`,
      date: '2024-10-27',
      tags: [true],
    },
    {
      id: '3',      
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
export default BuyingLog;