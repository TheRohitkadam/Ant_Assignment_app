import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

type Props = { 
    children: JSX.Element
}

const RequireAuth = (props: Props) => {
  const auth = useAuth();

  if (auth.userName === "" && auth.password === "") {
    return <Navigate to="/login" />;
  }
  return props.children;
};

export default RequireAuth;
