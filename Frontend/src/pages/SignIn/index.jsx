import { useNavigate } from "react-router-dom";
import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { useDispatch } from "react-redux";
import { signinThunk } from "../../redux/action/signin";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { LockOutlined, MailOutlined } from "@ant-design/icons";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text } = Typography;

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeMode = () => {
    navigate("/signup");
  };
  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = (values) => {
    dispatch(signinThunk(values)).then((res) => {
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

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "left",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
      color: "green",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section} className="	display: flex">
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 className="text-6xl font-sans">Sign in</h1>
          <p className="font-sans">Welcome back to BrooK!</p>
        </div>

        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
          className=""
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
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <div style={styles.forgotPassword} href="">
            Forgot password?
          </div>

          <Form.Item style={{ marginBottom: "0px" }}>
            {/* //////////////////////////// */}
            <Button
              htmlType="submit"
              className="w-44 h-14 text-lg  bg-green-700 text-white font-extrabold font-sans"
            >
              Log in
            </Button>

            {/* switch page */}
            <div style={styles.footer} className="flex items-center">
              <Text style={styles.text}>Don't have an account?</Text>{" "}
              <Button
                onClick={handleChangeMode}
                className=" border-none shadow-none hover:bg-green-700 hover:text-white  text-green-700 font-extrabold font-sans text-lg"
              >
                Sign up now
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className="max-w-sm">{/* <img src={cover} alt="" /> */}</div>
    </section>
  );
};
export default SignIn;
