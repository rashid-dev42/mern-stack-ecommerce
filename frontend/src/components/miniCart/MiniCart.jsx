import "./MiniCart.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { remove, increment, decrement } from "../../features/cart/cartSlice";
import { closeMiniCart } from "../../features/mcDisplay/mcdSlice";
import { pause } from "../../utility";
import ToastMessage from "../toastMessage/ToastMessage";

const MiniCart = () => {
  const cartItems = useSelector(state => state.cartReducer.cartItems);
  const totalPrice = useSelector(state => state.cartReducer.totalPrice);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = async () => {  
    if (!localStorage.getItem("email")) {
      dispatch(closeMiniCart());
      navigate("/sign-in");
      return;
    }

    const orderData = { cartItems, totalPrice, email: localStorage.getItem("email") };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/orders/checkout`, orderData, {
        headers: {
          auth_token: localStorage.getItem("authToken")
        }
      });
      window.location.href = res.data.sessionURL;
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "jwt expired") {
        setSuccess(false);
        setMessage("Sorry! Sign In Session Expired");
        setShowToast(true);
        await pause(3000);
        setShowToast(false);
        localStorage.clear();
        dispatch(closeMiniCart());
        navigate("/sign-in");
      }
    }
  };

  return (
    <div className="MiniCart">
      {/* Empty Cart Message */}
      {cartItems.length === 0 && <div className="MiniCart-empty">
        <div className="d-flex h-100 flex-column justify-content-center align-items-center">
          <h1>
            <i className="bi bi-cart"></i>
          </h1>
          <p>Your cart is empty.</p>
          <button className="btn btn-primary">Return to Shop</button>
        </div>
      </div>}

      {/* Display Cart Items */}
      {cartItems.length > 0 && <div className="MiniCart-content">
        {/* Mini Cart Main */}
        <div className="MiniCart-main">{cartItems.map(cartItem => <div key={cartItem._id} className="my-1">
          <div className="d-flex flex-row">
            <div className="MiniCart-itemImage">
              <img src={import.meta.env.VITE_API_BASE_URL + "/" + cartItem.imgPath} alt={cartItem.productName}/>
            </div>
            <div className="MiniCart-itemInfo">
              <div className="d-flex justify-content-between my-1">
                <h4 className="text-nowrap text-truncate">{cartItem.productName}</h4>
                <span role="button" className="fs-5 px-1"><i className="bi bi-trash" onClick={() => dispatch(remove(cartItem._id))}></i></span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <button className="px-2" onClick={() => dispatch(decrement(cartItem._id))}>-</button>&nbsp;
                  {cartItem.quantity}&nbsp;
                  <button className="px-2" onClick={() => dispatch(increment(cartItem._id))}>+</button>
                </div>
                <div className="pe-2">
                  <span>${cartItem.quantity * cartItem.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>)}</div>
        {/* Mini Cart Footer */}
        <div className="MiniCart-footer p-2">
          <hr/>
          <div className="d-flex justify-content-between">
            <h4>Total:</h4>
            <h4>${totalPrice}</h4>
          </div>
          <button className="btn btn-outline-dark w-100 mb-2">View Full Cart</button>  
          <button className="btn btn-primary w-100" onClick={handleCheckout}>Checkout</button>  
        </div> 
      </div>}
      {showToast && <ToastMessage success={success} message={message} setShowToast={setShowToast}/>}
    </div>
  );
};

export default MiniCart;