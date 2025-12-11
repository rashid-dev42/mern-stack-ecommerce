import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import SignOut from "./pages/signOut/SignOut";
import VerifyOrder from "./pages/verifyOrder/VerifyOrder";
import DashboardHome from "./pages/dashboard/dashboardHome/DashboardHome";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout>
            <Home/>
          </Layout>}/>
          <Route path="/shop" element={<Layout>
            <Shop/>
          </Layout>}/>
          <Route path="/cart" element={<Layout>
            <p>This is cart page</p>
          </Layout>}/>
          <Route path="/sign-in" element={<Layout>
            <SignIn/>
          </Layout>}/>
          <Route path="/sign-up" element={<Layout>
            <SignUp/>
          </Layout>}/>
          <Route path="/sign-out" element={<SignOut/>}/>
          <Route path="/verify-order" element={<Layout>
            <VerifyOrder/>
          </Layout>}/>
          <Route path="/dashboard" element={<DashboardHome/>}>
            <Route index element={<div>Overview</div>}/>
            <Route path="/dashboard/orders" element={<div>Orders</div>}/>
            <Route path="/dashboard/products" element={<div>Products</div>}/>
            <Route path="/dashboard/users" element={<div>Users</div>}/>
            <Route path="/dashboard/profile" element={<div>Profile</div>}/>
            <Route path="/dashboard/my-orders" element={<div>MyOrders</div>}/>
          </Route>
          <Route path="*" element={<Layout>
            <p>404 Not Found. Sorry! The page you are looking for was not found.</p>
          </Layout>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
