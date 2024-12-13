import {
  getUserProfileThunk,
  updateUserProfileThunk,
} from "../../../redux/action/user";
import { getAllOrdersThunk } from "../../../redux/action/order";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Table, Tag, Modal, Button, Input, Form } from 'antd';


const Profile = () => {

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
        return <Tag color={"green"}>Success</Tag>;
      },
    },
  ];

  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [formEdit] = Form.useForm();
  const [profileData, setProfileData] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);

  useEffect(() => {
    Promise.all([
      dispatch(getUserProfileThunk()).then((res) => {
        setProfileData(res.payload.data);
      }),
      dispatch(getAllOrdersThunk())
        .then((res) => {
          setOrders(res.payload.data);
        })
    ]).then(() =>
      setIsReceived(true))

  }, [isReceived]);


  const handleEditData = (values) => {
    dispatch(updateUserProfileThunk(values)).then((res) => {
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
      } else if (res.payload.message == "Your profile has been updated!") {
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
        setIsEditBtnClicked(false);
        setIsReceived(false);
      }
    });
  };
  return (
    isReceived && (
      <div className="grid grid-cols-3 grid-rows-1 gap-5 pt-5">
        <div className="mr-6 mb-4 flex flex-col gap-5">
          {/* User Profile Card */}
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h5 className="text-xl font-bold mb-2">
              {profileData?.name}
            </h5>
            <p className="text-gray-400 mb-4">{profileData?.email}</p>
            <div className="flex justify-center space-x-2">
              <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => setIsEditBtnClicked(true)}>
                Edit
              </Button>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-white shadow rounded-lg mb-4 p-4">
              {[
                { label: "Full Name", value: profileData?.name },
                { label: "Username", value: profileData?.username },
                { label: "Email", value: profileData?.email },
                {
                  label: "Phone",
                  value: profileData?.phone || "(+82) 123 456 789",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 border-b"
                >
                  <span className="font-medium text-gray-600">
                    {item.label}
                  </span>
                  <span className="text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Table className="w-full col-span-2" columns={columns} dataSource={orders} />
        <Modal
          width={1200}
          open={isEditBtnClicked}
          centered={true}
          onCancel={() => {
            setIsEditBtnClicked(false);
          }}
          footer={false}>
          <h1 className="text-5xl font-bold h-auto mb-5 mt-4 text-sky-800">Account</h1>
          <Form
            layout="horizontal"
            onFinish={handleEditData}
            className="w-auto"
            form={formEdit}
            disabled={!isEditBtnClicked}
            initialValues={{
              name: profileData?.name,
              email: profileData?.email,
              phone: profileData?.phone,
              username: profileData?.username,
              password: profileData?.password,
            }}
          >
            <div className="flex flex-col w-full">
              <div className="px-2 pb-1 font-medium text-2xl">Name</div>
              <Form.Item name="name">
                <Input className="!w-5/12 rounded-lg border-gray-600 content-center h-14 text-2xl !text-stone-800" />
              </Form.Item>
            </div>

            <div className="flex flex-row gap-5 w-full">
              <div className="flex flex-col w-5/12">
                <div className="px-2 pb-1 font-medium text-2xl">Username</div>
                <Form.Item name="username">
                  <Input className="!w-full h-14 rounded-lg border-gray-600 content-center text-2xl !text-stone-800" />
                </Form.Item>
              </div>

            </div>

            <div className="flex flex-row gap-5 w-full">
              <div className="flex flex-col !w-5/12">
                <div className="px-2 pb-1 font-medium text-2xl">Email</div>
                <Form.Item name="email">
                  <Input className="!w-full rounded-lg border-gray-600 content-center h-14 text-2xl !text-stone-800" />
                </Form.Item>
              </div>
              <div className="flex flex-col !w-5/12">
                <div className="px-2 pb-1 font-medium text-2xl">Phone</div>
                <Form.Item name="phone">
                  <Input className="!w-full h-14 rounded-lg border-gray-600 content-center text-2xl !text-stone-800" />
                </Form.Item>
              </div>
            </div>
            <Form.Item>
              <Button
                className="w-5/12 h-12 z-10 mb-5 bg-sky-300 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-sky-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>

          </Form>
        </Modal>
      </div>
    )
  );
};
export default Profile;
