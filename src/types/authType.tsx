export type AuthContextState = {
    userName: string;
    password: string;
    login: (userName: string, password: string) => void;
    logout: () => void;
  };