import { InfoCircleOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Space, Typography } from "antd";
import { CSSProperties, FC } from "react";
import AntBarChart from "./AntBarChart";

type Props = {
  style?: CSSProperties;
  data: any;
};

const { Text } = Typography;

const BreakDownRow: FC<Props> = ({ data, style }) => {
  return (
    <Row style={{ borderBottom: "1px solid #f0f0f0", ...style }}>
      <Col flex="400px">
        <div
          style={{
            paddingLeft: 20,
            height: "100%",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Space size="small">
            <Avatar
              style={{
                color: "#fff",
                backgroundColor: "#999",
              }}
            >
              {`${data.name.charAt(0).toUpperCase()}${data.name
                .charAt(1)
                .toUpperCase()}`}
            </Avatar>
            <Text>{data.name}</Text>
          </Space>
        </div>
      </Col>
      <Col
        flex="97px"
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "space-between",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBlock: 6,
          paddingRight: 2,
        }}
      >
        {data.chartData.map((item: any, index: number) => {
          return (
            <Space key={index}>
              <Text style={{ fontSize: 12 }}>{item.title}</Text>
              <InfoCircleOutlined
                style={{
                  height: 2,
                  width: 2,
                  marginRight: 7,
                  cursor: "pointer",
                }}
                onClick={() => {}}
              />
              <div style={{ textAlign: "right", width: 30 }}>
                <Text style={{ fontSize: 12 }}>{item.value}%</Text>
              </div>
            </Space>
          );
        })}
      </Col>
      <Col flex="auto">
        <AntBarChart chartData={data.chartData} />
      </Col>
    </Row>
  );
};

export default BreakDownRow;
