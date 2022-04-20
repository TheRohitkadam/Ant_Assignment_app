import { CSSProperties, FC } from "react";
import { Col, Row, Space, Typography } from "antd";
import AntBadge from "../../Common/AntBadge";

type Props = {
  data: any[];
};

type StatProps = {
  color: string;
  name: string;
  count: number;
  style?: CSSProperties;
};

const { Text } = Typography;

const Stat: FC<StatProps> = ({ color, name, count, style }) => (
  <Row justify="space-between" style={{ paddingLeft: 5, ...style }}>
    <Space>
      <AntBadge
        color={color}
        style={{ top: 4, borderRadius: name === "Inactive" ? 2 : "100%" }}
      />
      <Text style={{ marginLeft: 6, fontSize: 13 }}>{name}</Text>
    </Space>
    <Text>{count}</Text>
  </Row>
);

const StatsTable: FC<Props> = ({ data }) => {
  let AnalyticArr = [];
  AnalyticArr = data.filter((item) => item.data.name === "Analytic");
  let ActivityArr = [];
  ActivityArr = data.filter((item) => item.data.name === "Activity");

  const getCount = (arr: any) => {
    return Math.round(arr.reduce((n: number, { value }: any) => n + value, 0));
  };

  const getName = (StatName: string) => StatName.split("-")[1];

  const analyticCount = getCount(AnalyticArr);

  const activityCount = getCount(ActivityArr);

  return (
    <Row justify="space-between">
      <Col span={12} style={{ paddingRight: 30 }}>
        <Text strong style={{ color: "#e400eb", marginBottom: 10 }}>
          {analyticCount} Analytic
        </Text>
        {AnalyticArr.map((item: any, index: number) => (
          <Stat
            key={index}
            color={item.color}
            name={getName(item.data.subtype)}
            count={item.value}
            style={{ marginBlock: 10 }}
          />
        ))}
      </Col>
      <Col span={12} style={{ paddingLeft: 30 }}>
        <Text strong style={{ color: "#e400eb", marginBottom: 10 }}>
          {activityCount} Activity
        </Text>
        {ActivityArr.map((item: any, index: number) => (
          <Stat
            key={index}
            color={item.color}
            name={getName(item.data.subtype)}
            count={item.value}
            style={{ marginBlock: 10 }}
          />
        ))}
      </Col>
    </Row>
  );
};

export default StatsTable;
