import "./MyOrders.css";
import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [shipping, setShipping] = useState("Pending");

  useEffect(() => {
    fetchMyOrders(`${import.meta.env.VITE_API_BASE_URL}/api/orders/get-my-orders/${localStorage.getItem("email")}/?limit=${limit}&page=${page}&shipping_status=${shipping}`);
  }, []);

  const fetchMyOrders = (apiURL) => {
    axios.get(apiURL)
    .then((res) => {
      setMyOrders(res.data.myOrders);
      setTotalPages(res.data.totalPages);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const prevPage = () => {
    if (page === 1) {
      return;
    }
    fetchProducts(`${import.meta.env.VITE_API_BASE_URL}/api/orders/get-my-orders/${localStorage.getItem("email")}/?limit=${limit}&page=${page - 1}&shipping_status=${shipping}`);
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page === totalPages) {
      return;
    }
    fetchProducts(`${import.meta.env.VITE_API_BASE_URL}/api/orders/get-my-orders/${localStorage.getItem("email")}/?limit=${limit}&page=${page + 1}&shipping_status=${shipping}`);
    setPage(page + 1);
  };

  const changeLimit = (value) => {
    fetchProducts(`${import.meta.env.VITE_API_BASE_URL}/api/orders/get-my-orders/${localStorage.getItem("email")}/?limit=${value}&page=${page}&shipping_status=${shipping}`);
    setLimit(value);
  };

  const changeShipping = (value) => {
    fetchMyOrders(`${import.meta.env.VITE_API_BASE_URL}/api/orders/get-my-orders/${localStorage.getItem("email")}/?limit=${limit}&page=${page}&shipping_status=${value}`);
    setShipping(value);
  };

  return (
    <div className="container-fluid p-3">
      <h3 className="pb-3 border-bottom border-dark">My Orders</h3>
      <div className="d-flex justify-content-between pb-3">
        <div className="dropdown">
          <span>Shipping:&nbsp;</span>
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {shipping}
          </button>
          <ul className="dropdown-menu">
            <li><span role="button" className="dropdown-item" onClick={() => changeShipping("Pending")}>Pending</span></li>
            <li><span role="button" className="dropdown-item" onClick={() => changeShipping("Delivered")}>Delivered</span></li>
          </ul>
        </div>
        <div className="dropdown">
          <span>Show:&nbsp;</span>
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {limit}
          </button>
          <ul className="dropdown-menu">
            <li><span role="button" className="dropdown-item" onClick={() => changeLimit(10)}>10</span></li>
            <li><span role="button" className="dropdown-item" onClick={() => changeLimit(15)}>15</span></li>
            <li><span role="button" className="dropdown-item" onClick={() => changeLimit(20)}>20</span></li>
          </ul>
        </div>
      </div>

      {/* display products */}
      <div className="MyOrders-table">
        {myOrders.length > 0 && <table className="w-100 position-relative">
          <thead className="bg-dark text-light position-sticky top-0">
            <tr>
              <th className="px-4 py-2 text-nowrap">Order Id</th>
              <th className="px-4 py-2 text-nowrap">Total Price</th>
              <th className="px-4 py-2 text-nowrap">Payment Status</th>
              <th className="px-4 py-2 text-nowrap">Shipping Status</th>
              <th className="px-4 py-2 text-nowrap">View Details</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order) => <tr key={order._id} className="border-bottom border-secondary-subtle">
              <td className="px-4 py-2 text-nowrap">{order._id}</td>
              <td className="px-4 py-2 text-nowrap">{order.totalPrice}</td>
              <td className="px-4 py-2 text-nowrap">{order.paymentStatus}</td>
              <td className="px-4 py-2 text-nowrap">{order.shippingStatus}</td>
              <td className="px-4 py-2 text-nowrap"><button className="btn btn-primary">View Details</button></td>
            </tr>)}
          </tbody>
        </table>}
      </div>

      {/* pagination */}
      <div className="py-3 text-center">
        {myOrders.length > 0 && <span>
          <button className="btn btn-dark" onClick={prevPage}>&lt;</button>
          &nbsp;<span>{page} / {totalPages}</span>&nbsp;  
          <button className="btn btn-dark" onClick={nextPage}>&gt;</button>  
        </span>}
      </div>
    </div>
  );
};

export default MyOrders;