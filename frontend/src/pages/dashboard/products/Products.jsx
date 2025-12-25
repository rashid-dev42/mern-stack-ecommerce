import "./Products.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProducts(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${limit}&page=${page}`);
  }, []);

  const fetchProducts = (apiURL) => {
    axios.get(apiURL)
    .then((res) => {
      setProducts(res.data.products);
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
    fetchProducts(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${limit}&page=${page - 1}`)
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page === totalPages) {
      return;
    }
    fetchProducts(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${limit}&page=${page + 1}`);
    setPage(page + 1);
  };

  const changeLimit = (value) => {
    fetchProducts(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${value}&page=${page}`);
    setLimit(value);
  };

  const changeCategory = (value) => {
    if (value === "All") {
      fetchProducts(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${limit}&page=${page}`);
      setCategory(value);
      return;
    }
    fetchProducts(`${import.meta.env.VITE_API_BASE_URL}/api/products?limit=${limit}&page=${page}&search=${value}`);
    setCategory(value);
  };

  return (
    <div className="container-fluid p-3">
      <h3 className="pb-3 border-bottom border-dark">Products</h3>
      <div className="d-flex justify-content-between pb-3">
        <div className="dropdown">
          <span>Category:&nbsp;</span>
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {category}
          </button>
          <ul className="dropdown-menu">
            <li><span role="button" className="dropdown-item" onClick={() => changeCategory("All")}>All</span></li>
            <li><span role="button" className="dropdown-item" onClick={() => changeCategory("Mobile Phone")}>Mobile Phone</span></li>
            <li><span role="button" className="dropdown-item" onClick={() => changeCategory("Watch")}>Watch</span></li>
            <li><span role="button" className="dropdown-item" onClick={() => changeCategory("Headphone")}>Headphone</span></li>
            <li><span role="button" className="dropdown-item" onClick={() => changeCategory("Earphone")}>Earphone</span></li>
            <li><span role="button" className="dropdown-item" onClick={() => changeCategory("Keyboard")}>Keyboard</span></li>
            <li><span role="button" className="dropdown-item" onClick={() => changeCategory("Mouse")}>Mouse</span></li>
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
      <div className="Products-table">
        {products.length > 0 && <table className="w-100 position-relative">
          <thead className="bg-dark text-light position-sticky top-0">
            <tr>
              <th className="px-4 py-2 text-nowrap">Image</th>
              <th className="px-4 py-2 text-nowrap">Product Name</th>
              <th className="px-4 py-2 text-nowrap">Category</th>
              <th className="px-4 py-2 text-nowrap">Discount</th>
              <th className="px-4 py-2 text-nowrap">Price</th>
              <th className="px-4 py-2 text-nowrap">In-stock</th>
              <th className="px-4 py-2 text-nowrap">Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => <tr key={index} className="border-bottom border-secondary-subtle">
              <td className="px-4 py-2 text-nowrap">
                <img src={import.meta.env.VITE_API_BASE_URL + "/" + product.imgPath} alt="" className="Products-img-sm"/>
              </td>
              <td className="px-4 py-2 text-nowrap">{product.productName}</td>
              <td className="px-4 py-2 text-nowrap">{product.category}</td>
              <td className="px-4 py-2 text-nowrap">{product.discount}</td>
              <td className="px-4 py-2 text-nowrap">{product.price}</td>
              <td className="px-4 py-2 text-nowrap">{product.inStock}</td>
              <td className="px-4 py-2 text-nowrap"><button className="btn btn-primary">Edit</button></td>
            </tr>)}
          </tbody>
        </table>}
      </div>

      {/* pagination */}
      <div className="py-3 text-center">
        {products.length > 0 && <span>
          <button className="btn btn-dark" onClick={prevPage}>&lt;</button>
          &nbsp;<span>{page} / {totalPages}</span>&nbsp;  
          <button className="btn btn-dark" onClick={nextPage}>&gt;</button>  
        </span>}
      </div>
    </div>
  );
};

export default Products;