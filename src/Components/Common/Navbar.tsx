import { Children, createElement, CSSProperties, ReactNode } from "react";
import {
  Layout,
  Menu,
  Typography,
  Row,
  Col,
  Button,
  Dropdown,
  Avatar,
  Image,
  Tooltip,
  Space,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  QuestionCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/Auth";
import { useSideNavState } from "./LayoutContainer";
import "../../styles/layout.less";

const { Header } = Layout;
const { Text, Title } = Typography;

type NavProps = {
  title?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

const Navbar = (props: NavProps) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { title } = props;
  const { collapsed, toggle } = useSideNavState();

  const menu = (
    <Menu>
      <Menu.Item>Settings</Menu.Item>
      <Menu.Item
        onClick={() => {
          auth.logout();
          navigate("/");
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="header"
      style={{
        paddingLeft: `${collapsed ? "100px" : "220px"}`,
        paddingRight: "20px",
        ...props.style,
      }}
    >
      <Row>
        <Col span={19} style={{ transition: "300ms" }}>
          <Space>{props.children}</Space>
        </Col>
        <Col
          span={5}
          style={{
            paddingLeft: collapsed ? 41 : 0,
            transition: "150ms",
          }}
        >
          <Space size={21}>
            <Tooltip placement="bottom" title="Ask a question">
              <QuestionCircleOutlined onClick={() => {}} />
            </Tooltip>
            <Tooltip placement="bottom" title="Notification">
              <BellOutlined onClick={() => {}} />
            </Tooltip>
            <Space size={10}>
              <Avatar
                style={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                }}
              >
                {auth.userName.charAt(0).toUpperCase()}
              </Avatar>
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  color="secondary"
                >
                  <Text strong>{auth.userName}</Text> <DownOutlined />
                </a>
              </Dropdown>
            </Space>
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
