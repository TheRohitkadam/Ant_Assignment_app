import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Typography, Row, Col, Button, Steps, Card } from "antd";
import { useSideNavState } from "../Common/LayoutContainer";
import "../../styles/layout.less";
import "../../styles/steps.less";
import UMTable from "./UserManagement/UMTable";
import UMformModal from "./UserManagement/UMformModal";
import {
  removeMultipleUsers,
  setLimitedData,
} from "../../redux/actions/actions";

const { Content, Header } = Layout;
const { Title } = Typography;

const UMwithRedux = () => {
  const { collapsed } = useSideNavState();
  const dispatch = useDispatch();
  const tableData = useSelector((state: any) => state.tableReducer);
  const [formData, setFormData] = useState({});
  // const [viewModal, setViewModal] = useState(false);
  const [modalState, setModalState] = useState<{
    viewForm: boolean;
    modalName: "Add User" | "Edit User";
  }>({
    viewForm: false,
    modalName: "Add User",
  });

  // const callback = useCallback(() => {
  //   console.log("callback triggered");
  // }, [tableData.limitedUsers]);

  useEffect(() => {
    dispatch(setLimitedData({ current: 1, pageSize: 10 }));
  }, []);

  const toggleForm = (formTitle: "Add User" | "Edit User") =>
    setModalState({
      viewForm: !modalState.viewForm,
      modalName: formTitle,
    });

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
          <Col flex="100px" style={{ paddingTop: 20, paddingLeft: 20 }}>
            <Title level={4}>UM</Title>
          </Col>
          <Col flex="auto"></Col>
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
          <Title level={5} style={{ marginBottom: 0 }}>
            Select User
          </Title>
          <Row justify="space-between" style={{ marginBlock: 24 }}>
            <Col>
              {/* <Input
            placeholder="Search"
            value={value}
            prefix={<SearchOutlined />}
            onChange={onSearch}
          /> */}
            </Col>
            <Col>
              <Button
                style={{
                  backgroundColor: "#4cab61",
                  color: "#fff",
                  border: "none",
                }}
                onClick={() => toggleForm("Add User")}
              >
                Add User
              </Button>
              <Button
                style={{
                  backgroundColor: "#F04A4F",
                  color: "#fff",
                  border: "none",
                  marginLeft: 10,
                }}
                onClick={() => {
                  dispatch(removeMultipleUsers(tableData.selectedRowKeys));
                }}
              >
                Delete User
              </Button>
            </Col>
          </Row>
          <UMTable
            modalState={modalState}
            toggleForm={toggleForm}
            formData={formData}
            setFormData={setFormData}
          />
          {/* <MemoTable modalState={modalState} toggleForm={toggleForm} /> */}
          <UMformModal
            modalState={modalState}
            toggleForm={toggleForm}
            formData={formData}
            setFormData={setFormData}
          />
        </Card>
      </Content>
    </>
  );
};

export default UMwithRedux;
