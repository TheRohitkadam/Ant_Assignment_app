import { Fragment, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Space,
  Typography,
  Button,
  Table,
  Avatar,
  Row,
  Col,
  Modal,
  Divider,
  Card,
} from "antd";
import {
  CaretDownOutlined,
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Navbar from "../Common/Navbar";
import { useSideNavState } from "../Common/LayoutContainer";
import StatCount from "../Common/StatCount";
import "../../styles/dashboard.less";
import AntTable from "../Common/AntTable";
import data from "../../data/users.json";
import * as randomUserData from "../../data/randomUsers.json";
import RandomUserTable from "./Dashboard/RandomUserTable";
import CountryGraph, { usersByCountry } from "./Dashboard/CountryGraph";
import getRandomColor from "../../utils/getRandomColor";
import getArrObjElementValues from "../../utils/getArrObjElementValues";
import UsersTable from "./Dashboard/UsersTable";
import AxiosTable from "./Dashboard/AxiosTable";
import StackChart from "./Dashboard/StackChart";
import BreakDownByType from "./Dashboard/BreakDownByType";

const { Content } = Layout;
const { Title, Text } = Typography;
const { confirm } = Modal;

export type ColType = {
  title?: string;
  dataIndex?: string;
  key?: string;
  children?: ColType[];
  showHeader?: boolean;
  render?: (text: any, record: any) => JSX.Element;
};

const userData = [
  {
    name: "Rohit kadam",
    username: "rohitkadam",
    email: "me.rohitkadam@gmail.com",
    gender: "Male",
    phone: "1234567891",
  },
];

const Dashboard = () => {
  const randomUser: any = randomUserData;

  const { collapsed, toggle } = useSideNavState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [infoData, setInfoData] = useState(data);
  const navigate = useNavigate();

  const showPropsConfirm = (record: any) => {
    return confirm({
      title: "Are you sure delete this user?",
      icon: <ExclamationCircleOutlined />,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      okButtonProps: {
        disabled: false,
      },
      cancelText: "No",
      onOk() {
        let info = infoData.filter((user) => user._id !== record._id);
        setInfoData(info);
      },
      onCancel() {},
    });
  };

  const columns: ColType[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <Space size="small">
          <Avatar
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
          >
            {`${name.charAt(0).toUpperCase()}${name.charAt(1).toUpperCase()}`}
          </Avatar>
          <Text
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate("/userprofile", {
                state: record,
              })
            }
            strong
          >
            {name}
          </Text>
        </Space>
      ),
    },
    {
      title: "Application",
      dataIndex: "application",
      key: "application",
      render: (application) =>
        application.map((item: string, index: number) => (
          <Fragment key={index}>
            <Text>{item}, </Text>
          </Fragment>
        )),
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Office",
      dataIndex: "office",
      key: "office",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (action, record) => (
        <div style={{ display: "flex" }}>
          <Col>
            <Button type="primary" icon={<EditOutlined />} ghost size="small">
              Edit
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              style={{ marginLeft: 10 }}
              onClick={() => showPropsConfirm(record)}
              icon={<DeleteOutlined />}
              danger
              ghost
              size="small"
            >
              Delete
            </Button>
          </Col>
        </div>
      ),
    },
  ];

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const expandedRowRender = () => {
    const columns = [
      {
        title: "name",
        dataIndex: "name",
        key: "name",
        render: (name: string[]) => <Text>{name}</Text>,
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
      },
    ];

    return <Table columns={columns} pagination={false} dataSource={userData} />;
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const gender = getArrObjElementValues(randomUser.results, "gender");
  const maleCount = randomUser.results.filter(
    (item: { gender: string }) => item.gender === "male"
  );
  const femaleCount = randomUser.results.filter(
    (item: { gender: string }) => item.gender === "female"
  );

  return (
    <>
      <Navbar>
        <Button
          shape="circle"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          style={{ border: "none", color: "#111" }}
          onClick={toggle}
        />
        <Title level={4} style={{ margin: "18px 0px" }}>
          Dashboard
        </Title>
      </Navbar>
      <Content
        style={{
          margin: `80px 20px 20px ${collapsed ? "100px" : "220px"}`,
        }}
      >
        <Card style={{ borderRadius: 10, marginBottom: 20 }}>
          <BreakDownByType />
        </Card>
        <Card style={{ borderRadius: 10, marginBottom: 20 }}>
          <Space size={10} wrap style={{ marginBottom: 20 }}>
            <StatCount
              title="Male"
              style={{ width: 133 }}
              count={maleCount.length}
              infoTooltip
              color={getRandomColor()}
            />
            <StatCount
              title="female"
              style={{ width: 133 }}
              count={femaleCount.length}
              infoTooltip
              color={getRandomColor()}
            />
            <Divider
              type="vertical"
              style={{ height: 60, verticalAlign: "top" }}
            />
            {usersByCountry.map((item, index) => (
              <StatCount
                key={index}
                style={{ width: item.country === "United Kingdom" ? 148 : 130 }}
                color={item.color}
                title={item.country}
                count={item.users}
                infoTooltip
              />
            ))}
          </Space>
          <RandomUserTable />
        </Card>
        <Card style={{ borderRadius: 10, marginBottom: 20 }}>
          <StackChart />
        </Card>
        <Card style={{ borderRadius: 10, marginBottom: 20 }}>
          <AxiosTable />
        </Card>
        <Card
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Space size={80} wrap style={{ marginRight: 30 }}>
            <StatCount color="blue" count={31} title="Users" />
            <StatCount color="purple" count={23} title="Risk" />
          </Space>
          <AntTable
            rowSelection={rowSelection}
            columns={columns}
            dataSource={infoData}
            scroll={{ x: 1300 }}
            size="small"
            rowKey={(record: { _id: any }) => record._id}
            expandable={{
              expandedRowRender,
              expandIcon: ({ expanded, onExpand, record }: any) =>
                expanded ? (
                  <CaretDownOutlined
                    style={{ color: "green" }}
                    onClick={(event: MouseEvent<HTMLElement>) =>
                      onExpand(record, event)
                    }
                  />
                ) : (
                  <CaretRightOutlined
                    onClick={(event: MouseEvent<HTMLElement>) =>
                      onExpand(record, event)
                    }
                  />
                ),
            }}
          />
        </Card>
        <Card style={{ borderRadius: 10, marginBottom: 20 }}>
          <CountryGraph />
        </Card>
      </Content>
    </>
  );
};

export default Dashboard;
