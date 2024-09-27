import { useNavigate } from "react-router-dom";
import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { useDispatch } from "react-redux";
import { signinThunk } from "../../redux/action/signin";
// import cover from "/home/quanghia/unidata/myProjects/uniProject/capstoneProject/Frontend/src/assets/images/loginCover.png";

import { LockOutlined, MailOutlined } from "@ant-design/icons";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeMode = () => {
    navigate("/signup");
  };
  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(signinThunk(values)).then((res) => console.log(res));
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
          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>Welcome back to BrooK!</Text>
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
            <Button
              htmlType="submit"
              className="w-44 bg-green-700 text-white font-extrabold font-sans"
            >
              Log in
            </Button>

            <div style={styles.footer} className="flex items-center">
              <Text style={styles.text}>Don't have an account?</Text>{" "}
              <Button
                onClick={handleChangeMode}
                className=" border-none hover:bg-green-700 hover:text-white  text-green-700 font-extrabold font-sans"
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
}
