import { Navigate } from "react-router-dom";
import AdminDashboard from "../adminDashboard/AdminDashboard";
import UserDashboard from "../userDashboard/UserDashboard";

const DashboardHome = () => {
  return (
    <div>
      {!localStorage.getItem("email") && <Navigate to="/"/>}
      {localStorage.getItem("role") === "Admin" && <AdminDashboard/>}
      {localStorage.getItem("role") === "User" && <UserDashboard/>}
    </div>
  );
};

export default DashboardHome;