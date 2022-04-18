import {
  Typography,
  Row,
  Col,
  Button,
  Tabs,
  Card,
  Space,
  Divider,
  Statistic,
  Tooltip,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import useNameSplit from "../../../utils/useNameSplit";
import {
  InfoCircleOutlined,
} from "@ant-design/icons";
import StatCount from "../../Common/StatCount";
import Data from "../../../data/users.json";
import LineGraph from "../../Common/LineGraph";
import "../../../styles/layout.less";
import "../../../styles/tabPane.less";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

type PropType = {
    userProfile?: boolean;
};

const OverviewTab = (props: PropType) => {
  const { userProfile } = props;
  const Location = useLocation();

  const userData: any = userProfile ? Location.state : Data[0];
  const [firstName, lastName] = useNameSplit(userData.name);

  return (
    <>
      <div>
        {!userProfile && (
          <Card
            className="details-box"
            style={{
              backgroundColor: "transparent",
              border: "1px solid darkgrey",
              borderRadius: 10,
            }}
          >
            <Row>
              <Col span={5}>
                <Text>
                  First name
                  <Tooltip placement="bottom" title="Ask a question">
                    <Button
                      shape="circle"
                      icon={<InfoCircleOutlined />}
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                    />
                  </Tooltip>
                </Text>
                <div>
                  <Text>{firstName}</Text>
                </div>
              </Col>
              <Col span={5}>
                <Text>
                  Last name
                  <Tooltip placement="bottom" title="Ask a question">
                    <Button
                      shape="circle"
                      icon={<InfoCircleOutlined />}
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                    />
                  </Tooltip>
                </Text>
                <div>
                  <Text>{lastName}</Text>
                </div>
              </Col>
              <Col span={5} style={{ paddingTop: 7 }}>
                <Text>Job title</Text>
                <div style={{ marginTop: 3 }}>
                  <Text>{userData.jobTitle}</Text>
                </div>
              </Col>
              <Col span={5}>
                <Text>
                  Email
                  <Tooltip placement="bottom" title="Ask a question">
                    <Button
                      shape="circle"
                      icon={<InfoCircleOutlined />}
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                    />
                  </Tooltip>
                </Text>
                <div>
                  <Text>{userData.email}</Text>
                </div>
              </Col>
              <Col span={4} style={{ paddingTop: 7 }}>
                <Text>Location</Text>
                <div style={{ marginTop: 3 }}>
                  <Text>{userData.location}</Text>
                </div>
              </Col>
            </Row>
          </Card>
        )}
        {userProfile && (
          <Card style={{ borderRadius: 10 }}>
            <Title level={4} style={{ marginBottom: 10 }}>
              Timeline
            </Title>
            <Space size={110} wrap style={{ marginBottom: 50 }}>
              <StatCount color="purple" count={3} title="Cars" />
              <StatCount
                color="blue"
                count={7}
                title="Violations"
                infoTooltip
              />
              <StatCount
                color="green"
                count={24}
                title="Risk score"
                infoTooltip
              />
              <Divider type="vertical" style={{ height: 60 }} />
            </Space>
            <Space size={20} wrap>
              <Statistic
                value={3768}
                prefix="$"
                valueStyle={{ color: "grey" }}
              />
              <div style={{ paddingTop: 50 }}>
                <Text type="secondary">Impact</Text>
              </div>
            </Space>
            <LineGraph />
          </Card>
        )}
      </div>
    </>
  );
};

export default OverviewTab;
