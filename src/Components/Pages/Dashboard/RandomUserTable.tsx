import React, { FC, useEffect, useState } from "react";
import AntTable from "../../Common/AntTable";
import dataSource from "../../../data/randomUsers.json";
import { Avatar, Button, Input, Select, Space, Typography, Table, TablePaginationConfig } from "antd";
import { ColumnProps } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";
import getAge from "../../../utils/getAge";
import moment from "moment";
import isoDateConvert from "../../../utils/isoDateConvert";
import getTableData from "./getTableData";

const { Text } = Typography;
const jsondata: any = dataSource;

const countriesArr = jsondata.results.map((item: any) => item.location.country);
const countries = [...new Set(countriesArr)];
const countryList: any[] = countries.map((country) => ({
  text: country,
  value: country,
}));

const genderList = ["male", "female"].map((gender) => ({
  text: gender,
  value: gender,
}));

const ageCategoriesList = [
  "Below 30",
  "30 to 40",
  "40 to 50",
  "50 to 60",
  "Above 60",
].map((category) => ({
  text: category,
  value: category,
}));

const RandomUserTable: FC = () => {
  const [tableData, setTableData] = useState<any[]>([])
  const [dataCount, setDataCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    onTableChange({current: 1, pageSize: 10}, {}, {}, {})
  }, []);

  const columns: ColumnProps<any>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.first.localeCompare(b.name.first),
      render: (
        name: { title: string; first: string; last: string },
        record: any
      ) => (
        <Space size="small" style={{ cursor: "pointer" }}>
          <Avatar src={record.picture.thumbnail} />
          <Text strong>
            {name.title}. {name.first} {name.last}
          </Text>
        </Space>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ padding: 5, width: 200 }}>
            <Input
              style={{ marginBottom: 7 }}
              placeholder="search name"
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              value={selectedKeys[0]}
            />
            <Space>
              <Button
                size="small"
                type="primary"
                icon={<SearchOutlined />}
                style={{ width: 90 }}
                onClick={() => {
                  confirm();
                }}
              >
                Search
              </Button>
              <Button
                size="small"
                style={{ width: 90 }}
                onClick={() => {
                  setSelectedKeys([]);
                  confirm();
                }}
              >
                Reset
              </Button>
            </Space>
          </div>
        );
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: genderList,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      sorter: (a: any, b: any) =>
        moment(a.dob.date).unix() - moment(b.dob.date).unix(),
      render: (dob: { date: string; age: number }) =>
        `${isoDateConvert(dob.date)}`,
    },
    {
      title: "Age",
      dataIndex: "dob",
      key: "dob",
      filters: ageCategoriesList,
      render: (dob: { date: string; age: number }) => `${getAge(dob.date)}`,
    },
    {
      title: "Registration Date",
      dataIndex: "registered",
      key: "registered",
      render: (registered: { date: string; age: number }) =>
        `${isoDateConvert(registered.date)}`,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Country",
      dataIndex: "location",
      key: "location",
      sorter: (a: any, b: any) =>
        a.location.country.localeCompare(b.location.country),
      filters: countryList,
      render: (location: { country: string }) => `${location.country}`,
    },
  ];

  const onTableChange = (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => {
    setLoading(true)
    const data = getTableData(pagination, filters);
    setTableData(data.data);
    setDataCount(data.count);
    setLoading(false)
  };

  return (
    <AntTable
      columns={columns}
      dataSource={tableData}
      loading={loading}
      onChange={onTableChange}
      size="small"
      pagination={{
        showSizeChanger: true,
        total: dataCount,
      }}
      rowKey={(record: { login: { uuid: string } }) => record.login.uuid}
    />
  );
};

export default RandomUserTable;
