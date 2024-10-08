import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { signInThunk } from "../../../redux/action/signIn";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { LockOutlined, UserOutlined } from "@ant-design/icons";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeMode = () => {
    navigate("/signup");
  };

  const onFinish = (values) => {
    dispatch(signInThunk(values)).then((res) => {
      //Handle sigin success
      if (res?.payload.message == "Sign in Successfully") {
        toast.success("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        Cookies.set("userPresent", `${res?.payload.token}`, {
          expires: 7,
          path: "",
        });
        Cookies.set("role", `${res?.payload.role.toLowerCase()}`, {
          expires: 7,
          path: "",
        });
        navigate(`/${res?.payload.role.toLowerCase()}`, { replace: true });
      }
      //Handle sigin error
      if (res?.payload.error) {
        toast.error("Username hoặc mật khẩu chưa chính xác!", {
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

  return (
    <div className="w-96 m-0 px-5">
      <h1 className="text-6xl font-sans mb-4">Sign in</h1>
      <p className="font-sans">Welcome back to BrooK!</p>

      <Form
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark="optional"
        className="py-5"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            className="h-10"
          />
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
                    return Promise.reject(
                      "Password must have uppercase letter!"
                    );
                  } else if (!/(?=.*[a-z]) /.test(value)) {
                    return Promise.reject(
                      "Password must have lowercase letter!"
                    );
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
            className="h-10"
          />
        </Form.Item>
        <div className="w-full h-fit flex flex-row items-center justify-between">
          <Form.Item className="mb-0">
            <Button
              htmlType="submit"
              className="w-44 h-10 text-lg bg-green-700 text-white font-extrabold font-sans hover:!border-green-700 hover:!text-green-700"
            >
              Sigin in
            </Button>
          </Form.Item>
          <Button className="border-none text-green-700 hover:!text-green-400 shadow-none">
            Forgot password?
          </Button>
        </div>
        <div className="flex items-center justify-between w-full pt-5">
          <div className="text-gray-400">Don't have an account?</div>
          <Button
            onClick={handleChangeMode}
            className="border-none shadow-none text-green-700 font-extrabold font-sans text-lg hover:!text-green-400"
          >
            Sign up
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default SignIn;
