import { useState } from "react";
import {
  Typography,
  Select,
  Mentions,
  Space,
  Button,
} from "antd";
import getArrObjElementValues from "../../utils/getArrObjElementValues";
import data from "../../data/users.json";

const { Text } = Typography;
const { Option } = Mentions;

const FilterHeader = () => {
  const [status, setStatus] = useState<boolean[]>([]);
  const [manager, setManager] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState<string[]>([]);

  const StatusOptions = getArrObjElementValues(data, "isActive");
  const ManagerOptions = getArrObjElementValues(data, "manager");
  const LocationOptions = getArrObjElementValues(data, "location");
  const JobTitleOptions = getArrObjElementValues(data, "jobTitle");


  const onStatusChange = (value: boolean[]) => {
    setStatus([...value]);
  };
  const onManagerChange = (value: string[]) => {
    setManager([...value]);
  };
  const onLocationChange = (value: any) => {
    setLocation([...value]);
  };
  const onJobTitleChange = (value: any) => {
    setJobTitle([...value]);
  };

  return (
    <Space size={15} style={{ marginBottom: 20 }}>
      <Select
        mode="tags"
        allowClear
        onChange={onStatusChange}
        placeholder="Filter By Status"
        style={{ minWidth: 140, minHeight: 32 }}
        value={status}
        maxTagCount={1}
        >
        <Select.Option value={false}>InActive</Select.Option>
        <Select.Option value={true}>active</Select.Option>
      </Select>
      <Select
        mode="tags"
        allowClear
        onChange={onManagerChange}
        value={manager}
        placeholder="Filter By Manager"
        maxTagCount={1}
        style={{ minWidth: 140, minHeight: 32 }}
        >
        {ManagerOptions.map((item: any, i) => (
          <Select.Option key={i.toString()} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <Select
        mode="tags"
        allowClear
        onChange={onLocationChange}
        value={location}
        placeholder="Filter By Location"
        style={{ minWidth: 140, minHeight: 32 }}
        maxTagCount={1}
        >
        {LocationOptions.map((item: any, i) => (
          <Select.Option value={item}>{item}</Select.Option>
          ))}
      </Select>
      <Select
        mode="tags"
        allowClear
        onChange={onJobTitleChange}
        value={jobTitle}
        placeholder="Filter By Job Title"
        style={{ minWidth: 140, minHeight: 32 }}
        maxTagCount={1}
      >
        {JobTitleOptions.map((item: any, i) => (
          <Select.Option key={i.toString()} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
      <Button
        style={{
          backgroundColor: "#ECF0FB",
          border: "none",
        }}
        onClick={(e) => {
          setStatus([]);
          setManager([]);
          setLocation([]);
          setJobTitle([]);
        }}
      >
        Clear All Filters
      </Button>
    </Space>
  );
};

export default FilterHeader;
