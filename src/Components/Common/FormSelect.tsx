import { Form, Select } from "antd";
import { FilterFunc } from "rc-select/lib/Select";
import React, { CSSProperties, ReactNode } from "react";

type FormSelectType = {
  mode?: "multiple" | "tags";
  allowClear?: boolean;
  render: () => ReactNode;
  onChange?: () => void;
  label: string;
  name: string;
  FormItemStyle?: CSSProperties;
  FormSelectStyle?: CSSProperties;
  placeholder: string;
  showSearch?: boolean;
  optionFilterProp?: string;
  filterOption?: boolean | FilterFunc<any>;
  filterSort?: ((optionA: any, optionB: any) => number)
  maxTagCount?: number
};

const FormSelect = (props: FormSelectType) => {
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      style={props.FormItemStyle}
    >
      <Select
        showSearch={props.showSearch}
        optionFilterProp={props.optionFilterProp}
        mode={props.mode}
        style={props.FormSelectStyle}
        allowClear={props.allowClear}
        // placeholder={props.placeholder}
        placeholder="Location"
        onChange={props.onChange}
        filterOption={props.filterOption}
        filterSort={props.filterSort}
        maxTagCount={props.maxTagCount}
      >
        {props.render()}
      </Select>
    </Form.Item>
  );
};

export default FormSelect;
