import "./Home.css";
import smartphone1 from "../../assets/smartphone-1.png";

const Home = () => {
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
          <div className="row g-5">
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
    </div>
  );
};

export default Home;