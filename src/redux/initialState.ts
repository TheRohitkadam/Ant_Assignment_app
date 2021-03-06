import usersjson from "../data/users.json"
import { User } from "../types/userType"

export const initialState: {
    users: User[];
    limitedUsers: User[];
    usersCount: number;
    tableLoading: boolean;
    selectedRowKeys: any[];
    renderCount: number;
    current: number;
    pageSize: number;
} = {
    users: usersjson,
    limitedUsers: [],
    usersCount: 0,
    tableLoading: false,
    selectedRowKeys: [],
    renderCount: 0,
    current: 1,
    pageSize: 10
}