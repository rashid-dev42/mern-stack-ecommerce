import { useEffect, useState } from "react";
import axios from "axios";

const Overview = () => {
  const [pendingOrders, setPendingOrders] = useState(0);
  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders/count-orders?shipping_status=Pending`)
    .then((res) => {
      setPendingOrders(res.data.totalOrders);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className="container-fluid p-3">
      <h3 className="p-0 pb-3 border-bottom border-dark">Overview</h3>
      <div className="row g-3">
        <div className="col-6">
          <div className="bg-info-subtle">
            <h5 className="text-center pt-3 pb-2">Pending Orders</h5>
            <h1 className="text-center pb-3 fw-bold">{pendingOrders}</h1>
          </div>
        </div>
        <div className="col-6">
          <div className="bg-success-subtle">
            <h5 className="text-center pt-3 pb-2">Completed Orders</h5>
            <h1 className="text-center pb-3 fw-bold">150</h1>
          </div>
        </div>
        <div className="col-6">
          <div className="bg-secondary-subtle">
            <h5 className="text-center pt-3 pb-2">Total Products</h5>
            <h1 className="text-center pb-3 fw-bold">18</h1>
          </div>
        </div>
        <div className="col-6">
          <div className="bg-primary-subtle">
            <h5 className="text-center pt-3 pb-2">Total Users</h5>
            <h1 className="text-center pb-3 fw-bold">20</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;