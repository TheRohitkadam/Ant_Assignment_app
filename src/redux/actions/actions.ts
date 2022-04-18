import { User } from "../../types/userType";

export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";
export const REMOVE_MULTIPLE_USERS = "REMOVE_MULTIPLE_USERS";
export const SET_LIMITED_DATA = "SET_LIMITED_DATA";
export const SET_USERS_COUNT = "SET_USERS_COUNT";
export const SET_LOADING = "SET_LOADING";
export const UPDATE_USER = "UPDATE_USER";
export const SELECT_ROW_KEYS = "SELECT_ROW_KEYS";
export const SET_PAGINATION = "SET_PAGINATION"

export const addUser = (userdata: User) => ({
    type: ADD_USER,
    payload: userdata
});

export const removeUser = (guid: string) => ({
    type: REMOVE_USER,
    payload: guid
})

export const updateUser = (userdata: User) => ({
    type: UPDATE_USER,
    payload: userdata
})

export const removeMultipleUsers = (selected: string[]) => ({
    type: REMOVE_MULTIPLE_USERS,
    payload: selected
})

export const setLimitedData = (pagination: any) => ({
    type: SET_LIMITED_DATA,
    payload: pagination
})

export const setUsersCount = (count: number) => ({
    type: SET_USERS_COUNT,
    payload: count
})

export const setLoading = (loading: boolean) => ({
    type: SET_LOADING,
    payload: loading
})

export const setSelectRowKeys = (selectedRowKeys: any[]) => ({
    type: SELECT_ROW_KEYS,
    payload: selectedRowKeys
})

export const setPagiation = (values: {current: number, pageSize: number}) => ({
    type: SET_PAGINATION,
    payload: values
})

