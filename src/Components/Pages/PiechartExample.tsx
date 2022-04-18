import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie, PieConfig } from "@ant-design/plots";

interface Data {
  type: string;
  value: number;
}
type ChartProps = {
  data: Data[];
  color: ({type}: any) => any
}

const data = [
  {
    type: "分类一",
    value: 27,
  },
  {
    type: "分类二",
    value: 25,
  },
  {
    type: "分类三",
    value: 18,
  },
  {
    type: "分类四",
    value: 15,
  },
  {
    type: "分类五",
    value: 10,
  },
  {
    type: "其他",
    value: 5,
  },
];
const PiechartEx = (props: ChartProps) => {
  const config: PieConfig = {
    appendPadding: 10,
    data: props.data,
    angleField: "value",
    colorField: "type",
    label: false,
    color: props.color,
    radius: 0.6,
    innerRadius: 0.84,
    statistic: {
      title: false,
      content: false,
    },
    legend: false,
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} style={{ height: 343 }} />;
};

export default PiechartEx;
