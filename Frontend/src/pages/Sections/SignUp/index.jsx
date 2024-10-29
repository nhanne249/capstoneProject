import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signUpThunk } from "../../../redux/action/signUp";
import "./styles.scss";

import { Button, Form, Input } from "antd";

import { LockOutlined, MailOutlined, UserOutlined, PhoneOutlined, InfoOutlined } from "@ant-design/icons";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checkPassword, setCheckPassWord] = useState();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    dispatch(signUpThunk(values)).then((res) => {
      console.log(res.payload);
      //Handle sigin success
      if (res?.payload.message == "Sign up successfully!") {
        toast.success("Tạo tài khoản thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/signin", { replace: true });
      }
      //Handle sigin error
      if (res?.payload.message == "Sign up failed!") {
        if (res?.payload.error == "Username already exists")
          toast.error("Username đã tồn tại!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        if (res?.payload.error == "Email already exists")
          toast.error("Email đã tồn tại!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        if (res?.payload.error == "Phone number already exists")
          toast.error("Số điện thoại đã tồn tại!", {
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
    });
  };

  const handleChangeMode = () => {
    navigate("/signin");
  };

  return (
    <div className="h-full w-full m-0 px-5 flex items-center justify-center">
      <div className="h-fit w-fit px-8 py-10 rounded-2xl bg-white bg-opacity-80 flex items-center justify-center flex-col">
        <h1 className="text-6xl font-sans mb-4 h-16 font-medium tracking-widest">Sign up</h1>
        <p className="font-sans h-6">Join BrooK for books!</p>

        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          requiredMark="optional"
          className="py-5 h-full w-80"
        >
          <Form.Item
            name="name"
            rules={[
              {
                type: "text",
                message: "Please input your name!",
              },
            ]}
          >
            <Input prefix={<InfoOutlined />} placeholder="Name" className="h-10" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              {
                type: "text",
                message: "Please input your Username!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" className="h-10" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                validator: (_, value) => {
                  if (value != undefined && value != null) {
                    if (!/^(0(1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9]))\d{7}$/.test(value)) {
                      return Promise.reject("Please enter a valid phone number!");
                    }
                    return Promise.resolve();
                  } else {
                    return Promise.reject();
                  }
                },
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone" className="h-10" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
              {
                validator: (_, value) => {
                  if (value != undefined && value != null) {
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                      return Promise.reject("Please enter a valid email address");
                    }
                    return Promise.resolve();
                  } else {
                    return Promise.reject();
                  }
                },
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" className="h-10" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                validator: (_, value) => {
                  if (value != undefined && value != null) {
                    if (!/^.{8,16}$/.test(value)) {
                      return Promise.reject("Password must have 8-16 symbols!");
                    } else if (!/(?=.*[A-Z])/.test(value)) {
                      return Promise.reject("Password must have uppercase letter!");
                    } else if (!/(?=.*[a-z])/.test(value)) {
                      return Promise.reject("Password must have lowercase letter!");
                    } else if (!/(?=.*\d)/.test(value)) {
                      return Promise.reject("Password must have number!");
                    } else if (!/(?=.*[!@#$%^&*])/.test(value)) {
                      return Promise.reject("Password must have special symbol!");
                    }
                    return Promise.resolve();
                  } else {
                    return Promise.reject();
                  }
                },
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              onChange={(value) => setCheckPassWord(value.target.value)}
              className="h-10"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your Password!",
              },
              {
                validator: (_, value) => {
                  if (value != undefined && value != null) {
                    if (value != checkPassword) {
                      return Promise.reject("Password is not correct!");
                    }
                    return Promise.resolve();
                  } else {
                    return Promise.reject();
                  }
                },
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Confirm your password" className="h-10" />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button
              htmlType="submit"
              className="w-44 h-10 text-lg bg-green-700 text-white font-extrabold font-sans hover:!border-green-700 hover:!text-green-700"
            >
              Sign up
            </Button>
            <div className="flex items-center justify-between w-full pt-5">
              <div className="text-gray-400">Already have account?</div>
              <Button
                onClick={handleChangeMode}
                className="border-none shadow-none bg-transparent text-green-700 font-extrabold font-sans text-lg hover:!text-green-400"
              >
                Sign in
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
