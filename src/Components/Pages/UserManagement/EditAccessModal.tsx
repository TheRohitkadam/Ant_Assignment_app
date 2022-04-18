import { Avatar, Form, FormInstance, Modal, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { SetStateAction, useContext } from "react";
import { ContextType } from "../../../types/userType";
import getArrObjElementValues from "../../../utils/getArrObjElementValues";
import { UserTableContext } from "../../../utils/UserTableContext";
import FormInput from "../../Common/FormInput";
import FormSelect from "../../Common/FormSelect";
import "../../../styles/editAccessModal.less"

type EditAccessType = {
  isModalVisible: boolean;
  modalFormState: FormInstance;
  onCreate: (values: any) => void;
  handleCancel: () => void;
  initialValues: any;
  setRequired?: (value: SetStateAction<boolean>) => void;
  dropdownOptionsData: any;
  name: string;
};

const EditAccess = (props: EditAccessType) => {
  const { usersdata, saveUser, setUsersdata } = useContext(
    UserTableContext
  ) as ContextType;

  const managerOptions = getArrObjElementValues(
    props.dropdownOptionsData,
    "manager"
  );

  const locationOptions = getArrObjElementValues(
    props.dropdownOptionsData,
    "location"
  );

  const applicationOptions: any[] = getArrObjElementValues(
    props.dropdownOptionsData,
    "application",
    true
  );

  const children: any[] = [];
  applicationOptions.forEach((application: any, i: number) => {
    children.push(
      <Option key={application.toString()}>{application.toString()}</Option>
    );
  });

  return (
    <Modal
      title="Add User"
      visible={props.isModalVisible}
      style={{ top: 30 }}
      onOk={() => {
        props.modalFormState
          .validateFields()
          .then((values) => {
            props.onCreate(values);
            props.modalFormState.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
        props.handleCancel();
      }}
      onCancel={() => {
        props.modalFormState.resetFields();
        props.handleCancel();
      }}
    >
      <Form
        className="edit-access-modal"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        form={props.modalFormState}
        initialValues={props.initialValues}
        style={{ width: 470 }}
        onFinish={(values) => {
          values.setUserFormData(values);
          // props.setRequired(true);
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Avatar
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
            size={64}
          >
            {`${props.name.charAt(0).toUpperCase()}${props.name
              .charAt(1)
              .toUpperCase()}`}
          </Avatar>
        </div>
        <FormInput label="Firstname" name="firstname" />
        <FormInput label="Lastname" name="lastname" />
        <FormInput label="Email" name="email" />
        <FormSelect
          label="Location"
          name="location"
          placeholder="Location"
          showSearch
          optionFilterProp="children"
          filterOption={(input: string, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
          render={() =>
            locationOptions.map((item: any, i: number) => (
              <Select.Option key={i.toString()} value={item}>
                {item}
              </Select.Option>
            ))
          }
        />
        <FormInput label="Office" name="office" />
        <FormInput label="Job Title" name="jobTitle" />
        <FormSelect
          label="Manager"
          name="manager"
          placeholder="Manager"
          render={() =>
            managerOptions.map((item: any, i: number) => (
              <Select.Option key={i.toString()} value={item}>
                {item}
              </Select.Option>
            ))
          }
        />
        <FormSelect
          mode="multiple"
          allowClear
          label="Application"
          name="application"
          placeholder="Please select"
          render={() => children}
          FormSelectStyle={{ width: "100%" }}
        />
      </Form>
    </Modal>
  );
};

export default EditAccess;
