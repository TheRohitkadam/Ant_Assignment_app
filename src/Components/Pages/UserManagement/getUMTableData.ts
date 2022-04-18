import React from 'react'
import { useSelector } from 'react-redux';
import getTableLimitedData from '../../../utils/getTableLimitedData';
import jsonData from "../../../data/users.json"

const getUMTableData = (pagination: any, filters: any) => {
    // const tableData = useSelector((state: any) => state.tableReducer.users);
    const tableData = jsonData;

    const lastIndex = pagination.current * pagination.pageSize;
    const firstIndex = lastIndex - pagination.pageSize;
    const data = tableData.slice(firstIndex, lastIndex)

    return { data, count: tableData.length }
}

export default getUMTableData