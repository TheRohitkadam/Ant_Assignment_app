import { Dispatch, ReactElement, SetStateAction } from "react";

export interface User {
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

export type ContextType = {
  usersdata: User[];
  saveUser: (user: User) => void;
  updateUser: (id: number) => void;
  // getSelectedUsers: (rowData: User[], rowSelected: boolean) => void,
  // isRowSelected: boolean,
  // setIsRowSelected: Dispatch<SetStateAction<boolean>>,
  setUsersdata: Dispatch<SetStateAction<User[]>>
};

export type Data = User[]