import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [shippingStatus, setShippingStatus] = useState("Pending");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders(shippingStatus);
  }, []);

  const fetchOrders = (value) => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders/get-orders?shipping_status=${value}`)
    .then((res) => {
      setOrders(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="container-fluid p-3">
      <div className="d-flex justify-content-between pb-3 border-bottom border-dark">
        <h3 className="">Orders</h3>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {shippingStatus}
          </button>
          <ul className="dropdown-menu">
            <li><span role="button" className="dropdown-item">Pending</span></li>
            <li><span role="button" className="dropdown-item">Delivered</span></li>
          </ul>
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        {orders.length > 0 && <table className="w-100">
          <thead className="bg-dark text-light">
            <th className="px-4 py-2 text-nowrap">Order Id</th>
            <th className="px-4 py-2 text-nowrap">Email</th>
            <th className="px-4 py-2 text-nowrap">Total Price</th>
            <th className="px-4 py-2 text-nowrap">Payment Status</th>
            <th className="px-4 py-2 text-nowrap">Shipping Status</th>
            <th className="px-4 py-2 text-nowrap">View Details</th>
          </thead>
          <tbody>
            {orders.map((order) => <tr className="border-bottom border-secondary-subtle">
              <td className="px-4 py-2 text-nowrap">{order._id}</td>
              <td className="px-4 py-2 text-nowrap">{order.email}</td>
              <td className="px-4 py-2 text-nowrap">{order.totalPrice}</td>
              <td className="px-4 py-2 text-nowrap">{order.paymentStatus}</td>
              <td className="px-4 py-2 text-nowrap">{order.shippingStatus}</td>
              <td className="px-4 py-2 text-nowrap"><button className="btn btn-primary">View Details</button></td>
            </tr>)}
          </tbody>  
        </table>}
      </div>
    </div>
  );
};

export default Orders;