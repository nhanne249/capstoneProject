import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { signInThunk } from "../../../redux/action/signIn";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { MyCart } from "../../../layouts";

import { LockOutlined, UserOutlined } from "@ant-design/icons";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setIsLogin } = useContext(MyCart);
  const handleChangeMode = () => {
    navigate("/signup");
  };

  const onFinish = (values) => {
    dispatch(signInThunk(values)).then((res) => {
      //Handle sigin success
      if (res?.payload.message == "Sign in Successfully!") {
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
          path: "/",
        });
        Cookies.set("role", `${res?.payload.role.toLowerCase()}`, {
          expires: 7,
          path: "/",
        });
        navigate(`/${res?.payload.role.toLowerCase()}`, { replace: true });
        setIsLogin(true);
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
    <div className="h-full w-full m-0 px-5 flex items-center justify-center">
      <div className="h-fit w-fit px-8 py-10 rounded-2xl bg-white bg-opacity-80 flex items-center justify-center flex-col">
        <h1 className="text-6xl font-sans mb-4 h-16 font-medium tracking-widest">Sign in</h1>
        <p className="font-sans h-6">Welcome back to BrooK!</p>

        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          requiredMark="optional"
          className="py-5 h-fit w-80"
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
            <Input prefix={<UserOutlined />} placeholder="Username" className="h-10" />
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
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" className="h-10" />
          </Form.Item>
          <div className="w-full h-fit flex flex-row items-center justify-between">
            <Form.Item className="mb-0">
              <Button
                htmlType="submit"
                className="w-44 h-10 text-lg bg-green-700 text-white font-extrabold font-sans hover:!border-green-700 hover:!text-green-700"
              >
                Sign in
              </Button>
            </Form.Item>
            <Button className="border-none text-green-700 hover:!text-green-400 shadow-none">Forgot password?</Button>
          </div>
          <div className="flex items-center justify-between w-full pt-5">
            <div className="text-gray-600">Don't have an account?</div>
            <Button
              onClick={handleChangeMode}
              className="bg-transparent border-none shadow-none text-green-700 font-extrabold font-sans text-lg hover:!text-green-400"
            >
              Sign up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default SignIn;
