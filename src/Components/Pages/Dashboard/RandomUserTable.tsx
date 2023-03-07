import { FC, useEffect, useState } from "react";
import { Avatar, Button, Input, Modal, Space, Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import AntTable from "../../Common/AntTable";
import dataSource from "../../../data/randomUsers.json";
import getAge from "../../../utils/getAge";
import moment from "moment";
import isoDateConvert from "../../../utils/isoDateConvert";
import getTableData from "./getTableData";
import "../../../styles/editAccessModal.less";
import { FilterDropdownProps } from "antd/lib/table/interface";
import FilterModal from "./FilterModal";

const { Text, Title } = Typography;
const jsondata: any = dataSource;

const countriesArr = jsondata.results.map((item: any) => item.location.country);
const countries = [...new Set(countriesArr)];
const countryList: any[] = countries.map((country, index) => ({
  text: country,
  value: country,
}));

const genderList = ["male", "female"].map((gender, index) => ({
  text: gender,
  value: gender,
}));

const ageCategoriesList = [
  "Below 30",
  "30 to 40",
  "40 to 50",
  "50 to 60",
  "Above 60",
].map((category, index) => ({
  text: category,
  value: category,
}));

const RandomUserTable: FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [dataCount, setDataCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggleAgeModal, setToggleAgeModal] = useState(false);
  const [toggleGenderModal, setToggleGenderModal] = useState(false);
  const [toggleCountryModal, setToggleCountryModal] = useState(false);
  const [filterObj, setFilterObj] = useState<any>({
    dob: null,
    gender: null,
    location: null,
    name: null,
  });

  const genderFilterHandler = (values: any) => {
    cancelHandler();
    setFilterObj({
      ...filterObj,
      gender: values,
    });
    onTableChange({ current: 1, pageSize: 10 }, filterObj, {}, {});
  };

  const ageFilterHandler = (values: any) => {
    cancelHandler();
    setFilterObj({
      ...filterObj,
      dob: values,
    });
    onTableChange({ current: 1, pageSize: 10 }, filterObj, {}, {});
  };

  const countryFilterHandler = (values: any) => {
    cancelHandler();
    setFilterObj({
      ...filterObj,
      location: values,
    });
    onTableChange({ current: 1, pageSize: 10 }, filterObj, {}, {});
  };

  const cancelHandler = () => {
    setToggleAgeModal(false);
    setToggleCountryModal(false);
    setToggleGenderModal(false);
  };

  const clearAllHandler = () => {
    cancelHandler();
    setFilterObj({
      dob: null,
      gender: null,
      location: null,
      name: null,
    });
  };

  useEffect(() => {
    onTableChange({ current: 1, pageSize: 10 }, filterObj, {}, {});
  }, [filterObj]);

  const columns: ColumnType<any>[] = [
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
      filterIcon: (filtered: boolean) => (
        <FilterFilled
          style={{
            color: `${filterObj?.gender?.length > 0 ? "#00c853" : "lightgrey"}`,
          }}
          onClick={() => setToggleGenderModal(true)}
        />
      ),
      filterDropdown: (props: FilterDropdownProps) => {
        const filterColumns = [
          {
            title: "Gender Type",
            dataIndex: "text",
            key: "text",
          },
        ];

        return (
          <FilterModal
            title="Select Gender"
            modalProps={props}
            visible={toggleGenderModal}
            filterColumns={filterColumns}
            submitHandler={genderFilterHandler}
            cancelHandler={cancelHandler}
            clearAllHandler={clearAllHandler}
          />
        );
      },
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
      render: (dob: { date: string; age: number }) => `${getAge(dob.date)}`,
      filters: ageCategoriesList,
      filterIcon: (filtered: boolean) => (
        <FilterFilled
          style={{
            color: `${filterObj?.dob?.length > 0 ? "#00c853" : "lightgrey"}`,
          }}
          onClick={() => setToggleAgeModal(true)}
        />
      ),
      filterDropdown: (props: FilterDropdownProps) => {
        const filterColumns = [
          {
            title: "Age Type",
            dataIndex: "text",
            key: "text",
          },
        ];

        return (
          <FilterModal
            title="Select Age Type"
            modalProps={props}
            visible={toggleAgeModal}
            filterColumns={filterColumns}
            submitHandler={ageFilterHandler}
            cancelHandler={cancelHandler}
            clearAllHandler={clearAllHandler}
          />
        );
      },
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
      render: (location: { country: string }) => `${location.country}`,
      filters: countryList,
      filterIcon: (filtered: boolean) => (
        <FilterFilled
          style={{
            color: `${
              filterObj?.location?.length > 0 ? "#00c853" : "lightgrey"
            }`,
          }}
          onClick={() => setToggleCountryModal(true)}
        />
      ),
      filterDropdown: (props: FilterDropdownProps) => {
        const filterColumns = [
          {
            title: "Countries",
            dataIndex: "text",
            key: "text",
          },
        ];

        return (
          <FilterModal
            title="Select Countries"
            modalProps={props}
            visible={toggleCountryModal}
            filterColumns={filterColumns}
            submitHandler={countryFilterHandler}
            cancelHandler={cancelHandler}
            clearAllHandler={clearAllHandler}
          />
        );
      },
    },
  ];

  const onTableChange = (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => {
    setLoading(true);
    const { data, count } = getTableData(pagination, filterObj);
    setTableData(data);
    setDataCount(count);
    setLoading(false);
  };

  return (
    <div className="random-user-table">
      <AntTable
        columns={columns}
        dataSource={tableData}
        loading={loading}
        onChange={onTableChange}
        scroll={{ x: 1200 }}
        size="small"
        pagination={{
          showSizeChanger: true,
          total: dataCount,
        }}
        rowKey={(record: { login: { uuid: string } }) => record.login.uuid}
      />
    </div>
  );
};

export default RandomUserTable;
