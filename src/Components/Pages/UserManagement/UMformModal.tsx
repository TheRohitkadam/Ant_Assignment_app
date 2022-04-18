import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  appOptions,
  jobOptions,
  locationOptions,
  managerOptions,
  officeLocationMapping,
} from "./UMFormOptions";
import { addUser, updateUser } from "../../../redux/actions/actions";
import nameConcat from "../../../utils/nameConcat";
import { values } from "lodash";
import { format } from "path";

type Props = {
  formData: any;
  setFormData: Dispatch<SetStateAction<{}>>;
  modalState: {
    viewForm: boolean;
    modalName: string;
  };
  toggleForm: (formTitle: "Add User" | "Edit User") => void;
};

const emptyFormData = {
  firstname: "",
  lastname: "",
  email: "",
  manager: "",
  jobTitle: "",
  location: "",
  office: "",
  application: [],
};

const UMformModal: FC<Props> = ({
  modalState,
  toggleForm,
  formData,
  setFormData,
}) => {
  const [modalform] = Form.useForm();
  const dispatch = useDispatch();
  const tableData = useSelector((state: any) => state.tableReducer);

  // const callback = useCallback(() => {
  //   console.log("callback triggered");
  // }, [tableData.limitedUsers]);

  useEffect(() => {
    if (modalState.modalName === "Edit User") {
      modalform.setFieldsValue(formData);
    }
  }, [modalState.viewForm]);

  return (
    <Modal
      title={modalState.modalName}
      visible={modalState.viewForm}
      style={{ top: 30 }}
      onCancel={() => {
        toggleForm("Add User");
        modalform.resetFields();
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        form={modalform}
        initialValues={emptyFormData}
        onFieldsChange={(changedValues, allValues) => {
          const objKey = allValues[3].value;
          modalform.setFieldsValue({
            office: officeLocationMapping[objKey],
          });
        }}
        onFinish={(values) => {
          modalform.validateFields().then((val) => {
            if (modalState.modalName === "Add User") {
              dispatch(addUser(values));
            } else {
              const [name, val] = nameConcat(values);
              
              const user = {
                ...val,
                name,
                _id: formData._id,
                index: formData.index,
                guid: formData.guid,
                isActive: formData.isActive,
                picture: formData.picture,
              };
              
              console.log("user", user);
              
              dispatch(updateUser(user));
            }
          });
          modalform.resetFields();
          toggleForm("Add User");
          // callback()
        }}
        >
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[{ required: true }]}
          >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true }]}
        >
          <Select>
            {locationOptions.map((item: string, index: number) => (
              <Select.Option key={index.toString()} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Office" name="office" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Job Title"
          name="jobTitle"
          rules={[{ required: true }]}
        >
          <Select>
            {jobOptions.map((item: string, index: number) => (
              <Select.Option key={index.toString()} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Manager" name="manager" rules={[{ required: true }]}>
          <Select>
            {managerOptions.map((item: string, index: number) => (
              <Select.Option key={index.toString()} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Application"
          name="application"
          rules={[{ required: true }]}
        >
          <Select mode="multiple" allowClear maxTagCount={5}>
            {appOptions.map((item: string, index: number) => (
              <Select.Option key={index.toString()} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UMformModal;
