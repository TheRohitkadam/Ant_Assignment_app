import { Children, FC } from "react";
import { Tabs } from "antd";

const AntTabs: FC = () => {
  return <Tabs>{Children}</Tabs>;
};

export default AntTabs;
