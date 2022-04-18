import React, { ReactHTMLElement } from "react";
import { Typography } from "antd";
import { DualAxes, DualAxesConfig, Line } from "@ant-design/charts";
import Data from "../../data/linechart.json";

const { Text, Title } = Typography;

const LineGraph = () => {
  const config: DualAxesConfig = {
    data: Data,
    height: 300,
    xField: "date",
    yField: ["count", "value"],
    geometryOptions: [
      {
        color: ["#2F54EB", "#9254DE"],
        seriesField: "type",
      },
      {
        color: "#2AABAB",
        seriesField: "type",
      },
    ],
    legend: {
      padding: [30, 10, 20, 10],
      marker: {
        symbol: "circle",
        style: (oldStyle) => {
          return {
            ...oldStyle,
            fill: oldStyle.stroke,
            stroke: oldStyle.stroke || oldStyle.fill,
          };
        },
      },
      layout: "horizontal",
      position: "bottom",
    },
    tooltip: {
      customContent: (title, items): any => {
        return (
          <div style={{ padding: 20, width: 250 }}>
            <Title level={4} style={{marginBottom: 20}}>{title}</Title>
            {items?.map((item: any, index: any) => {
              const { name, value, color, data } = item;
              return (
                <div
                  key={index}
                  data-index={index}
                  style={{
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="g2-tooltip-marker"
                    style={{ backgroundColor: color }}
                  ></span>
                  <span
                    style={{
                      display: "inline-flex",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ marginRight: 16 }}>{data.type}</Text>
                    <Text strong className="g2-tooltip-list-item-value">
                      {data.type === "Risk score" ? data.value : data.type === "Financial impact" ? `$${data.count.toLocaleString()}` : data.count}
                    </Text>
                  </span>
                </div>
              );
            })}
          </div>
        );
      },
    },
  };

  return <DualAxes {...config} />;
};

export default LineGraph;
