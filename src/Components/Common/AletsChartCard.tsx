import {
    Typography,
    Row,
    Col,
    Card,
  } from "antd";
  import "../../styles/layout.less";
  import {
    ArrowsAltOutlined,
    MoreOutlined,
  } from "@ant-design/icons";
  import { CSSProperties, ReactNode } from "react";
  import "../../styles/tabPane.less";

  const { Title, Text } = Typography;
  
  type CardProps = {
    title: string;
    children: ReactNode;
    cardstyle?: CSSProperties;
    chartstyle?: CSSProperties;
  };


const AlertsChartCard = (props: CardProps) => {
    return (
      <Card style={{ borderRadius: 10, ...props.cardstyle }}>
        <Row>
          <Col flex="auto">
            <Title level={4}>{props.title}</Title>
          </Col>
          <Col flex="none" style={{ display: "flex" }}>
            <ArrowsAltOutlined style={{ marginRight: 20 }} />
            <MoreOutlined />
          </Col>
        </Row>
        <div style={{ ...props.chartstyle }}>{props.children}</div>
      </Card>
    );
  };

  export default AlertsChartCard