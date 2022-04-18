import { User } from "../types/userType";

const getTableLimitedData = (
  pagination: any,
  tableData: any,
  remainingUsers?: User[]
): {
  data: any;
  count: any;
} => {

  const lastIndex = pagination.current * pagination.pageSize;
  const firstIndex = lastIndex - pagination.pageSize;
  const data = tableData.slice(firstIndex, lastIndex);

  return { data, count: tableData.length };
};

export default getTableLimitedData