import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserProfileThunk, updateUserProfileThunk } from "../../../redux/action/user";
import { toast } from "react-toastify";
import { Button, Input, Form } from "antd";

const Profile = () => {
  const [formEdit] = Form.useForm();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState();
  const [isReceived, setIsReceived] = useState(false);
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);

  useEffect(() => {
    dispatch(getUserProfileThunk()).then((res) => {
      setProfileData(res.payload.data);
      setIsReceived(true);
    });
  }, [isReceived]);

  const handleEditData = (values) => {
    dispatch(updateUserProfileThunk(values)).then((res) => {
      console.log(res.payload);
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
      <div className="flex flex-col w-full">
        <h1 className="text-5xl font-bold h-auto mb-5 mt-4 text-sky-800">Account</h1>
        <Form
          layout="horizontal"
          onFinish={handleEditData}
          className="w-full"
          form={formEdit}
          disabled={!isEditBtnClicked}
          initialValues={{
            name: profileData?.name,
            email: profileData?.email,
            phone: profileData?.phone,
            username: profileData?.username,
          }}
        >
          <div className="flex flex-col w-1/2">
            <div className="px-2 pb-1 font-medium text-2xl">Name</div>
            <Form.Item name="name">
              <Input className="!w-[600px] rounded-lg border-gray-600 content-center h-14 text-2xl !text-stone-800" />
            </Form.Item>
          </div>
          <div className="flex flex-row gap-5 justify-between w-fit">
            <div className="flex flex-col w-1/2">
              <div className="px-2 pb-1 font-medium text-2xl">Email</div>
              <Form.Item name="email">
                <Input className="!w-[600px] rounded-lg border-gray-600 content-center h-14 text-2xl !text-stone-800" />
              </Form.Item>
            </div>
            <div className="flex flex-col w-1/2">
              <div className="px-2 pb-1 font-medium text-2xl">Phone</div>
              <Form.Item name="phone">
                <Input className="!w-[600px] h-14 rounded-lg border-gray-600 content-center text-2xl !text-stone-800" />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="px-2 pb-1 font-medium text-2xl">Username</div>
            <Form.Item name="username">
              <Input className="!w-[600px] h-14 rounded-lg border-gray-600 content-center text-2xl !text-stone-800" />
            </Form.Item>
          </div>
          {isEditBtnClicked && (
            <Form.Item>
              <Button
                className="w-52 h-12 z-10 mb-5 bg-sky-300 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-sky-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          )}
        </Form>
        {!isEditBtnClicked && (
          <Button
            className="w-52 h-12 z-10 mb-5 bg-sky-300 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-sky-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
            onClick={() => setIsEditBtnClicked(true)}
          >
            Edit
          </Button>
        )}
      </div>
    )
  );
};
export default Profile;
