import React, { CSSProperties } from "react";
import { SpinProps, Table, TablePaginationConfig, TableProps } from "antd";
import "../../styles/table.less"
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FilterValue, SorterResult } from "antd/lib/table/interface";

type Props = {
  columns: any[];
  dataSource: any;
  rowKey?: (record: any) => number | string;
  rowSelection?: {};
  expandable?: {};
  bordered?: boolean;
  pagination?: boolean | any;
  size?: SizeType;
  onChange?: ((pagination: any, filters: any, sorter: any, extra: any) => void) | undefined;
  loading?: boolean | SpinProps;
  style?: CSSProperties;
  scroll?:any  
};

const AntTable = (props: Props) => {
  return (
    <Table
      className="antTable"
      dataSource={props.dataSource}
      columns={props.columns}
      rowKey={props.rowKey}
      rowSelection={props.rowSelection}
      expandable={props.expandable}
      bordered={props.bordered}
      pagination={props.pagination}
      size={props.size}
      onChange={props.onChange}
      loading={props.loading}
      style={props.style}
      scroll={props.scroll} 
    />
  );
};

export default AntTable;
