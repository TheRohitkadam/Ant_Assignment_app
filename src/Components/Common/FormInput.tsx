import { Form, Input } from "antd";
import { Rule } from "antd/lib/form";

type FormInputType = {
  label: string;
  name: string;
  type?: string;
  rules?: Rule[] | undefined;
};

const FormInput = (props: FormInputType) => {
  return (
    <Form.Item label={props.label} name={props.name} rules={props.rules}>
      <Input placeholder={props.label} type={props.type} />
    </Form.Item>
  );
};

export default FormInput;
