import "../css/App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Visits from "./Visits";
import NewVisit from "./NewVisit";
import Login from "./Login";
import NoMatch from "./NoMatch";
import Logout from "./Logout";
import Employees from "./Employees";
import Reasons from "./Reasons";
import Users from "./Users";
import NewPassword from "./NewPassword";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route index element={<Visits />} />
        <Route exact path="/visits" element={<Visits />} />
        <Route exact path="/newvisit" element={<NewVisit />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/employees" element={<Employees />} />
        <Route exact path="/reasons" element={<Reasons />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/newPassword" element={<NewPassword/>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
