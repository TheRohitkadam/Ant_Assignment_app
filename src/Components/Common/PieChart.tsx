import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie, PieConfig } from "@ant-design/plots";

interface Data {
  type: string;
  value: number;
}
type ChartProps = {
  data: Data[];
  color: ({ type }: any) => any | string | string[]
  hasMultipleData?: boolean;
};

const PieChart = (props: ChartProps) => {
  const [multiData, setMultiData] = useState([]);

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
  return <Pie key={Date.now()} {...config} style={{ height: 343 }} />;
};

export default PieChart;
