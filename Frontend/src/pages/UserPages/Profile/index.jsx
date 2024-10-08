import { useState } from "react";
import { Button, Modal, Input, Form, Divider } from "antd";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "1",
    role: "user",
    username: "joe123",
    fullname: "sirgio joe",
    password: "12345",
    email: "joe@mama.com",
    phone: "0987654321",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <p className="m-4 my-6 font-sans text-4xl">Account</p>
      <div className="container flex justify-between ">
        <div className="text-lg container m-4 font-sans">
          <p className="text-2xl">Username</p>
          <div className="items-center h-10 border rounded-lg border-gray-600 content-center">
            <p label="Username" className="m-4">
              {formData.username}
            </p>
          </div>
        </div>
        <div className="text-lg container m-4 font-sans">
          <p label="Email" className="text-2xl">
            Email
          </p>
          <div className="items-center h-10 border rounded-lg border-gray-600 content-center xl:rounded-lg">
            <p className="m-4">{formData.email}</p>
          </div>
        </div>
        <div className="text-lg container m-4 font-sans">
          <p className="text-2xl">Phone number</p>
          <div className="items-center h-10 border rounded-lg border-gray-600 content-center xl:rounded-lg">
            <p label="Phone" className="m-4">
              {formData.phone}
            </p>
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <div className="container flex justify-between ">
          <div className="text-lg container m-4 font-sans">
            <p className="text-2xl">Fullname</p>
            <div className="items-center h-10 border rounded-lg border-gray-600 content-center xl:rounded-lg">
              <p label="Fullname" className="m-4">
                {formData.fullname}
              </p>
            </div>
          </div>
          <div className="text-lg container m-4 font-sans">
            <p className="text-2xl">UserId</p>
            <div className="items-center h-10 border rounded-lg border-gray-600 content-center xl:rounded-lg">
              <p className="m-4">{formData.id}</p>
            </div>
          </div>
          <div className="text-lg container m-4 font-sans">
            <p className="text-2xl">Role</p>
            <div className="items-center h-10 border rounded-lg border-gray-600 content-center xl:rounded-lg">
              <p className="m-4">{formData.role}</p>
            </div>
          </div>
        </div>
        <div className="float-right">
          <Button type="primary" onClick={showModal}>
            Edit
          </Button>
        </div>
      </div>

      <Modal
        title="Edit Info"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Username">
            <Input
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Fullname">
            <Input
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>

      <h1>Here lay buying history</h1>
    </>
  );
};
export default Profile;
