import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsersByAdminThunk } from "../../../redux/action/admin";
import { Table, Pagination, Button, Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./styles.scss";

const UserManagement = () => {
  const dispatch = useDispatch();

  const [dataReceived, setDataRecieved] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState();
  const page = 1;

  useEffect(() => {
    dispatch(getAllUsersByAdminThunk({ page }))
    .then((res) => {
      setDataRecieved(res.payload.data);
    });
  }, []);

  const columns = [
    {
      title: "ID",
      className: "flex justify-center",
      dataIndex: "id",
      key: null,
      width: "5%",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
    },
    {
      title: "Hành động",
      dataIndex: null,
      key: null,
      width: "7%",
      className: "flex justify-center",
      render: (value) => (
        <Tooltip placement="top" title={"Xóa người dùng"}>
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

  const handleDeleteUser = (value) => {
    console.log(value);
  };
  return (
    <div className="flex flex-col w-auto">
      <h1 className="text-3xl font-bold h-auto mb-10 mt-4 text-sky-800">
        Quản lý khách hàng
      </h1>
      <Table
        bordered
        columns={columns}
        dataSource={dataReceived}
        pagination={false}
        className="w-auto"
      />
      <Pagination
        defaultCurrent={1}
        defaultPageSize={10}
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
          handleDeleteUser(dataToDelete?.username);
        }}
      />
    </div>
  );
};
export default UserManagement;
