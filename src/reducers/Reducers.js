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
  ADD_PRODUCT,
  DELETE_PRODUCT,
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART_SUCCESS,
  CLEAR_CART_SUCCESS,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  
} from "../actions/actionTypes";

const initialState = {
  user: {
    firstName: "",
    lastName: "",
    email: ""
  },
  userData: null,
  loading: false,
  error: null,
  products: [],
  cart: [],
  resetPasswordMessage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload, loading: false, error: null };
    case LOGOUT:
      return { ...state, user: null, userData: null };
    case SIGNUP:
      return { ...state, user: action.payload, loading: false, error: null };
    case RESET:
      return { ...state, loading: false, error: null };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ALLGET:
      return { ...state, userData: action.payload, loading: false, error: null };
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case DELETE_PRODUCT:
      return { ...state, products: state.products.filter(product => product._id !== action.payload) };
    case FETCH_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CART_SUCCESS:
      return { ...state, loading: false, cart: action.payload.items };
    case FETCH_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_TO_CART_SUCCESS:
      return { ...state, cart: action.payload.items };
    case REMOVE_FROM_CART_SUCCESS:
        return { ...state, cart: state.cart.filter(item => item.productId !== action.payload) };
    case CLEAR_CART_SUCCESS:
      return { ...state, cart: [] };
    case UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_PRODUCT_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    
    default:
      return state;
  }
};

export default authReducer;
