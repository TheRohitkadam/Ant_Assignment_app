import { useState, createContext, FC, useContext } from "react";
import { AuthContextState } from "../types/authType";

const contextDefaultValues: AuthContextState = {
  userName: "",
  password: "",
  login: () => {},
  logout: () => {}
};

export const AuthContext = createContext<AuthContextState>(contextDefaultValues);

export const AuthProvider: FC = ({ children }) => {
  const [userName, setUserName] = useState<string>(contextDefaultValues.userName);
  const [password, setPassword] = useState<string>(contextDefaultValues.password);

  const login = (userName: string, password: string) => {
    setUserName(userName);
    setPassword(password);
  };

  const logout = () => {
    setUserName("");
    setPassword("");
  };

  return (
    <AuthContext.Provider value={{ userName, password, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext)
}
