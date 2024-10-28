import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsersByAdminThunk, deleteUserThunk } from "../../../redux/action/admin";
import { Table, Pagination, Button, Modal, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
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
                <>
                    <Tooltip placement="top" title={"Update user profile"}>
                        <Button
                            onClick={() => {
                                setOpenModal(true);
                                setDataToDelete(value);
                            }}
                            icon={<DeleteOutlined />}
                            className="border-none"
                        />
                    </Tooltip>
                    <Tooltip placement="top" title={"Remove user"}>
                        <Button
                            onClick={() => {
                                setOpenModal(true);
                                setDataToDelete(value);
                            }}
                            icon={<DeleteOutlined />}
                            className="border-none"
                        />
                    </Tooltip>
                </>
            ),
        },
    ];

    const handleDeleteUser = (value) => {
        console.log(value);
        dispatch(deleteUserThunk({ username: value })).then((res) => {
            console.log(res);
        });
        setIsReceived(false);
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
