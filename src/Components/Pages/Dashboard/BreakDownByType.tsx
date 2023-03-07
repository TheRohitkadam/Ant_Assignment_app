import { useState } from "react";
import { Card, Typography } from "antd";
import CustomRadioBtn from "../../Common/CustomRadioBtn";
import {
  Application,
  BusinessProcess,
  BusinessUnit,
  Region,
} from "../../../data/BarChartData";
import "../../../styles/breakDownBarCard.less";
import BreakDownRow from "./BreakDownRow";

const { Title, Text } = Typography;

const BreakDownByType = () => {
  const [data, setData] = useState<any>(Application);

  const onChange = (e: any) => {
    if (e.target.value === "Applications") {
      setData(Application);
    } else if (e.target.value === "Business process") {
      setData(BusinessProcess);
    } else if (e.target.value === "Business unit") {
      setData(BusinessUnit);
    } else {
      setData(Region);
    }
  };

  return (
    <>
      <Title level={5} style={{ marginBottom: 30 }}>
        Breakdown by type
      </Title>
      <CustomRadioBtn
        defaultValue={"Applications"}
        options={[
          "Applications",
          "Business process",
          "Business unit",
          "Region",
        ]}
        onChangeHandler={onChange}
      />
      <Card
        className="breakDownBarCard"
        style={{ borderRadius: 10, marginTop: 20 }}
      >
        {data.map((item: any, index: number) => {
          return (
            <BreakDownRow
              key={index + 1}
              data={item}
              style={{ border: `${index === 3 && "none"}` }}
            />
          );
        })}
      </Card>
    </>
  );
};

export default BreakDownByType;
