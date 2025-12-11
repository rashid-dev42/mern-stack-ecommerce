import "./DashboardHome.css";
import { Navigate, Link, Outlet } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div>
      {localStorage.getItem("email") ? <div className="Dashboard-container">
        <div className="Dashboard-sidebar bg-primary text-white">
          <div className="">
            <h3 className="text-xl font-bold text-light py-3 ps-4">Dashboard</h3>
          </div>
          <div>
            <Link to="/dashboard" className="d-block w-100 text-light py-3 ps-4 text-decoration-none link-hover">Overview</Link>
          </div>
          <div>
            <Link to="/dashboard/orders" className="d-block w-100 text-light py-3 ps-4 text-decoration-none link-hover">Orders</Link>
          </div>
          <div>
            <Link to="/dashboard/products" className="d-block w-100 text-light py-3 ps-4 text-decoration-none link-hover">Products</Link>
          </div>
          <div>
            <Link to="/dashboard/users" className="d-block w-100 text-light py-3 ps-4 text-decoration-none link-hover">Users</Link>
          </div>
          <div>
            <Link to="/dashboard/profile" className="d-block w-100 text-light py-3 ps-4 text-decoration-none link-hover">Profile</Link>
          </div>
          <div>
            <Link to="/dashboard/my-orders" className="d-block w-100 text-light py-3 ps-4 text-decoration-none link-hover">My Orders</Link>
          </div>
          <div>
            <Link to="/" className="d-block w-100 text-light py-3 ps-4 text-decoration-none link-hover">Homepage</Link>
          </div>
          <div>
            <Link to="/sign-out" className="d-block w-100 text-light py-3 ps-4 text-decoration-none link-hover">Sign Out</Link>
          </div>
        </div>
        <div className="Dashboard-main">
          <Outlet/>
        </div>
      </div> : <Navigate to="/"/>}
    </div>
  );
};

export default DashboardHome;