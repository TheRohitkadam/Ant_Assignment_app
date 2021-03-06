import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Input,
  Layout,
  Menu,
  Row,
  Space,
  Typography,
} from "antd";
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
        <Row>
          <Col flex={visible ? "200px" : "0px"}>
            <Drawer
              placement="left"
              onClose={() => setVisible(!visible)}
              visible={visible}
              key="left"
              zIndex={0}
              closable={false}
              mask={false}
              contentWrapperStyle={{ boxShadow: "none" }}
              width={collapsed ? 290 : 420}
              drawerStyle={{
                backgroundColor: "#f8f9fe",
                paddingTop: 50,
                paddingLeft: collapsed ? 70 : 200,
              }}
            >
              <Space
                direction="vertical"
                size="small"
                style={{ minWidth: 270 }}
              >
                <Input
                  placeholder="Search"
                  prefix={<SearchOutlined style={{ color: "grey" }} />}
                  style={{ width: 180 }}
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
                  <Menu.Item
                    className="slider-item"
                    key="6"
                    style={{ marginTop: 35 }}
                    onClick={() => filterInboxData("Trash")}
                  >
                    Trash ({!filterCount.Trash ? 0 : filterCount.Trash})
                  </Menu.Item>
                </Menu>
                <div
                  style={{
                    width: 180,
                    backgroundColor: "#999",
                    height: 1,
                    position: "absolute",
                    bottom: 300,
                  }}
                />
              </Space>
            </Drawer>
          </Col>
          <Col flex="auto">
            <Layout>
              <Content
                className="inbox-contain"
                style={{ transition: "300ms", paddingTop: 70 }}
              >
                <SplitPane
                  split="vertical"
                  defaultSize={450}
                  primary="first"
                  pane1Style={{
                    overflow: "auto",
                    minWidth: `${!detailView ? "100%" : "30%"}`,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                  pane2Style={{
                    paddingTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  <>
                    <Text style={{marginBlock: 20}}>
                      Showing {inboxData.length} of {messageData.length} results
                    </Text>
                    {inboxData.map((item: any, index) => (
                      <MessageCard
                        style={{ marginInline: 20, padding: 14 }}
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
                    ))}
                  </>
                  <>
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
                  </>
                </SplitPane>
              </Content>
            </Layout>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Inbox;
