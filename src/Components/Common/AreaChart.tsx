import { Area, AreaConfig } from "@ant-design/charts";
import { Col, Row, Typography } from "antd";
import moment from "moment";
import areaChartData from "../../data/area_chart_data.json";

const { Title, Text } = Typography;

const colorConverter = (color: string) => {
  let colour = color;
  let new_col = colour.replace(/rgb/i, "rgba");
  new_col = new_col.replace(/\)/i, ",0.6)");
  return new_col;
};

const AreaChart = () => {
  const config: AreaConfig = {
    data: areaChartData,
    xField: "date",
    yField: "value",
    seriesField: "application",

    color: ({ application }) => {
      if (application === "Microsoft") {
        return "rgb(249, 182, 107)";
      } else if (application === "Oracle") {
        return "rgb(251, 200, 99)";
      } else if (application === "SAP") {
        return "rgb(240, 126, 190)";
      } else if (application === "Adobe") {
        return "rgb(97, 199, 149)";
      } else if (application === "Coral") {
        return "rgb(115, 200, 200)";
      } else if (application === "Autodesk") {
        return "rgb(163, 118, 225)";
      } else {
        return "rgb(93, 122, 240)";
      }
    },
    legend: {
      layout: "horizontal",
      position: "bottom",
      marker: {
        symbol: "circle",
        style: (oldStyle) => {
          return {
            ...oldStyle,
            // fill: oldStyle.stroke,
            stroke: oldStyle.stroke || oldStyle.fill,
          };
        },
      },
    },
    tooltip: {
      showMarkers: true,
      customContent: (title, items): any => {
        return (
          <div style={{ padding: 20, width: 250 }}>
            <Row justify="space-between">
              <Col>
                <Title level={4} style={{ marginBottom: 20 }}>
                  {moment(title).format("ll")}
                </Title>
              </Col>
              <Col style={{ paddingTop: 7 }}>
                <Text style={{ fontSize: 14 }}>value</Text>
              </Col>
            </Row>

            {items?.map((item: any, index: any) => {
              const { color, data } = item;

              return (
                <div
                  key={index}
                  data-index={index}
                  style={{
                    marginBottom: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="g2-tooltip-marker"
                    style={{
                      backgroundColor: colorConverter(color),
                      border: `1.5px solid ${color}`,
                    }}
                  >
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ marginRight: 16, fontSize: 14 }}>
                      {data.application}
                    </Text>
                    <Text strong className="g2-tooltip-list-item-value">
                      {data.value}
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

  return <Area {...config} />;
};

export default AreaChart;
