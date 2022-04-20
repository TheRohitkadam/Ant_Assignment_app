import { useState, createContext, useContext } from "react";
import {
  Layout,
  Typography,
  Row,
  Col,
  Button,
  Steps,
  Input,
  Menu,
  Dropdown,
  Select,
  Card,
  Popover,
} from "antd";
import { useSideNavState } from "../Common/LayoutContainer";
import "../../styles/layout.less";
import "../../styles/steps.less";
import {
  initialState,
  UserContext,
  UserDataType,
} from "../../utils/UserContext";
import SelectChanges from "./UserManagement/SelectChanges";
import Review from "./UserManagement/Review";
import SelectUser from "./UserManagement/SelectUser";
import UserTableProvider, {
  UserTableContext,
} from "../../utils/UserTableContext";
import data from "../../data/users.json";
import { ContextType, Data, User } from "../../types/userType";

const { Content, Header } = Layout;
const { Step } = Steps;
const { Title, Text } = Typography;

const UserManagement = () => {
  const { usersdata, saveUser, setUsersdata } = useContext(
    UserTableContext
  ) as ContextType;

  const { collapsed } = useSideNavState();

  const [current, setCurrent] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<{
    record: UserDataType;
    selected: boolean;
  }>({
    record: initialState,
    selected: false,
  });

  const updateUserData = () => {
    const id = usersdata.findIndex(
      (item) => item.guid === selectedUser.record.guid
    );
    const updatedData = usersdata;
    updatedData[id] = selectedUser.record;
    setUsersdata(updatedData);
  };

  const stepsArray = ["Select identity", "Select changes", "Review"];

  return (
    <>
      <Header
        style={{
          backgroundColor: "#fff",
          paddingLeft: 20,
          paddingRight: 20,
          marginLeft: collapsed ? 80 : 180,
        }}
      >
        <Row justify="space-around" align="middle">
          <Col span={4} style={{ paddingTop: 10 }}>
            <Title level={4}>Manage access</Title>
          </Col>
          <Col span={10}>
            <Steps
              size="small"
              current={current}
              style={{ marginTop: 6 }}
              className="user-steps"
            >
              {stepsArray.map((item) => (
                <Step key={item} title={item} />
              ))}
            </Steps>
          </Col>
          <Col style={{ marginLeft: 20 }}>
            <Button
              type="text"
              style={{
                marginRight: 10,
                backgroundColor: "#ECF0FB",
                border: "none",
              }}
              onClick={() => {
                setCurrent(0);
                setUsersdata(usersdata);
                setSelectedUser({ record: initialState, selected: false });
              }}
            >
              Cancel
            </Button>
            {current === 1 && (
              <Button
                type="text"
                style={{
                  marginRight: 10,
                  backgroundColor: "#ECF0FB",
                  border: "none",
                }}
                onClick={() => {
                  setCurrent(current - 1);
                  setSelectedUser({ record: initialState, selected: false });
                }}
              >
                Previous
              </Button>
            )}
            <Button
              type="text"
              style={{
                backgroundColor: "#ECF0FB",
                border: "none",
              }}
              // disabled={!selectedUser.selected || current !== 1}
              onClick={() => {
                (current === 0 && setCurrent(1)) ||
                  (current === 1 && setCurrent(2)) ||
                  (current === 2 && setCurrent(0));
                if (current === 2) {
                  updateUserData();
                }
              }}
            >
              {(current === 2 && "Save") || "Next"}
            </Button>
          </Col>
        </Row>
      </Header>
      <Content
        className="layout"
        style={{
          padding: `20px 20px 0px 20px`,
          backgroundColor: "#F8F9FE",
        }}
      >
        <Card
          style={{
            margin: `0px 0px 0px ${collapsed ? "100px" : "200px"}`,
            borderRadius: 10,
          }}
        >
          {current === 0 && (
            <SelectUser
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          )}
          {current === 1 && (
            <SelectChanges
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          )}
          {current === 2 && (
            <Review
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          )}
        </Card>
      </Content>
    </>
  );
};

export default UserManagement;
