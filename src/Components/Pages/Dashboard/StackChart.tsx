import { FC } from "react";
import { Button, Card, Typography } from "antd";
import { Column, ColumnConfig } from "@ant-design/charts";
import data from "../../../data/RulesByType.json";
import StatsTable from "./StatsTable";

const { Title, Text } = Typography;

const StackChart: FC = () => {
  const config: ColumnConfig = {
    data,
    xField: "type",
    yField: "value",
    isGroup: true,
    isStack: true,
    seriesField: "subtype",
    groupField: "name",
    color: ({ subtype }) => {
      if (subtype === "Analytic-Inactive") {
        return "#5c00eb";
      } else if (subtype === "Analytic-Active") {
        return "#735af7";
      } else if (subtype === "Analytic-Draft") {
        return "#4b00c7";
      } else if (subtype === "Activity-Active") {
        return "#ad00de";
      } else if (subtype === "Activity-Inactive") {
        return "#9000d2";
      } else {
        return "#7001ae";
      }
    },
    columnStyle: (record: any) => {
      if (record.subtype === "Activity-Active" || record.subtype === "Analytic-Active") {
        return {
          radius: [5, 5, 0, 0],
        };
      }
    },
    legend: false,
    tooltip: {
      domStyles: {
        "g2-tooltip": {
          padding: 0,
          opacity: "100%",
        },
      },
      customContent: (title: any, items: any): any => (
        <Card
          style={{
            border: "none",
            width: 400,
            height: 170,
          }}
        >
          <Title level={5}>Data Rules</Title>
          <StatsTable data={items} />
          <Button
            size="small"
            style={{
              border: "none",
              color: "#49AE8A",
              backgroundColor: "#F2FDF9",
              fontSize: 13,
              fontWeight: "600",
              float: "right",
              marginBlock: 20,
            }}
          >
            View Details
          </Button>
        </Card>
      ),
    },
  };
  return (
    <>
      <Title level={5} style={{ marginBottom: 30 }}>
        Rules by type
      </Title>
      <Column {...config} />
    </>
  );
};

export default StackChart;
