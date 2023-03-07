import { FC } from "react";
import { Bar, BarConfig } from "@ant-design/charts";
import { Badge, Row, Typography } from "antd";

type Props = {
  chartData?: any;
};

const { Text } = Typography;

const AntBarChart: FC<Props> = ({ chartData }) => {
  const config: BarConfig = {
    data: chartData,
    xField: "value",
    yField: "title",
    maxBarWidth: 10,
    limitInPlot: true,
    xAxis: {
      max: 60,
      tickLine: null,
      grid: null,
      ticks: [],
    },
    yAxis: false,
    marginRatio: 40,
    tooltip: {
      customContent: (title: any, items: any): any => (
        <div
          style={{
            border: "none",
            width: 120,
            height: 50,
            paddingBlock: 12,
            paddingInline: 0,
          }}
        >
          <Text>{title}</Text>
          <Row style={{ paddingLeft: 4, paddingTop: 7 }}>
            <Badge
              dot
              offset={[0, 6]}
              size="default"
              className="badge"
              color="#49AE8A"
              children={<></>}
              style={{ border: "none" }}
            />
            <Text style={{ marginLeft: 15 }}>{title}:</Text>
            {items.map((item: any, i: number) => (
              <Text key={i} style={{ marginLeft: 45 }}>
                {item.data.value}
              </Text>
            ))}
          </Row>
        </div>
      ),
    },
    annotations: [
      {
        type: "line",
        start: () => [0, 40],
        end: [40, 40],
        position: [40, "mean"],
        top: true,
        offsetX: 0,
        offsetY: -80,
        style: {
          stroke: "#FA8C16",
          lineWidth: 2,
        },
      },
      {
        type: "region",
        start: () => [0, 60],
        end: [0, 40],
        offsetY: -20,
        style: {
          fill: "#FA541C",
          fillOpacity: 0.1,
          height: 110,
          width: 230,
        },
      },
      {
        type: "regionFilter",
        start: ["start", "end"],
        end: ["end", "40"],
        top: true,
        color: "#ff1a1a",
        style: {
          lineHeight: 20,
          height: 300,
          width: 100
        },
      },
      // {
      //   type: "regionFilter",
      //   start: (a) => [0, 60],
      //   end: [4, 40],
      //   top: true,
      //   offsetX: 10,
      //   apply: ["bar"],
      //   position: [40, "min"],
      //   style: {
      //     fill: "#ff1a1a",
      //     height: 20,
      //     width: 230,
      //   },
      // },
    ],
    barStyle: {
      fill: "l(0) 0:#FA8C16 1:#FA541C",
    },
  };

  return <Bar style={{ height: 100 }} {...config} />;
};

export default AntBarChart;
