import "./Home.css";
import smartphone1 from "../../assets/smartphone-1.png";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleProduct from "../../components/singleProduct/SingleProduct";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_SERVER_BASE_URL}/api/products?limit=12&page=1`);
  }, []);

  const fetchData = (apiURL) => {
    setLoading(true);
    setProducts([]);
    setMessage("");
    axios.get(apiURL)
    .then(res => {
      if (res.data.products.length > 0) {
        setProducts(res.data.products);
      } else if (res.data.products.length === 0) {
        setMessage("No items found.");
      }
      setLoading(false);
    })
    .catch(error => console.log(error));
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="Home-heroSection">
        <div className="container h-100">
          <div className="row h-100">
            {/* hsc1 = hero section column 1 */}
            <div className="Home-hsc1 col-12 col-md-6 p-0">
              <div className="position-relative h-100">
                {/* hspi = hero section product info */}
                <div className="Home-hspi px-3">
                  <h1 className="pb-3">Smartphone One</h1>
                  <p className="pb-1">8 Core CPU, 8GB RAM, 256GB Storage, 6.8" 1080x1920p Display, 50+8MP Main Camera, 20MP Front Camera</p>
                  <h4>$224 <strike className="text-secondary">$249</strike></h4>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
            {/* hsc2 = hero section column 2 */}
            <div className="Home-hsc2 col-12 col-md-6">
              <div className="position-relative h-100">
                {/* hsi = hero section image */}
                <img src={smartphone1} alt="" className="Home-hsi"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      {/* wcus = why choose us section */}
      <div className="Home-wcus">
        <div className="container py-5">
          <div className="row gy-5">
            <div className="col-12 col-sm-6 col-lg-3 text-center">
              <div>
                <div><i className="bi bi-truck fs-1"></i></div>
                <h4>Fast Delivery</h4>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 text-center">
              <div>
                <div><i className="bi bi-cash-coin fs-1"></i></div>
                <h4>Free Shipping</h4>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 text-center">
              <div>
                <div><i className="bi bi-stars fs-1"></i></div>
                <h4>Premium Quality</h4>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 text-center">
              <div>
                <div><i className="bi bi-headset fs-1"></i></div>
                <h4>24/7 Support</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container text-center mt-5 mb-5">
        <div>
          <div className="d-flex justify-content-center">
            <h3 className="border-bottom border-secondary border-3 pb-2" style={{ width: "fit-content" }}>Our Products</h3>
          </div>
        </div>
        <p className="">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      </div>
      {message !== "" && <div className="container mb-5">
        <h3 className="text-secondary text-center">{message}</h3><br/>
      </div>}
      {loading && <div className="mb-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>}
      {!loading && <div className="container">
        <div className="row gy-5">
          {products.map(product => <div key={product._id} className="col-12 col-sm-6 col-lg-4 col-xl-3"><SingleProduct product={product}/></div>)}
        </div>
        {message === "" && <div className="container text-center my-5">
          <button className="btn btn-dark">View All</button>
        </div>}
      </div>}
    </div>
  );
};

export default Home;