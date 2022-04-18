import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Input,
  Layout,
  Menu,
  Row,
  Space,
  Typography,
} from "antd";
// import "../../styles/dashboard.less";
import Navbar from "../Common/Navbar";
import { useSideNavState } from "../Common/LayoutContainer";
import {
  ExceptionOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import SplitPane, { Pane } from "react-split-pane";
import MessageCard from "../Common/MessageCard";
import messageData from "../../data/inbox_data.json";
import "../../styles/inbox.less";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

type MessageType = {
  id: number;
  title: string;
  type: string;
  createdBy: string;
  createdAt: string;
  dueDate: string;
  description: {
    to: string;
    text: string;
  };
};

const Inbox = () => {
  const messagedata = {
    id: 0,
    title: "",
    type: "",
    createdBy: "",
    createdAt: "",
    dueDate: "",
    description: {
      to: "",
      text: "",
    },
  };
  const { collapsed } = useSideNavState();
  const [visible, setVisible] = useState<boolean>(true);
  const [cardData, setCardData] = useState<MessageType>(messagedata);
  const [detailView, setDetailView] = useState<boolean>(false);
  const [inboxData, setInboxData] = useState(messageData);
  const [filterCount, setFilterCount] = useState({
    Starred: "",
    Important: "",
    Events: "",
    Spam: "",
    Trash: "",
  });
  const [id, setId] = useState<number>();

  const toggleDetailView = (data: MessageType) => {
    setDetailView(true);
    setCardData(data);
  };

  const filterInboxData = (type: string) => {
    setInboxData(messageData);
    const filterdItems = messageData.filter((item) => item.type === type);
    setInboxData(filterdItems);
  };

  useEffect(() => {
    let counter: any = {};
    messageData.forEach(function (obj: any) {
      var key = obj.type;
      counter[key] = (counter[key] || 0) + 1;
    });
    setFilterCount(counter);
  }, []);
  return (
    <>
      <Navbar title="Inbox" style={{ backgroundColor: "#F8F9FE" }}>
        <Text style={{ fontSize: 24 }}>Inbox</Text>
        <Text
          style={{ marginTop: 2, marginLeft: 5, fontSize: 16 }}
          type="secondary"
        >
          (Detail view)
        </Text>
        <div>
          <Button
            type="text"
            shape="circle"
            style={{
              border: "none",
              backgroundColor: "transparent",
              padding: 0,
            }}
            onClick={() => setVisible(!visible)}
          >
            <MenuOutlined />
          </Button>
        </div>
      </Navbar>
      <Content
        style={{
          marginLeft: `${collapsed ? "80px" : "220px"}`,
        }}
        className="sidenav"
      >
        <Drawer
          placement="left"
          onClose={() => setVisible(!visible)}
          visible={visible}
          key="left"
          zIndex={0}
          closable={false}
          mask={false}
          contentWrapperStyle={{ boxShadow: "none" }}
          width={318}
          drawerStyle={{
            backgroundColor: "#f8f9fe",
            paddingTop: 50,
          }}
        >
          <Space
            direction="vertical"
            size="small"
            style={{ minWidth: 270, paddingLeft: 70 }}
          >
            <Input
              placeholder="Search"
              prefix={<SearchOutlined style={{ color: "grey" }} />}
            />
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              theme="light"
              style={{ backgroundColor: "#f8f9fe" }}
            >
              <Menu.Item
                className="slider-item"
                key="1"
                onClick={() => setInboxData(messageData)}
              >
                <span>All ({messageData.length})</span>
              </Menu.Item>
              <Menu.Item
                className="slider-item"
                key="2"
                onClick={() => filterInboxData("Starred")}
              >
                Starred ({filterCount.Starred})
              </Menu.Item>
              <Menu.Item
                className="slider-item"
                key="3"
                onClick={() => filterInboxData("Important")}
              >
                Important ({filterCount.Important})
              </Menu.Item>
              <Menu.Item
                className="slider-item"
                key="4"
                onClick={() => filterInboxData("Events")}
              >
                Events ({filterCount.Events})
              </Menu.Item>
              <Menu.Item
                className="slider-item"
                key="5"
                onClick={() => filterInboxData("Spam")}
              >
                Spam ({filterCount.Spam})
              </Menu.Item>
              <Divider />
              <Menu.Item
                className="slider-item"
                key="6"
                onClick={() => filterInboxData("Trash")}
              >
                Trash ({!filterCount.Trash ? 0 : filterCount.Trash})
              </Menu.Item>
            </Menu>
          </Space>
        </Drawer>
        <Layout>
          <Content
            className="inbox-contain"
            style={{
              paddingLeft: visible ? 180 : 20,
              paddingRight: detailView ? 670 : 20,
              transition: "300ms",
            }}
          >
            <SplitPane
              split="vertical"
              defaultSize={450}
              primary="first"
              pane1Style={{
                overflow: "auto",
                minWidth: `${!detailView ? "100%" : "30%"}`,
              }}
              pane2Style={{
                paddingTop: 60,
              }}
              style={{
                paddingLeft: visible ? 300 : 80,
                transition: "200ms",
              }}
            >
              <div style={{ paddingTop: 70, paddingLeft: 10 }}>
                <div style={{ marginLeft: 20, marginBottom: 20 }}>
                  <Text>
                    Showing {inboxData.length} of {messageData.length} results
                  </Text>
                </div>
                {inboxData.map((item: any, index) => {
                  return (
                    <MessageCard
                      style={{ paddingRight: 20, marginLeft: 20 }}
                      key={item.id}
                      className={`${
                        id === index ? "msg-card-selected" : "msg-card"
                      }`}
                      messageCardVisible={detailView}
                      clickHandler={() => {
                        setId(index);
                        toggleDetailView(item);
                      }}
                      data={item}
                    />
                  );
                })}
              </div>
              <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                <ExceptionOutlined
                  style={{
                    fontSize: 20,
                    color: "grey",
                    padding: 8,
                    marginRight: 10,
                    backgroundColor: "#ECF0FB",
                    borderRadius: 5,
                  }}
                />
                <Text style={{ marginLeft: 10, fontSize: 24 }}>
                  {cardData.title === "" ? "No title" : cardData.title}
                </Text>
                <Row
                  justify="space-between"
                  style={{ marginTop: 20, marginBottom: 20 }}
                >
                  <Col style={{ paddingTop: 40 }}>
                    {cardData.description.to}
                  </Col>
                  <Col>
                    <Button
                      style={{
                        color: "#fff",
                        backgroundColor: "#4cab61",
                        border: "none",
                      }}
                    >
                      View details
                    </Button>
                  </Col>
                </Row>
                <Text style={{ paddingTop: 50 }}>
                  {cardData.description.text}
                </Text>
              </div>
            </SplitPane>
          </Content>
        </Layout>
      </Content>
    </>
  );
};

export default Inbox;
