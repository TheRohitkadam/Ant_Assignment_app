import React, { CSSProperties, ReactNode, useState } from "react";
import { Col, Row, Typography, Card } from "antd";
// import "../../styles/inbox.less";
import { ExceptionOutlined } from "@ant-design/icons";
import moment from "moment";

const { Text } = Typography;

type MessageProps = {
  data: {
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
  messageCardVisible: boolean;
  clickHandler: () => void;
  render?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const MessageCard = (props: MessageProps) => {
  const [clickClass, setClickClass] = useState<boolean>(false);
  const { clickHandler } = props;

  const onClickHandler = () => {
    setClickClass(!clickClass);
  };

  return (
    <Card
      className={props.className}
      onClick={() => {
        onClickHandler();
        clickHandler();
      }}
    >
      <Row wrap={false}>
        <Col flex="none">
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
        </Col>
        <Col flex="auto">
          <div style={{ marginBottom: 20 }}>
            <Text>{props.data.description.to}</Text>
            <div style={{ marginBottom: 20 }}>
              <Text>{props.data.description.text}</Text>
            </div>
          </div>
          <Row>
            <Col flex="auto">
              <div>
                <Text>{moment(props.data.createdAt).format("D MMM")}</Text>
              </div>
            </Col>
            <Col flex="none">
              <div>
                <Text>Due on {moment(props.data.dueDate).format("D MMM")}</Text>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default MessageCard;
