import React from "react";
import { Layout, Typography, Row, Col, Tabs, Card, Select, Avatar } from "antd";
import { Option } from "antd/lib/mentions";
import { ArrowLeftOutlined, MoreOutlined } from "@ant-design/icons";
import "../../../styles/layout.less";
import "../../../styles/tabPane.less";
import AreaChart from "../../Common/AreaChart";

const { Text, Title } = Typography;

const ActivityTab = () => {
  return (
    <div className="profile-tab">
      <Card style={{ borderRadius: 10 }}>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col>
            <Title level={4}>Activity</Title>
          </Col>
          <Col>
            <span
              style={{
                padding: 5,
                marginRight: 20,
                backgroundColor: "#ECF0FB",
              }}
            >
              <Select
                bordered={false}
                defaultValue="username"
                size="middle"
                dropdownStyle={{ width: 70 }}
              >
                <Option value="username">
                  <Text strong>Last 7 days</Text>
                </Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
              </Select>
            </span>
            <MoreOutlined />
          </Col>
        </Row>
        <AreaChart />
      </Card>
    </div>
  );
};

export default ActivityTab;
