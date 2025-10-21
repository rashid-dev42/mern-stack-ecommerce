import "./SingleProduct.css";
import imageNotFound from "../../assets/image-not-found.png";
import { useDispatch } from "react-redux";
import { add } from "../../features/cart/cartSlice";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="SingleProduct">
      <div className="SingleProduct-img">
        {product.imgPath === "" && <img src={imageNotFound} alt=""/>}
        {product.imgPath !== "" && <img src={"http://localhost:5001/" + product.imgPath} alt=""/>}
      </div>
      <h4>{product.productName}</h4>
      <h5>${product.price}</h5>
      <button
        className="btn btn-primary w-100"
        onClick={() => dispatch(add(product))}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default SingleProduct;