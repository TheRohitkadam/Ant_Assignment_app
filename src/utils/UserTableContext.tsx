import React, { createContext, FC, ReactNode, useState } from "react";
import data from "../data/users.json";
import { User, ContextType } from "../types/userType";

export const UserTableContext = createContext<ContextType | null>(null);

const UserTableProvider: FC<ReactNode> = ({ children }) => {
  const [usersdata, setUsersdata] = useState<User[]>(data);
  const [selectedUser, setSelectedUser] = useState<User[]>();
  const [isRowSelected, setIsRowSelected] = useState<boolean>(false);

  const saveUser = (userInfo: User) => {    
    setUsersdata([...usersdata, userInfo]);
  };

  const updateUser = () => {};

  return (
    <UserTableContext.Provider
      value={{ usersdata, saveUser, updateUser, setUsersdata }}
    >
      {children}
    </UserTableContext.Provider>
  );
};

export default UserTableProvider;
