import { CSSProperties, ReactNode, useState } from "react";
import { Layout, Typography, Row, Col, Tabs, Switch, Radio } from "antd";
import StatCount from "../../Common/StatCount";
import PieChart from "../../Common/PieChart";
import alertsData from "../../../data/alerts_data.json";
import incidentsStatusData from "../../../data/incidents_data_status.json";
import incidentsRiskData from "../../../data/incidents_data_risk.json";
import "../../../styles/tabPane.less";
import AlertsChartCard from "../../Common/AletsChartCard";
import CustomRadioBtn from "../../Common/CustomRadioBtn";
import AlertsCard from "./Cards/IncidentsCard";
import IncidentsCard from "./Cards/AlertsCard";

const AlertsTab = () => {
  

  return (
    <div className="profile-tab">
      <Row justify="space-between">
        <Col span={12} style={{ paddingRight: 20 }}>
          <IncidentsCard/>
        </Col>
        <Col span={12} style={{ paddingLeft: 20 }}>
          <AlertsCard/>
        </Col>
      </Row>
    </div>
  );
};

export default AlertsTab;
