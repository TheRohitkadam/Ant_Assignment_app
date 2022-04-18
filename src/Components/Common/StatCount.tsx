import React, { CSSProperties } from "react";
import { Statistic, Row, Col, Badge, Card, Tooltip } from "antd";
import { InfoCircleOutlined, LikeOutlined } from "@ant-design/icons";
import Typography from "antd/lib/typography";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import "../../styles/layout.less";

const { Title, Text } = Typography;

const StatCount = ({
  color,
  count,
  title,
  infoTooltip,
  style
}: {
  color: string;
  count: number;
  title: string;
  infoTooltip?: boolean;
  style?: CSSProperties
}) => {
  return (
    <div style={{ marginBottom: 20, ...style }}>
      <Row>
        <Col flex="none" style={{ padding: 10, textAlign: "center" }}>
          <Badge
            dot
            offset={[0, -8]}
            color={`${color}`}
            size="default"
            className="badge"
            children={<></>}
            style={{ color: `${color}`, border: "none" }}
          />
        </Col>
        <Col flex="auto" style={{ paddingTop: 0 }}>
          <Statistic
            valueRender={() => <Text></Text>}
            suffix={
              <Text strong style={{ fontSize: 24 }}>
                {count}
              </Text>
            }
          />
          <Text type="secondary" style={{ marginLeft: 6 }}>
            {title}{" "}
          </Text>
          {infoTooltip && (
            <Tooltip title="Info" placement="bottom">
              <InfoCircleOutlined style={{paddingTop: 5, color: "grey"}}/>
            </Tooltip>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default StatCount;
