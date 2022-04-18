import { Col, Row } from "antd";
import React, { useState } from "react";
import AlertsChartCard from "../../../Common/AletsChartCard";
import CustomRadioBtn from "../../../Common/CustomRadioBtn";
import PieChart from "../../../Common/PieChart";
import StatCount from "../../../Common/StatCount";
import incidentsStatusData from "../../../../data/incidents_data_status.json";
import incidentsRiskData from "../../../../data/incidents_data_risk.json";

const IncidentsCard = () => {
  const [radioBtnValue, setRadioBtnValue] = useState("By Risk");
  const [data, setData] = useState(incidentsRiskData);

  const onChange = (e: any) => {
    setRadioBtnValue(e.target.value);
    if (radioBtnValue === "By Risk") {
      setData(incidentsRiskData);
    } else if (radioBtnValue === "By Status") {
      setData(incidentsStatusData);
    }
  };
  return (
    <AlertsChartCard title="Incidents">
      <CustomRadioBtn
        defaultValue={radioBtnValue}
        options={["By Risk", "By Status"]}
        onChangeHandler={onChange}
      />
      <PieChart
        data={data}
        color={({ type }: any) => {
          if (type === "Incidents - Open") {
            return "#6185F7";
          } else if (type === "Incidents - Closed") {
            return "#9964E0";
          } else if (type === "Investigation - Open") {
            return "#55D2CC";
          } else {
            return "#ED5A9B";
          }
        }}
      />
      <Row>
        <Col span={12}>
          <StatCount
            color="#6185F7"
            count={20}
            title="Incidents-Open"
            infoTooltip={true}
          />
          <StatCount
            color="#55D2CC"
            count={16}
            title="Investigations-Open"
            infoTooltip={true}
          />
        </Col>
        <Col span={12}>
          <StatCount
            color="#9964E0"
            count={15}
            title="Incidents-Closed"
            infoTooltip={true}
          />
          <StatCount
            color="#ED5A9B"
            count={21}
            title="Investigations-Closed"
            infoTooltip={true}
          />
        </Col>
      </Row>
    </AlertsChartCard>
  );
};

export default IncidentsCard;
