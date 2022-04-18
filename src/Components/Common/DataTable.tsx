import {
  Table,
  Typography,
  Badge,
  Menu,
  Avatar,
  Image,
  Button,
  Modal,
  Row,
  Col,
  Space,
} from "antd";
import { useState, MouseEvent } from "react";
import {
  CaretDownOutlined,
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, Link, useNavigate } from "react-router-dom";
import data from "../../data/users.json";
import "../../styles/tabPane.less";

const { Text } = Typography;
const { confirm } = Modal;

type ColType = {
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

const CustomTable = () => {
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
      onCancel() {
      },
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
            {name.charAt(0).toUpperCase()}
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
        application.map((item: string) => (
          <>
            <Text>{item}, </Text>
          </>
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
            <Button type="primary" icon={<EditOutlined />} ghost>
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
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={infoData}
      rowKey={(record) => record._id}
      expandable={{
        expandedRowRender,
        expandIcon: ({ expanded, onExpand, record }) =>
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
  );
};

export default CustomTable;
