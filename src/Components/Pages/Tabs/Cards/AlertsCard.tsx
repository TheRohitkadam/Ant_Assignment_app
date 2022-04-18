import { Col, Row } from "antd";
import AlertsChartCard from "../../../Common/AletsChartCard";
import PieChart from "../../../Common/PieChart";
import StatCount from "../../../Common/StatCount";
import alertsData from "../../../../data/alerts_data.json";


const AlertsCard = () => {
  return (
    <AlertsChartCard title="Alerts" chartstyle={{ paddingTop: 20 }}>
      <PieChart
        data={alertsData}
        color={({ type }: any) => {
          if (type === "Access security alerts") {
            return "#4DAF68";
          } else if (type === "Data risk alerts") {
            return "#2595fa";
          } else {
            return "#f15d40";
          }
        }}
      />
      <Row>
        <Col span={12}>
          <StatCount
            color="#4DAF68"
            count={42}
            title="Access risk alerts"
            infoTooltip={true}
          />
          <StatCount
            color="#F15D40"
            count={346}
            title="Security risk alerts"
            infoTooltip={true}
          />
        </Col>
        <Col span={12}>
          <StatCount
            color="#2595FA"
            count={25}
            title="Data risk alerts"
            infoTooltip={true}
          />
        </Col>
      </Row>
    </AlertsChartCard>
  );
};

export default AlertsCard;
