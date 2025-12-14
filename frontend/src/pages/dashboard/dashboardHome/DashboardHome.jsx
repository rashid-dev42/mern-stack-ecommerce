import "./DashboardHome.css";
import { Navigate, Link, Outlet } from "react-router-dom";

const DashboardHome = () => {
  let showSidebar = true;

  const toggleSidebar = () => {
    if (showSidebar === true) {
      showSidebar = false;
      document.getElementById("Dashboard-sidebar").classList.replace("Dashboard-w-1", "Dashboard-w-2");
      document.getElementById("Dashboard-main").classList.replace("Dashboard-w-3", "Dashboard-w-4");
    } else {
      showSidebar = true;
      document.getElementById("Dashboard-sidebar").classList.replace("Dashboard-w-2", "Dashboard-w-1");
      document.getElementById("Dashboard-main").classList.replace("Dashboard-w-4", "Dashboard-w-3");
    }
  };

  return (
    <div>
      {localStorage.getItem("email") ? <div className="Dashboard-container">
        <div id="Dashboard-sidebar" className="Dashboard-sidebar Dashboard-w-1 bg-primary text-white">
          <div>
            <h3 className="text-xl font-bold text-light py-3 ps-4">Logo</h3>
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
        <div id="Dashboard-main" className="Dashboard-main Dashboard-w-3">
          <div className="bg-primary text-light">
            <div className="d-flex">
              <div className="pt-1">
                <button className="btn btn-light border-primary border-3 rounded-0 fs-5" onClick={toggleSidebar}><i className="bi bi-list"></i></button>
              </div>
              <div className="flex-fill">
                <h5 className="text-center m-0 py-3">Dashboard</h5>
              </div>
            </div>
          </div>
          <div className="Dashboard-content">
            <Outlet/>
          </div>
        </div>
      </div> : <Navigate to="/"/>}
    </div>
  );
};

export default DashboardHome;