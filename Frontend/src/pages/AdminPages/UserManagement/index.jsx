import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsersByAdminThunk, deleteUserThunk } from "../../../redux/action/admin";
import { Table, Pagination, Button, Modal, Tooltip } from "antd";
import { UserDeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "./styles.scss";

const UserManagement = () => {
  const dispatch = useDispatch();

  const [dataReceived, setDataReceived] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllUsersByAdminThunk({ page })).then((res) => {
      setDataReceived(res.payload);
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
      width: "5%",
    },
    {
      title: "Full name",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Username",
      dataIndex: "username",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Telephone",
      dataIndex: "phone",
      width: "15%",
    },
    {
      title: "Actions",
      width: "15%",
      render: (value) => (
        <Tooltip placement="top" title={"Remove user"}>
          <Button
            onClick={() => {
              setOpenModal(true);
              setDataToDelete(value);
            }}
            disabled={value.role == "Admin" ? true : false}
            icon={<UserDeleteOutlined />}
            className="border-none"
          />
        </Tooltip>
      ),
    },
  ];

  const handleDeleteUser = (value) => {
    dispatch(deleteUserThunk({ username: value })).then((res) => {
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
      } else if (res.payload.message == "User deleted successfully.") {
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
      }
      setIsReceived(false);
    });
  };
  return (
    <div className="flex flex-col w-auto">
      <h1 className="text-3xl font-bold h-auto mb-10 mt-4 text-sky-800">Customer management</h1>
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
