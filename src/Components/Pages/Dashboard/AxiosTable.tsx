import { Avatar, Space, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react'
import AntTable from '../../Common/AntTable';
import getDataByApi from './getDataByApi';

const { Text } = Typography

const AxiosTable: FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const getData = async (abortController: any) => {
    try {
      setLoading(true)
      const response = await getDataByApi(abortController.signal);
      setData(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const abortController = new AbortController

    getData(abortController);

    return () => {
      abortController.abort()
    }
  }, [])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any) => (
        <Space size="small">
          <Avatar
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
          >
            {`${name.charAt(0).toUpperCase()}${name.charAt(1).toUpperCase()}`}
          </Avatar>
          <Text
            style={{ cursor: "pointer" }}
            strong
          >
            {name}
          </Text>
        </Space>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: any, record: any) => `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website"
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (company: any, record: any) => `${company.name}`
    }
  ]

  return (
    <AntTable
      loading={loading}
      size='small'
      scroll={{ x: 1200 }}
      columns={columns}
      dataSource={data}
    />
  )
}

export default AxiosTable