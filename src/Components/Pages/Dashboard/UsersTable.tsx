import React, { FC, useEffect, useState } from "react";
import AntTable from "../../Common/AntTable";
import dataSource from "../../../data/randomUsers.json";
import { Avatar, Button, Input, Select, Space, Typography, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";
import userNameConcat from "../../../utils/userNameConcat";
import getAge from "../../../utils/getAge";
import moment from "moment";
import isoDateConvert from "../../../utils/isoDateConvert";
import { Option } from "antd/lib/mentions";
import { filter } from "lodash";
import nameConcat from "../../../utils/nameConcat";

const { Text } = Typography;
const data: any = dataSource;
const countriesArr = data.results.map((item: any) => item.location.country);
const countries = [...new Set(countriesArr)];

const getTableLimitedData = (data: [], pagination: any) => {
  const dataArr =
    pagination.current === 1
      ? data.slice(0, 10)
      : data.slice(
          10 * pagination.current,
          pagination.current * 10 + pagination.pageSize
        );

  return dataArr;
};

const UsersTable: FC = () => {
  const [randomUsersData, setRandomUsersData] = useState<any[]>(data.results);
  const [searchText, setSearchText] = useState("");
  const [rowData, setRowData] = useState([]);
  const [selectGender, setSelectGender] = useState([]);
  const [selectAge, setSelectAge] = useState([]);
  const [selectCountry, setSelectCountry] = useState([]);

  useEffect(() => {
    setRandomUsersData(data.results);
    onTableChangeHandler();
  }, [searchText, selectGender, selectAge, selectCountry]);

  useEffect(() => {
    setRandomUsersData(data.results);
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
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
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
      sorter: (a, b) => moment(a.dob.date).unix() - moment(b.dob.date).unix(),
      render: (dob: { date: string; age: number }) =>
        `${isoDateConvert(dob.date)}`,
    },
    {
      title: "Age",
      dataIndex: "dob",
      key: "dob",
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
      sorter: (a: any, b: any) => {
        return a.location.country.localeCompare(b.location.country);
      },
      render: (location: { country: string }) => `${location.country}`,
    },
  ];

  const onTableChangeHandler = (
    pagination?: any,
    filters?: any,
    sorter?: any,
    extra?: any
  ) => {

    console.log('pagi', pagination)
    setRandomUsersData(getTableLimitedData(data.results, pagination))
  };


  return (
    <Table
      onChange={onTableChangeHandler}
      size="small"
      columns={columns}
      pagination={{
        showSizeChanger: true,
        total: randomUsersData.length,
      }}
      dataSource={randomUsersData}
      rowKey={(record: { login: { uuid: string } }) => record.login.uuid}
    />
  );
};

export default UsersTable;
