import { Radio } from "antd";
import "../../styles/switch.less"

type PropType = {
  defaultValue: any;
  onChangeHandler: (e: any) => any;
  options:
    | string[]
    | number[]
    | Array<{ label: string; value: string; disabled?: boolean }>;
};

const CustomRadioBtn = (props: PropType) => {
  return (
    <Radio.Group
      className="custom-radio-btn"
      defaultValue={props.defaultValue}
      buttonStyle="outline"
      style={{ background: "#f8f9fe", padding: 4, borderRadius: 20 }}
      options={props.options}
      onChange={props.onChangeHandler}
    />
  );
};

export default CustomRadioBtn;
