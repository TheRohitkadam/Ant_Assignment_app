import { createContext, useContext } from "react";

// export enum Theme {
//     Dark = 'Dark',
//     Light = 'Light',
// }

// export type ThemeContextType = {
//     theme: Theme;
//     setTheme: (Theme: Theme) => void;
// }

// export const ThemeContext = createContext<ThemeContextType>({ theme: Theme.Dark, setTheme: theme => console.warn('no theme provider')});
// export const useTheme = () => useContext(ThemeContext);

export type UserDataType = {
  _id: string;
  index: number;
  guid: string;
  isActive: boolean;
  picture: string;
  name: string;
  email: string;
  location: string;
  office: string;
  manager: string;
  jobTitle: string;
  application: string[];
};

export type UserContextType = {
  userData: UserDataType;
  setUserData: (UserData: UserDataType) => void;
  // selectRow: UserData[];
  // setSelectRow: (UserData: UserData) => void;
};

export const initialState = {
  _id: "",
  index: 0,
  guid: "",
  isActive: false,
  picture: "",
  name: "",
  email: "",
  location: "",
  office: "",
  manager: "",
  jobTitle: "",
  application: [""],
};

export const UserContext = createContext<UserContextType>({
  userData: initialState,
  setUserData: (userData) => console.warn("no user data provider"),
  // selectRow: [],
  // setSelectRow: (userData) => console.warn("no user data provider"),
});

export const useUserData = () => useContext(UserContext);