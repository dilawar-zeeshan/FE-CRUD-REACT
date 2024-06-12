import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAll,
  logout,
  fetchProducts,
  addToCart,
  removeFromCart,
  fetchCart,
} from "../actions/authActions";
import ppImage from "./pp.png";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const products = useSelector((state) => state.auth.products);
  const cart = useSelector((state) => state.auth.cart);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);



  useEffect(() => {
  console.log("Dashboard useEffect called");
  if (!userData) {
    console.log("User not found, calling getAll");
     dispatch(getAll(navigate));
  } else {
    console.log("User found:", userData);
  }
}, [userData, navigate, dispatch]);

  useEffect(() => {
    console.log("Fetching products");
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("User data in Dashboard:", userData);
  }, [userData]);

  useEffect(() => {
    // Fetch cart when userData changes
    if (userData && userData._id) {
      console.log("Fetching cart for user:", userData._id);
      dispatch(fetchCart(userData._id));
    }
  }, [userData, dispatch]);
  
  // Removed cart from the dependency array
  

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleAddToCart = async (product) => {
    if (userData && userData._id) {
      console.log("Adding product to cart:", product);
      await dispatch(addToCart(userData._id, product._id, 1));
      // Fetch cart after adding to ensure it's up-to-date
      dispatch(fetchCart(userData._id));
    }
  };

  const handleRemoveFromCart = async (productId) => {
    if (userData && userData._id) {
      await dispatch(removeFromCart(userData._id, productId, 1));
      // Fetch cart after removing to ensure it's up-to-date
      dispatch(fetchCart(userData._id));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <div className="dash-con">
      <div className="left">
        <div className="dash">
          <div className="cl-pp">
            <img src={ppImage} alt="Icon" />
          </div>
          {userData ? (
            <>
              <div className="name" style={{ fontSize: "32px", fontWeight: "545" }}>
                {userData.firstName} {userData.lastName}
              </div>
              <div className="email" style={{ color: "rgb(108, 107, 106)" }}>
                {userData.email}
              </div>
            </>
          ) : (
            <p>Loading user info...</p>
          )}
          <hr className="hr" />
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="cart">
          <h2>Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="cart-sum">
              {cart.map((cartItem) => (
                <li key={cartItem._id} className="cart-i">
                  <p>Quantity: {cartItem.quantity}</p>
                  <p>Title: {cartItem.productId?.title}</p>
                  <p>Total Price: ${cartItem.totalPrice.toFixed(2)}</p>
                  <button
                    className="cart-btn"
                    onClick={() => handleRemoveFromCart(cartItem.productId?._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="total">
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        </div>
      </div>
      <div className="right">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul className="products-list">
            {products.map((product) => (
              <li key={product._id} className="l-item">
                <h3 id="product-title">{product.title}</h3>
                <img className="p-img" src={product.image_url} alt={product.title} />
                <p id="product-id">${product.price}</p>
                <p id="product-body">{product.description}</p>
                <button className="cart-btn" onClick={() => handleAddToCart(product)}>
                  Buy
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
