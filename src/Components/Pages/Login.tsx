import React, { ChangeEvent, useState } from "react";
import { Form, Row, Col, Typography, Button, Checkbox } from "antd";
import { Input, Space } from "antd";
import {
  CopyrightOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../styles/login.less";
import logo from "../../assets/antdesign.svg";
import background from "../../assets/container_background.svg";
import { useAuth } from "../../utils/Auth";

const { Text } = Typography;

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    isChecked: false,
  });
  const auth = useAuth();
  const navigate = useNavigate()
  
  
  const onFinish = () => {
    auth.login(loginData.username, loginData.password);
    navigate('/', { replace: true });
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // const castEvent = event as unknown as React.ChangeEvent<HTMLInputElement>;
    //   const target = event.target;
    //   const value =
    //     target.type === "checkbox" ? castEvent.target.checked : target.value;
    //   const name = target.name;
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <Row style={{ height: "100vh" }}>
        <Col xs={2} sm={4} md={6} lg={8} xl={7} />
        <Col xs={20} sm={16} md={12} lg={8} xl={10}>
          <div className="container">
            <div className="title">
              <img src={logo} width="100" height="50" />
              <h1>Ant Design</h1>
            </div>
            <Text type="secondary">
              Ant Design is the most influential web design specification in
              Xuhu district.
            </Text>
            <Space direction="vertical" style={{ marginTop: 60 }} size={10}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username: admin or user"
                    onChange={changeHandler}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    name="username"
                  />
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
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    name="password"
                    placeholder="Password: ant design"
                    onChange={changeHandler}
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <a className="login-form-forgot" href="">
                    Forgot password ?
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ width: "100%" }}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
              <Row
                justify="center"
                align="middle"
                style={{ marginTop: 170, width: "100%" }}
              >
                <Col span={7}>
                  <Text type="secondary">Ant Design Pro</Text>
                </Col>
                <Col span={2} style={{ marginLeft: 30, marginRight: 20 }}>
                  <GithubOutlined style={{ fontSize: "16px", color: "grey" }} />
                </Col>
                <Col span={7}>
                  <Text type="secondary">Ant Design</Text>
                </Col>
              </Row>
              <Text type="secondary">
                <CopyrightOutlined /> 2021 Produced by Ant Financial Experiance
                Department
              </Text>
            </Space>
          </div>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={7} style={{ padding: 20 }}>
          <Row>
            <Col flex="auto"></Col>
            <span className="material-icons">&#xE8E2;</span>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
