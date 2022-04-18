import dataSource from "../../../data/randomUsers.json"
import getAge from "../../../utils/getAge";
import userNameConcat from "../../../utils/userNameConcat";

const jsonData: any = dataSource;
const rowData = jsonData.results

const getTableData = (pagination: any, filters: any) => {
    let filteredData = rowData;

    if (filters?.name?.length > 0) {
        filteredData = rowData.filter((user: any) => {
            const name = userNameConcat(user.name);
            return name.toLowerCase().includes(filters.name);
        });
    }

    if (filters?.dob?.length > 0) {
        filteredData = rowData.filter((user: any) => {
            const age = getAge(user["dob"]["date"]);
            return filters?.dob.some(
                (userAge: string) =>
                    (userAge === "Below 30" && age < 30) ||
                    (userAge === "30 to 40" && age >= 30 && age <= 40) ||
                    (userAge === "40 to 50" && age >= 40 && age <= 50) ||
                    (userAge === "50 to 60" && age >= 50 && age <= 60) ||
                    (userAge === "Above 60" && age > 60)
            );
        });
    }

    if (filters?.gender?.length > 0) {
        // filteredData = rowData.filter((user: any) => filteredData.gender.includes(user.gender)
        filteredData = rowData.filter((user: any) =>
            filters?.gender?.some(
                (usergender: string) => usergender === user.gender
            )
        );
        console.log("log", filteredData);
    }

    if (filters?.location?.length > 0) {
        filteredData = rowData.filter((user: any) =>
            filters?.location?.some(
                (country: string) => country === user.location.country
            )
        );
    }

    const lastIndex = pagination.current * pagination.pageSize; // 1 * 10 = 10
    const firstIndex = lastIndex - pagination.pageSize; // 10 - 10 = 0
    const data = filteredData.slice(firstIndex, lastIndex)

    return { data, count: filteredData.length }
}

export default getTableData