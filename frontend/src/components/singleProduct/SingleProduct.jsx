import "./SingleProduct.css";
import imageNotFound from "../../assets/image-not-found.png";

const SingleProduct = ({ product }) => {
  return (
    <div className="SingleProduct">
      <div className="SingleProduct-img">
        {product.imgPath === "" && <img src={imageNotFound} alt=""/>}
        {product.imgPath !== "" && <img src={"http://localhost:5001/" + product.imgPath} alt=""/>}
      </div>
      <h4>{product.productName}</h4>
      <h5>${product.price}</h5>
      <button className="btn btn-success w-100">Add to Cart</button>
    </div>
  );
};

export default SingleProduct;