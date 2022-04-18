import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Avatar, Button, Modal, Space, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import valConvert from "../../../utils/valConvert";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import AntTable from "../../Common/AntTable";
import {
  removeUser,
  setLimitedData,
  setPagiation,
  setSelectRowKeys,
} from "../../../redux/actions/actions";
import nameSeparator from "../../../utils/nameSeparator";

const { Text, Title } = Typography;
const { confirm } = Modal;

type Props = {
  formData: any;
  setFormData: Dispatch<SetStateAction<{}>>;
  modalState: {
    viewForm: boolean;
    modalName: string;
  };
  toggleForm: (formTitle: "Add User" | "Edit User") => void;
};

const UMTable: FC<Props> = ({
  modalState,
  toggleForm,
  formData,
  setFormData,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state: any) => state.tableReducer);

  useEffect(() => {
    onTableChange({ current: store.current, pageSize: store.pageSize });
    console.log("store", store.usersCount, store.limitedUsers.length, store.current, store.pageSize);
    
  }, [store.renderCount]);

  const showPropsConfirm = (record: any) =>
    confirm({
      title: "Are you sure want to delete this user?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      okButtonProps: {
        disabled: false,
      },
      cancelText: "No",
      onOk() {
        dispatch(removeUser(record.guid));
      },
      onCancel() { },
    });

  const onSelectChange = (selectedRowKeys: any) => {
    dispatch(setSelectRowKeys(selectedRowKeys));
  };

  const onEditFormToggle = (record: any) => {
    const [firstname, lastname] = nameSeparator(record.name);
    const formState = {
      ...record,
      firstname,
      lastname,
    };
    setFormData(formState);
    toggleForm("Edit User");
  };

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
      render: (application: []) => <Text>{valConvert(application)}</Text>,
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
      key: "action",
      render: (action: any, record: any) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            ghost
            size="small"
            onClick={() => onEditFormToggle(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => showPropsConfirm(record)}
            icon={<DeleteOutlined />}
            danger
            ghost
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys: store.selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record: any, selected: any) => { },
  };

  const onTableChange = (pagination: any) => {
    dispatch(setLimitedData(pagination));
    dispatch(setPagiation(pagination))
  };

  return (
    <AntTable
      onChange={onTableChange}
      size="small"
      loading={store.tableLoading}
      columns={columns}
      dataSource={store.limitedUsers}
      rowKey={(record) => record.guid}
      rowSelection={rowSelection}
      scroll={{ x: 1500 }}
      pagination={{
        showSizeChanger: true,
        total: store.usersCount,
      }}
    />
  );
};

export default UMTable;
