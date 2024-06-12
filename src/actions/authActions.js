import axios from "axios";
import {
  LOGIN,
  LOGOUT, 
  SIGNUP,
  RESET,
  LOGIN_FAILURE,
  ALLGET,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART_SUCCESS,
  CLEAR_CART_SUCCESS,
} from "./actionTypes";

// Helper function to get token configuration for axios requests
const getTokenConfig = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  if (!token) throw new Error("No token found");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch the cart data for a user
export const fetchCart = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_CART_REQUEST });
  try {
    const config = getTokenConfig();
    
    // Fetch cart data
    const cartResponse = await axios.get(
      `http://localhost:8000/api/cart/cartdata/${userId}`,
      config
    );
    console.log("Cart Response:", cartResponse.data.cart);

    // Filter out items with null productId
    const validCartItems = cartResponse.data.cart.items.filter(
      (cartItem) => cartItem.productId !== null
    );
    console.log("Valid Cart Items:", validCartItems);

    // Dispatch cart success with filtered items
    dispatch({ 
      type: FETCH_CART_SUCCESS, 
      payload: { ...cartResponse.data.cart, items: validCartItems } 
    });
  } catch (error) {
    console.log("Fetch Cart Error:", error);
    dispatch({
      type: FETCH_CART_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch cart",
    });
  }
};

// Add a product to the user's cart
export const addToCart = (userId, productId, quantity = 1) => async (dispatch) => {
  console.log("Adding product to cart:", userId, productId, quantity);
  dispatch({ type: ADD_TO_CART });
  try {
    const config = getTokenConfig();
    const response = await axios.post(
      "http://localhost:8000/api/cart/add",
      { userId, productId, quantity },
      config
    );
    console.log("Cart after adding product:", response.data.cart); // Check the structure of response.data.cart
    
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data.cart });
    
  } catch (error) {
    dispatch({
      type: FETCH_CART_FAILURE,
      payload: error.response?.data?.message || "Failed to add to cart",
    });
  }
};

// Remove a product from the user's cart
export const removeFromCart = (userId, productId, quantity = 1) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART });
  try {
    const config = getTokenConfig();
    const response = await axios.post(
      "http://localhost:8000/api/cart/decrease",
      { userId, productId, quantity },
      config
    );
    dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: response.data.cart });
  } catch (error) {
    dispatch({
      type: FETCH_CART_FAILURE,
      payload: error.response?.data?.message || "Failed to remove from cart",
    });
  }
};

export const clearCart = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_CART });
  try {
    const config = getTokenConfig();
    const response = await axios.delete(
      `http://localhost:8000/api/cart/cartdata/${userId}`,
      config
    );
    dispatch({ type: CLEAR_CART_SUCCESS, payload: response.data.cart });
  } catch (error) {
    dispatch({
      type: FETCH_CART_FAILURE,
      payload: error.response?.data?.message || "Failed to clear cart",
    });
  }
};

// Log in a user
export const login = (credentials, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      credentials
    );
    if (response.data && response.data.token && response.data.data) {
      const { token, data } = response.data;
      dispatch({ type: LOGIN, payload: data });
      localStorage.setItem("user", JSON.stringify({ token, data }));
      navigate(data.userType === "admin" ? "/admin" : "/dashboard");
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: response.data.message || "Login failed",
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

// Get all user data
export const getAll = (navigate) => async (dispatch) => {
  try {
    const config = getTokenConfig();
    const response = await axios.get(
      "http://localhost:8000/api/auth/users",
      config
    );
    if (response.data && response.data.success && response.data.user) {
      dispatch({ type: ALLGET, payload: response.data.user });
      navigate("/dashboard");
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: response.data.message || "Get user failed",
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || "Get user failed",
    });
  }
};

// Sign up a new user
export const signup = (userData, navigate) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const response = await axios.post(
      "http://localhost:8000/api/auth/signup",
      userData,
      config
    );
    if (response.data && response.data.success) {
      dispatch({ type: SIGNUP });
      navigate("/");
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: response.data.message || "Signup failed",
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || "Signup failed",
    });
  }
};

// Log out the user
export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  localStorage.clear();
  dispatch({ type: CLEAR_CART_SUCCESS });
  dispatch({ type: LOGOUT });
};

// Reset the user's state
export const reset = (email) => ({ type: RESET, payload: email });

// Fetch all products
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const config = getTokenConfig();
    const response = await axios.get("http://localhost:8000/api/products", config);
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};

// Add a new product
export const addProduct = (product) => async (dispatch) => {
  try {
    const config = getTokenConfig();
    const response = await axios.post(
      "http://localhost:8000/api/product",
      product,
      config
    );
    dispatch({ type: ADD_PRODUCT, payload: response.data.data });
  } catch (error) {
    console.error("Add product error:", error);
  }
};

// Delete a product
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    const config = getTokenConfig();
    await axios.delete(
      `http://localhost:8000/api/product/${productId}`,
      config
    );
    dispatch({ type: DELETE_PRODUCT, payload: productId });
  } catch (error) {
    console.error("Delete product error:", error);
  }
};

// Update a product
export const updateProduct = (productId, updatedProductData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const config = getTokenConfig();
    const response = await axios.put(
      `http://localhost:8000/api/products/${productId}`,
      updatedProductData,
      config
    );
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

