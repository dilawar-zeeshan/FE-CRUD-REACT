import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import {
  logout,
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../actions/authActions";
import ppImage from "./pp.png";

function Adminmgmt() {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.auth.products);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    image_url: "",
  });

  const [updateProductData, setUpdateProductData] = useState({
    id: "",
    title: "",
    description: "",
    price: 0,
    image_url: "",
  });

  const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    setNewProduct({ title: "", description: "", price: 0, image_url: "" });
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleFillForm = (product) => {
    setUpdateProductData({
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
    });
  };

  const handleUpdateProduct = async () => {
     await dispatch(
      updateProduct(updateProductData.id, {
        title: updateProductData.title,
        description: updateProductData.description,
        price: updateProductData.price,
        image_url: updateProductData.image_url,
      })
    );
    setUpdateProductData({
      id: "",
      title: "",
      description: "",
      price: 0,
      image_url: "",
    });
     dispatch(fetchProducts());
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="dash-con">
      <div className="left">
        <div className="dash">
          <div className="cl-pp">
            <img src={ppImage} alt="Icon" />
          </div>
          {user && (
            <>
              <div
                className="name"
                style={{ fontSize: "32px", fontWeight: "545" }}
              >
                {user.firstName} {user.lastName}
              </div>
              <div className="email" style={{ color: "rgb(108, 107, 106)" }}>
                {user.email}
              </div>
            </>
          )}
          <hr className="hr" />
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
        <div className="product-form">
          <h2>Add New Product</h2> 
          <input
            type="text"
            placeholder="Title"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image_url}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image_url: e.target.value })
            }
          />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
        <div>
          {updateProductData.id && (
            <div className="product-form">
              <h2>Update Product</h2>
              <input
                type="text"
                placeholder="Title"
                value={updateProductData.title}
                onChange={(e) =>
                  setUpdateProductData({
                    ...updateProductData,
                    title: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Description"
                value={updateProductData.description}
                onChange={(e) =>
                  setUpdateProductData({
                    ...updateProductData,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Price"
                value={updateProductData.price}
                onChange={(e) =>
                  setUpdateProductData({
                    ...updateProductData,
                    price: parseFloat(e.target.value),
                  })
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                value={updateProductData.image_url}
                onChange={(e) =>
                  setUpdateProductData({
                    ...updateProductData,
                    image_url: e.target.value,
                  })
                }
              />
              <button onClick={handleUpdateProduct}>Update Product</button>
            </div>
          )}
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
                <img
                  className="p-img"
                  src={product.image_url}
                  alt={product.title}
                />
                <p id="product-id">${product.price}</p>
                <p id="product-body">{product.description}</p>
                <button
                  className="cart-btn"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
                <button
                  className="update-btn"
                  onClick={() => handleFillForm(product)}
                >
                  Update Form
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Adminmgmt;
