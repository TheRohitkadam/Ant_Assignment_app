import React from "react";
import { Pie, PieConfig } from "@ant-design/charts";
import randomUsers from "../../../data/randomUsers.json";
import getArrObjElementValues from "../../../utils/getArrObjElementValues";
import { RandomUserType } from "../../../types/randomUserType";
import StatCount from "../../Common/StatCount";
import getRandomColor from "../../../utils/getRandomColor";
import { Col, Row, Space, Typography } from "antd";
import getArrProp from "../../../utils/getArrProp";

const predata: any = randomUsers;

const data: RandomUserType[] = predata.results;
const { Title } = Typography;

const colorsArr = [
  "#256A78",
  "#EFEF0E",
  "#632775",
  "#FD7511",
  "#257B64",
  "#E761D3",
  "#9A4148",
  "#FB2B74",
  "#F1D4FB",
  "#1FA6A5",
  "#B22344",
  "#A8931A",
  "#DC7B65",
  "#AFE2FA",
  "#BEBA8B",
  "#6B5B41",
  "#4FAB09",
];

const countriesArr = data.map((item: any) => item.location.country);
const countries = [...new Set(countriesArr)];

export const usersByCountry = countries.map((country, index) => {
  const countryCount = data.filter(
    (item: any) => item.location.country === country
  );
  return { country, users: countryCount.length, color: colorsArr[index] };
});

const CountryGraph = () => {
  const pieChartColors = usersByCountry.map((item) => item.color);

  const pieConfig: PieConfig = {
    appendPadding: 10,
    data: usersByCountry,
    angleField: "users",
    colorField: "country",
    radius: 0.6,
    innerRadius: 0.84,
    color: pieChartColors,
    label: false,
    statistic: {
      title: false,
      content: false,
    },
    legend: false,
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
  };

  // console.log("getArrProp", getArrProp());

  return (
    <>
      <Title level={4}>Users By Each Country</Title>
      <Row>
        <Col span={8}>
          <Pie {...pieConfig} />
        </Col>
        <Col span={16} style={{ paddingLeft: 13, paddingTop: 30 }}>
          <Space direction="horizontal" size={[20, 10]} wrap>
            {usersByCountry.map((item, index) => (
              <StatCount
                key={index}
                style={{ width: 133 }}
                color={item.color}
                title={item.country}
                count={item.users}
              />
            ))}
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default CountryGraph;
