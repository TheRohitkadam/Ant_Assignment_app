import React, { ChangeEvent, Dispatch, useContext } from "react";
import { Button, Card, Typography } from "antd";
import FilterHeader from "../../Common/FilterHeader";
import { UserContext, UserDataType } from "../../../utils/UserContext";

const { Title } = Typography;

type Props = {
  selectedUser: {
    record: UserDataType;
    selected: boolean;
  };
  setSelectedUser: Dispatch<any>;
};

const Review = (props: Props) => {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <>
      <Title level={5} style={{ marginBottom: 70 }}>
        Select User
      </Title>
    </>
  );
};

export default Review;
