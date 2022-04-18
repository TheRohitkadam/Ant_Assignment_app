import { uuidv4 } from "@antv/xflow-core";
import { User } from "../../types/userType";
import nameConcat from "../../utils/nameConcat";
import { ADD_USER, REMOVE_MULTIPLE_USERS, REMOVE_USER, SELECT_ROW_KEYS, SET_LIMITED_DATA, SET_LOADING, SET_PAGINATION, SET_USERS_COUNT, UPDATE_USER } from "../actions/actions";
import { initialState } from "../initialState";

type Action = {
    type: string,
    payload?: any
}

function tableReducer(state = initialState, action: Action) {
    console.log("payload", action.payload)
    switch (action.type) {
        case ADD_USER: {
            const [name, val] = nameConcat(action.payload);
            const user = {
                ...val,
                name,
                _id: (Math.random() + 1).toString(36).substring(1),
                index: state.users.length + 1,
                guid: uuidv4(),
                office: "something",
                isActive: false,
                picture: "http://placehold.it/32x32",
            };
            return {
                ...state,
                users: [...state.users, user],
                limitedUsers: [...state.limitedUsers, user],
                renderCount: state.renderCount + 1
            }
        }
        case REMOVE_USER: {
            return {
                ...state,
                users: state.users.filter(user => !action.payload.includes(user.guid)),
                limitedUsers: state.limitedUsers.filter(user => !action.payload.includes(user.guid)),
                renderCount: state.renderCount + 1
            }
        }
        case UPDATE_USER: {
            const idx = state.users.findIndex((userinfo) => userinfo.guid === action.payload.guid);
            const limitedUserId = state.limitedUsers.findIndex((userinfo) => userinfo.guid === action.payload.guid);
            const data = state.users;
            const limitedData = state.limitedUsers;
            data[idx] = action.payload
            limitedData[limitedUserId] = action.payload
            return {
                ...state,
                users: data,
                limitedUsers: limitedData,
                renderCount: state.renderCount + 1
            }
        }
        case REMOVE_MULTIPLE_USERS: {
            return {
                ...state,
                users: state.users.filter((user: User) => {
                    return !action.payload.includes(user.guid)
                }),
                limitedUsers: state.limitedUsers.filter((user: User) => {
                    return !action.payload.includes(user.guid)
                }),
                renderCount: state.renderCount + 1
            }
        }
        case SET_LIMITED_DATA: {
            const lastIndex = action.payload.current * action.payload.pageSize; // 1 * 10 = 10
            const firstIndex = lastIndex - action.payload.pageSize; // 10 - 10 = 0
            const data = state.users.slice(firstIndex, lastIndex)
            return {
                ...state,
                limitedUsers: data,
                usersCount: state.users.length
            }
        }
        case SET_USERS_COUNT: {
            return {
                ...state,
                usersCount: action.payload
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                tableLoading: action.payload
            }
        }
        case SELECT_ROW_KEYS: {
            return {
                ...state,
                selectedRowKeys: action.payload
            }
        }
        case SET_PAGINATION: {
            return {
                ...state,
                current: action.payload.current,
                pageSize: action.payload.pageSize,
            }
        }
        default:
            return state;
    }
}

export default tableReducer