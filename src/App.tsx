import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/app.less";
import Dashboard from "./Components/Pages/Dashboard";
import Login from "./Components/Pages/Login";
import { AuthProvider } from "./utils/Auth";
import RequireAuth from "./utils/RequireAuth";
import Profile from "./Components/Pages/Profile";
import Inbox from "./Components/Pages/Inbox";
import LayoutContainer from "./Components/Common/LayoutContainer";
import UserManagement from "./Components/Pages/UserManagement";
import UserTableProvider from "./utils/UserTableContext";
import UMwithRedux from "./Components/Pages/UMwithRedux";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <LayoutContainer />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="userprofile"
              element={<Profile isUserProfile={true} />}
            />
            <Route path="inbox" element={<Inbox />} />
            <Route
              path="user"
              element={
                <UserTableProvider>
                  <UserManagement />
                </UserTableProvider>
              }
            />
            <Route path="umwithredux" element={<UMwithRedux />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
