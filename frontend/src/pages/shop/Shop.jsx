import "./Shop.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SingleProduct from "../../components/singleProduct/SingleProduct";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [items, setItems] = useState(12);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const category = new URLSearchParams(location.search).get("category");
    if (category) {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${items}&page=${page}&search=${category}`);
      setCategory(category);
    } else {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${items}&page=${page}`);
      setCategory("All");
    }
  }, [location]); /* When a NavLink/Link is clicked, a new location object reference is generated even if it points to the same route.
  If we use the location object in the dependency array, it will re-render the component. */

  const fetchData = (apiURL) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    setLoading(true);
    setProducts([]);
    setMessage("");
    setTotalPages(0);
    axios.get(apiURL)
    .then(res => {
      if (res.data.products.length > 0) {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } else if (res.data.products.length === 0) {
        setMessage("No items found.");
      }
      setLoading(false);
    })
    .then(() => history.pushState(null, "", "/shop"))
    .catch(error => console.log(error));
  };

  const changeCategory = (value) => {
    setCategory(value);
    if (value === "All") {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${items}&page=${page}`);
    } else {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${items}&page=${page}&search=${value}`);
    }
  };

  const changeItems = (value) => {
    setItems(value);
    if (category !== "All") {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${value}&page=${page}&search=${category}`);
    } else if (category === "All") {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${value}&page=${page}`);
    }
  };

  const previousPage = () => {
    if (page > 1 && category !== "All") {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${items}&page=${page - 1}&search=${category}`);
      setPage(page - 1);
    } else if (page > 1 && category === "All") {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${items}&page=${page - 1}`);
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages && category !== "All") {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${items}&page=${page + 1}&search=${category}`);
      setPage(page + 1);
    } else if (page < totalPages && category === "All") {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${items}&page=${page + 1}`);
      setPage(page + 1);
    }
  };

  return (
    <div className="Shop">
      {/* Shop Header Section */}
      <div className="Shop-header py-5">
        <div className="container">
          <h6>Home / Shop</h6>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container my-3 border-bottom border-secondary">
        <div className="d-flex justify-content-between flex-column flex-sm-row">
          {/* Category */}
          <div className="dropdown pb-2">
            Category <button className="btn btn-secondary dropdown-toggle" style={{ width: "150px" }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {category}
            </button>
            <ul className="dropdown-menu">
              <li><span className="dropdown-item" role="button" onClick={() => changeCategory("All")}>All</span></li>
              <li><span className="dropdown-item" role="button" onClick={() => changeCategory("Mobile Phone")}>Mobile Phone</span></li>
              <li><span className="dropdown-item" role="button" onClick={() => changeCategory("Watch")}>Watch</span></li>
              <li><span className="dropdown-item" role="button" onClick={() => changeCategory("Headphone")}>Headphone</span></li>
              <li><span className="dropdown-item" role="button" onClick={() => changeCategory("Earphone")}>Earphone</span></li>
              <li><span className="dropdown-item" role="button" onClick={() => changeCategory("Keyboard")}>Keyboard</span></li>
              <li><span className="dropdown-item" role="button" onClick={() => changeCategory("Mouse")}>Mouse</span></li>
            </ul>
          </div>
          {/* Items Per Page */}
          <div className="dropdown pb-2">
            Items Per Page <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {items}
            </button>
            <ul className="dropdown-menu">
              <li><span className="dropdown-item" role="button" onClick={() => changeItems(12)}>12</span></li>
              <li><span className="dropdown-item" role="button" onClick={() => changeItems(24)}>24</span></li>
              <li><span className="dropdown-item" role="button" onClick={() => changeItems(36)}>36</span></li>
            </ul>
          </div>          
        </div>
      </div>

      {/* Products Section */}
      {message !== "" && <div className="container">
        <h3 className="text-secondary text-center">{message}</h3>
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
      </div>}
      {totalPages !== 0 && <div className="container text-center my-5">
        <button className="btn btn-outline-dark" onClick={previousPage}>&lt;</button>&nbsp;&nbsp;
        <span>{page} / {totalPages}</span>&nbsp;&nbsp;
        <button className="btn btn-outline-dark" onClick={nextPage}>&gt;</button>
      </div>}
    </div>
  );
};

export default Shop;