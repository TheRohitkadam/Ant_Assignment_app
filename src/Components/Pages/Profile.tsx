import { Layout, Typography, Row, Col, Tabs, Card, Select, Avatar } from "antd";
import "../../styles/layout.less";
import Navbar from "../Common/Navbar";
import { useSideNavState } from "../Common/LayoutContainer";
import { useLocation, useNavigate } from "react-router-dom";
import useNameSplit from "../../utils/useNameSplit";
import { Option } from "antd/lib/mentions";
import { ArrowLeftOutlined, MoreOutlined } from "@ant-design/icons";
import Data from "../../data/users.json";
import "../../styles/tabPane.less";
import AreaChart from "../Common/AreaChart";
import { useAuth } from "../../utils/Auth";
import OverviewTab from "./Tabs/OverviewTab";
import AlertsTab from "./Tabs/AlertsTab";
import AccessTab from "./Tabs/AccessTab";
import ActivityTab from "./Tabs/ActivityTab";

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Profile = ({ isUserProfile }: { isUserProfile?: boolean }) => {
  const { collapsed } = useSideNavState();
  const navigate = useNavigate();
  const Location = useLocation();
  const auth = useAuth();

  const userData: any = isUserProfile ? Location.state : Data[0];

  return (
    <>
      <Navbar
        title="Home Dashboard"
        style={{ backgroundColor: "transparent", position: "relative" }}
      >
        <ArrowLeftOutlined onClick={() => navigate("/")} />
        <Text style={{ margin: "18px 0px" }}>Home</Text>
      </Navbar>
      <Content
        className="layout"
        style={{
          padding: `0px 20px 20px ${collapsed ? "100px" : "220px"}`,
          backgroundColor: "transparent",
        }}
      >
        <Row style={{ padding: 0, marginBottom: 24 }}>
          <Col span={2}>
            {/* Passing image as a Avatar -> */}
            {/* <Image
              width={80}
              style={{ borderRadius: "100%" }}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              // src={userData.picture}
              preview={{
                maskClassName: "customize-mask",
              }}
            /> */}
            <Avatar
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                minWidth: 80,
                minHeight: 80,
                verticalAlign: "middle",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 38,
              }}
              size={100}
            >
              {isUserProfile
                ? userData.name.charAt(0).toUpperCase()
                : auth.userName.charAt(0).toUpperCase()}
            </Avatar>
          </Col>
          <Col span={22} style={{ paddingLeft: 10, paddingTop: 10 }}>
            <Title style={{ fontSize: 24, marginTop: 12, marginBottom: 0 }}>
              {isUserProfile ? userData.name : auth.userName}
            </Title>
            <Text style={{ fontSize: 14, marginLeft: 2 }}>
              {userData.jobTitle}
            </Text>
          </Col>
        </Row>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Overview" key="1">
            <OverviewTab userProfile={isUserProfile} />
          </TabPane>
          <TabPane tab="Alerts" key="2">
            <AlertsTab />
          </TabPane>
          <TabPane tab="Access" key="3">
            <AccessTab />
          </TabPane>
          <TabPane tab="Activity" key="4">
            <ActivityTab/>
          </TabPane>
        </Tabs>
      </Content>
    </>
  );
};

export default Profile;
