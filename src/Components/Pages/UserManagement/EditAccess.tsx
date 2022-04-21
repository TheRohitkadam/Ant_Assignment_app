import {
  Avatar,
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
  Typography,
} from "antd";
import { Option } from "antd/lib/mentions";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { ContextType } from "../../../types/userType";
import getArrObjElementValues from "../../../utils/getArrObjElementValues";
import { UserTableContext } from "../../../utils/UserTableContext";
import FormInput from "../../Common/FormInput";
import FormSelect from "../../Common/FormSelect";
import "../../../styles/editAccessModal.less";

type EditAccessType = {
  isModalVisible: boolean;
  modalFormState?: FormInstance;
  onCreate?: (values: any) => void;
  handleCancel?: () => void;
  initialValues?: any;
  setRequired?: (value: SetStateAction<boolean>) => void;
  dropdownOptionsData?: any;
  name?: string;
  record: any;
  setIsModalVisible?: Dispatch<SetStateAction<boolean>>;
};

const { Text } = Typography;

const EditAccess = (props: EditAccessType) => {
  // const { usersdata, saveUser, setUsersdata } = useContext(
  //   UserTableContext
  // ) as ContextType;

  // const managerOptions = getArrObjElementValues(
  //   props.dropdownOptionsData,
  //   "manager"
  // );

  // const locationOptions = getArrObjElementValues(
  //   props.dropdownOptionsData,
  //   "location"
  // );

  // const applicationOptions: any[] = getArrObjElementValues(
  //   props.dropdownOptionsData,
  //   "application",
  //   true
  // );

  // const children: any[] = [];
  // applicationOptions.forEach((application: any, i: number) => {
  //   children.push(
  //     <Select.Option key={application.toString()}>
  //       {application.toString()}
  //     </Select.Option>
  //   );
  // });

  return (
    <Modal
      title="Edit Access"
      visible={props.isModalVisible}
      footer={null}
      style={{ top: 30 }}
      onOk={() => {}}
      onCancel={() => {
        // props.setIsModalVisible(!props.isModalVisible);
      }}
    >
      <Form
        initialValues={props.record}
        // layout="vertical"
        onFinish={(values) => console.log("values", values)}
      >
        <Form.Item>
          <Avatar
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
            size={64}
          >
            {`${props.record.name
              .charAt(0)
              .toUpperCase()}${props.record.name.charAt(1).toUpperCase()}`}
          </Avatar>
        </Form.Item>
        <Form.Item label="name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Applications" name="application">
          <Select mode="multiple" maxTagTextLength={3} maxTagCount={3}></Select>
        </Form.Item>
        <Form.Item label="Job Title" name="jobTitle">
          <Input />
        </Form.Item>
        <Form.Item label="Location" name="location">
          <Input />
        </Form.Item>
        <Form.Item label="Office" name="office">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Manager" name="manager">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="isActive">
          <Select
            defaultValue={props.record.isActive}
            bordered={false}
            // onChange={(value) => setIsActive(value)}
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
        </Form.Item>
        <Form.Item htmlFor="submit">
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAccess;
