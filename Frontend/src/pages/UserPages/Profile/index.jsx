import {
  getUserProfileThunk,
  updateUserProfileThunk,
} from "../../../redux/action/user";
import { getAllOrdersThunk } from "../../../redux/action/order";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Space, Table, Tag } from 'antd';
import { Button, Input, Form } from "antd";


const Profile = () => {
  const handleShowDetail = (id) => {
    console.log(id);
    navigate(`orders/${id}`);
  };

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
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [isOrderReceive, setIsOrderReceive] = useState(false);
  const [page, setPage] = useState(1);
  const [formEdit] = Form.useForm();
  const [profileData, setProfileData] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);

  useEffect(() => {
    dispatch(getUserProfileThunk()).then((res) => {
      setProfileData(res.payload.data);
      setIsReceived(true);
    });
  }, [isReceived]);


  useEffect(() => {
    dispatch(getAllOrdersThunk(page))
    .then((res) => {
      console.log(res.payload.data);
      setOrders(res.payload.data);
      setIsOrderReceive(true);
      console.log(orders);
    });
  }, []);

  const data = [
    {
      id: '1',
      // paymenMethod: 'MoMo',
      // totalPrice: `$${32}`,
      // orderDate: '2024-10-27',
    }
  ];


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
      // <div className="flex flex-col w-full">
      //   <h1 className="text-5xl font-bold h-auto mb-5 mt-4 text-sky-800">Account</h1>
      //   <Form
      //     layout="horizontal"
      //     onFinish={handleEditData}
      //     className="w-full"
      //     form={formEdit}
      //     disabled={!isEditBtnClicked}
      //     initialValues={{
      //       name: profileData?.name,
      //       email: profileData?.email,
      //       phone: profileData?.phone,
      //       username: profileData?.username,
      //     }}
      //   >
      //     <div className="flex flex-col w-1/2">
      //       <div className="px-2 pb-1 font-medium text-2xl">Name</div>
      //       <Form.Item name="name">
      //         <Input className="!w-[600px] rounded-lg border-gray-600 content-center h-14 text-2xl !text-stone-800" />
      //       </Form.Item>
      //     </div>
      //     <div className="flex flex-row gap-5 justify-between w-fit">
      //       <div className="flex flex-col w-1/2">
      //         <div className="px-2 pb-1 font-medium text-2xl">Email</div>
      //         <Form.Item name="email">
      //           <Input className="!w-[600px] rounded-lg border-gray-600 content-center h-14 text-2xl !text-stone-800" />
      //         </Form.Item>
      //       </div>
      //       <div className="flex flex-col w-1/2">
      //         <div className="px-2 pb-1 font-medium text-2xl">Phone</div>
      //         <Form.Item name="phone">
      //           <Input className="!w-[600px] h-14 rounded-lg border-gray-600 content-center text-2xl !text-stone-800" />
      //         </Form.Item>
      //       </div>
      //     </div>
      //     <div className="flex flex-col w-1/2">
      //       <div className="px-2 pb-1 font-medium text-2xl">Username</div>
      //       <Form.Item name="username">
      //         <Input className="!w-[600px] h-14 rounded-lg border-gray-600 content-center text-2xl !text-stone-800" />
      //       </Form.Item>
      //     </div>
      //     {isEditBtnClicked && (
      //       <Form.Item>
      //         <Button
      //           className="w-52 h-12 z-10 mb-5 bg-sky-300 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-sky-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
      //           htmlType="submit"
      //         >
      //           Save
      //         </Button>
      //       </Form.Item>
      //     )}
      //   </Form>
      //   {!isEditBtnClicked && (
      //     <Button
      //       className="w-52 h-12 z-10 mb-5 bg-sky-300 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-sky-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
      //       onClick={() => setIsEditBtnClicked(true)}
      //     >
      //       Edit
      //     </Button>
      //   )}
      // </div>
      <div className="container-feedback">
        <section>
          <div className="container mx-auto py-5">
            <div className="flex flex-wrap">
              <div className="lg:w-1/3 mr-6 mb-4">
                {/* User Profile Card */}
                <div className="bg-white shadow rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-4">
                    
                  </div>
                  <h5 className="text-xl font-bold mb-2">
                    {profileData?.name}
                  </h5>
                  {/* <p className="text-gray-500 mb-1">
                    {userData.is_staff
                      ? "Signed in as an ADMIN"
                      : "Signed in as a CUSTOMER"}
                  </p> */}
                  <p className="text-gray-400 mb-4">{profileData?.email}</p>
                  <div className="flex justify-center space-x-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              <Table className="w-full lg:w-3/5" columns={columns} dataSource={orders} />


              <div className="w-full lg:w-1/3">
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
              {/* 
                <div className="bg-white shadow rounded-lg">
                  <ul className="divide-y divide-gray-200">
                    {orderLog
                      .sort(
                        (a, b) =>
                          new Date(b.timer_start) - new Date(a.timer_start)
                      )
                      .slice(0, 4)
                      .map((log, index) => (
                        <li key={index} className="p-3">
                          <div>
                            <p>
                              <span className="text-red-500 text-xl font-bold">
                                {-log.page_cost}
                              </span>{" "}
                              {log.status === "pending" ? (
                                <span className="text-yellow-600 font-bold">
                                  [ON PENDING]
                                </span>
                              ) : (
                                <span className="text-green-600 font-bold">
                                  [DONE]
                                </span>
                              )}
                              <span className="text-gray-500 ml-2">
                                [{new Date(log.timer_start).toLocaleString()}]
                              </span>
                            </p>
                            <p>
                              <strong>Order's name:</strong> {log.order_name}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
    )
  );
};
export default Profile;
