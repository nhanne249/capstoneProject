import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

import {
  Button,
  Checkbox,
  Form,
  Grid,
  Input,
  theme,
  Typography,
  Row,
  Col,
} from "antd";
import CardCustom from "../../utils/components/card";

import cover from "/home/quanghia/unidata/myProjects/uniProject/capstoneProject/Frontend/src/assets/images/loginCover.png";

import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function SignUp() {
  const navigate = useNavigate();
  const handleChangeMode = () => {
    navigate("/signin");
  };
  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
          <Text style={styles.text}>Join BrooK for books!</Text>
        </div>

        <Form
          name="normal_register"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
          className="custom-form"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                rules={[
                  {
                    type: "text",
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="phone"
                rules={[
                  {
                    type: "number",
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
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

          <Form.Item
            name="repeat_password"
            rules={[
              {
                required: true,
                message: "Please input your repeat Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Re-enter your password"
            />
          </Form.Item>

          <Form.Item>
            <a style={styles.forgotPassword} href="">
              Forgot password? Then good luck
            </a>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            {/* //////////////////////////// */}
            <Button
              htmlType="submit"
              className="w-44 bg-green-700 text-white font-extrabold font-sans"
            >
              Sign up
            </Button>
            {/* //////////////////////////// */}

            <div style={styles.footer} className="flex items-center">
              <Text style={styles.text}>Don't have an account?</Text>{" "}
              <Button
                onClick={handleChangeMode}
                className=" border-none hover:bg-green-700 hover:text-white  text-green-700 font-extrabold font-sans"
              >
                Sign in now
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>

      <div className="max-w-sm">
        <img src={cover} alt="" />
        <h1>xxxx to be changed xxxx</h1>
      </div>
    </section>
  );
}
