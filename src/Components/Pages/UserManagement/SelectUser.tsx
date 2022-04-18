import { ChangeEvent, Dispatch, useContext, useState } from "react";
import { User } from "../../../types/userType";
import AntTable from "../../Common/AntTable";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import valConvert from "../../../utils/valConvert";
import { UserTableContext } from "../../../utils/UserTableContext";
import { ContextType } from "../../../types/userType";
import FormModal from "./FormModal";
import FilterHeader from "../../Common/FilterHeader";
import { SearchOutlined } from "@ant-design/icons";
import data from "../../../data/users.json";
import generateQuickGuid from "../../../utils/generateGuid";
import { map, includes, sortBy, uniqBy, each, result, get } from "lodash";
import capitalize from "../../../utils/capitalize";
import { UserDataType } from "../../../utils/UserContext";
import nameConcat from "../../../utils/nameConcat";

const { Text, Title } = Typography;

type Props = {
  selectedUser: {
    record: UserDataType;
    selected: boolean;
  };
  setSelectedUser: Dispatch<any>;
};

const initialValue = {
  _id: "",
  index: 0,
  guid: "",
  firstname: "",
  lastname: "",
  email: "",
  jobTitle: "",
  location: "",
  manager: "",
  office: "",
  application: [],
};

const SelectUser = (props: Props) => {
  const navigate = useNavigate();
  const {
    usersdata,
    saveUser,
    setUsersdata,
  } = useContext(UserTableContext) as ContextType;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [value, setValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userFormData, setUserFormData] = useState(initialValue);
  const [modalform] = Form.useForm();

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addUser = (values: any) => {
    const [name, val] = nameConcat(values);
    const userObj = {
      ...val,
      name,
      _id: (Math.random() + 1).toString(36).substring(3),
      index: usersdata.length + 1,
      guid: generateQuickGuid(),
      isActive: false,
      picture: "",
    };
    saveUser(userObj);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => {
        return a.name.localeCompare(b.name);
      },
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
      render: (application: []) => <Text>{valConvert(application)}</Text>,
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Location",
      dataIndex: "location",
      sorter: (a: any, b: any) => a.location.localeCompare(b.location),
      key: "location",
    },
    {
      title: "Office",
      dataIndex: "office",
      sorter: (a: any, b: any) => a.office.localeCompare(b.office),
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
      sorter: (a: any, b: any) => a.manager.localeCompare(b.manager),
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
  ];

  const rowSelection = {
    type: "radio",
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record: any, selected: any) => {
      props.setSelectedUser({ record, selected });
      console.log("selected", props.selectedUser);
    },
  };

  const filteredData = usersdata.filter((el) => {
    if (value === "") {
      return el;
    } else {
      return capitalize(el.name).includes(value);
    }
  });

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(capitalize(e.target.value));
  };

  return (
    <>
      <Title level={5} style={{ marginBottom: 0 }}>
        Select User
      </Title>
      <Row justify="space-between" style={{ marginBlock: 24 }}>
        <Col>
          <Input
            placeholder="Search"
            value={value}
            prefix={<SearchOutlined />}
            onChange={onSearch}
          />
        </Col>
        <Col>
          <Button
            style={{
              backgroundColor: "#4cab61",
              color: "#fff",
              border: "none",
            }}
            onClick={showModal}
          >
            Add User
          </Button>
        </Col>
      </Row>
      <FilterHeader />
      <AntTable
        size="small"
        scroll={{ x: 1300 }}
        dataSource={filteredData}
        columns={columns}
        rowKey={(record) => record._id}
        rowSelection={rowSelection}
      />
      <FormModal
        isModalVisible={isModalVisible}
        modalFormState={modalform}
        onCreate={addUser}
        handleCancel={handleCancel}
        initialValues={userFormData}
        dropdownOptionsData={usersdata}
      />
    </>
  );
};

export default SelectUser;
