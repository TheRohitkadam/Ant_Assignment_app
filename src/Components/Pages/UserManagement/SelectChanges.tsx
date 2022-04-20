import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  useContext,
  useState,
} from "react";
import {
  Avatar,
  Button,
  Card,
  Space,
  Typography,
  Col,
  Table,
  Tag,
  Input,
  Row,
  Modal,
  Form,
  Dropdown,
  Select,
} from "antd";
import FilterHeader from "../../Common/FilterHeader";
import { UserContext, UserDataType } from "../../../utils/UserContext";
import AntTable from "../../Common/AntTable";
import {
  CaretDownOutlined,
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import data from "../../../data/users.json";
import { initialState } from "../../../utils/UserContext";
import { UserTableContext } from "../../../utils/UserTableContext";
import { ContextType } from "../../../types/userType";
import { ColType } from "../Dashboard";
import { Column } from "@ant-design/charts";
import arrToObj from "../../../utils/arrToObj";
import EditAccess from "./EditAccess";
import nameSeparator from "../../../utils/nameSeparator";
import nameConcat from "../../../utils/nameConcat";
import getArrObjElementValues from "../../../utils/getArrObjElementValues";

const { Title, Text } = Typography;
const { Option } = Select;

type Props = {
  selectedUser: {
    record: UserDataType;
    selected: boolean;
  };
  setSelectedUser: Dispatch<any>;
  collapsed?: boolean;
};

const SelectChanges = (props: Props) => {
  const [firstname, lastname] = nameSeparator(props.selectedUser.record.name);
  const userinfo = {
    firstname,
    lastname,
    ...props.selectedUser.record,
  };

  const { usersdata, saveUser } = useContext(UserTableContext) as ContextType;

  const [selectedRowKeys, setSelectedRowKeys] = useState();
  const [userFormData, setUserFormData] = useState(userinfo);
  const [dataSource, setDataSource] = useState(userFormData);
  const [application, setApplication] = useState(
    props.selectedUser.record.application
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [modalform] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function isEmpty(str: string) {
    return !str.trim().length;
  }

  const valConverter = (value: any) => {
    const val =
      value.length !== 1 ? `${value[0]} +${value.length - 1}` : `${value[0]}`;
    return val;
  };

  const navigate = useNavigate();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any) => (
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
      width: "10%",
      render: (application: []) => <Text>{valConverter(application)}</Text>,
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
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
      width: "14%",
      render: (manager: string) => (
        <Space size="small">
          <Avatar
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
          >
            {`${manager.charAt(0).toUpperCase()}${manager
              .charAt(1)
              .toUpperCase()}`}
          </Avatar>
          <Text style={{ cursor: "pointer" }} strong>
            {manager}
          </Text>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) =>
        isActive ? (
          <Tag
            style={{
              color: "#49AE8A",
              border: "none",
              backgroundColor: "#F2FDF9",
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            Active
          </Tag>
        ) : (
          <Tag
            style={{
              color: "#F04A4F",
              border: "none",
              backgroundColor: "#FDF1F0",
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            Inactive
          </Tag>
        ),
    },
    {
      title: "Action",
      render: (isActive: boolean) => (
        <Button
          type="text"
          style={{
            backgroundColor: "#4cab61",
            color: "#fff",
            border: "none",
          }}
          onClick={() => {
            console.log(" is active", props.selectedUser.record.isActive);

            setIsModalVisible(true);
            setUserFormData(userinfo);
          }}
        >
          Edit Access
        </Button>
      ),
    },
  ];

  const managerOptions = getArrObjElementValues(data, "manager");

  const locationOptions = getArrObjElementValues(data, "location");

  const applicationOptions = getArrObjElementValues(data, "application", true);

  const children: any = [];
  applicationOptions.forEach((application: any, i: number) => {
    children.push(
      <Select.Option key={application.toString()}>
        {application.toString()}
      </Select.Option>
    );
  });

  const expandedRowRender = () => {
    const columns = [
      {
        title: "Application",
        dataIndex: "name",
        key: "name",
      },
    ];

    return (
      <AntTable
        columns={columns}
        pagination={false}
        dataSource={arrToObj(props.selectedUser.record.application)}
        rowKey={(record) => record.id}
      />
    );
  };

  return (
    <>
      <Title level={5} style={{ marginBottom: 40 }}>
        Select Changes
      </Title>
      <AntTable
        dataSource={[props.selectedUser.record]}
        columns={columns}
        size="small"
        scroll={{ x: 1200 }}
        rowKey={(record) => record._id}
        pagination={false}
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
      <EditAccess isModalVisible={isModalVisible} record={props.selectedUser.record}/>
      {/* <Modal
        visible={isModalVisible}
        onOk={() => {
          console.log("clicked");

          props.setSelectedUser({
            record: { ...props.selectedUser.record, isActive, application },
          });
          console.log("cl", props.selectedUser.record.isActive);
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        <Space direction="vertical" style={{ paddingLeft: 20 }}>
          <div style={{ textAlign: "left", marginBottom: 20 }}>
            <Avatar
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
              }}
              size={64}
            >
              {`${props.selectedUser.record.name
                .charAt(0)
                .toUpperCase()}${props.selectedUser.record.name
                .charAt(1)
                .toUpperCase()}`}
            </Avatar>
          </div>
          <div>
            <Text strong>Name: </Text>
            {props.selectedUser.record.name}
          </div>
          <div>
            <Text strong>Application: </Text>
            <Select
              mode="multiple"
              maxTagTextLength={3}
              maxTagCount={3}
              onChange={(value) => setApplication(value)}
              value={application}
              style={{ minWidth: 100 }}
            >
              {children}
            </Select>
          </div>
          <div>
            <Text strong>Job Title: </Text>
            {props.selectedUser.record.jobTitle}
          </div>
          <div>
            <Text strong>Location: </Text>
            {props.selectedUser.record.location}
          </div>
          <div>
            <Text strong>Office: </Text>
            {props.selectedUser.record.office}
          </div>
          <div>
            <Text strong>Email: </Text>
            {props.selectedUser.record.email}
          </div>
          <div>
            <Text strong>Manager: </Text>
            {props.selectedUser.record.manager}
          </div>
          <div>
            <Text strong>Status: </Text>
            <Select
              defaultValue={props.selectedUser.record.isActive}
              bordered={false}
              onChange={(value) => setIsActive(value)}
            >
              <Select.Option value={true}>
                <Text
                  style={{
                    border: "none",
                    color: "#8BB58A",
                    backgroundColor: "#F2FDF9",
                    fontWeight: "600",
                    fontSize: 14,
                    minWidth: 70,
                    textAlign: "center",
                    padding: 7,
                  }}
                >
                  Active
                </Text>
              </Select.Option>
              <Select.Option value={false}>
                <Text
                  style={{
                    border: "none",
                    color: "#F37C5D",
                    backgroundColor: "#FDF1F0",
                    fontSize: 14,
                    fontWeight: "600",
                    minWidth: 70,
                    padding: 7,
                    textAlign: "center",
                  }}
                >
                  InActive
                </Text>
              </Select.Option>
            </Select>
          </div>
        </Space>
      </Modal> */}
    </>
  );
};

export default SelectChanges;
