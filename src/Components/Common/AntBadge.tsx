import React, { CSSProperties, FC } from "react";
import { Badge } from "antd";

type Props = {
  color: string;
  style?: CSSProperties;
};

const AntBadge: FC<Props> = ({ color, style }) => {
  return (
    <Badge
      dot
      offset={[0, -8]}
      color={`${color}`}
      size="default"
      className="badge"
      children={<></>}
      style={{ color: `${color}`, border: "none", ...style }}
    />
  );
};

export default AntBadge;
