import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { setCartItems } from "../../redux/reducers/CartItemsReducer";
import { useDispatch, useSelector } from "react-redux";
import "../css/Products.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import env from "../../config/env";

const FilterCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${env.API_BASE_URL}/api/categories/todo`)
      .then((categories) => setCategories(categories.data));
  }, []);

  const handleCategoryClick = (id) => {
    axios
      .get(`${env.API_BASE_URL}/api/products/filter/${id}`)
      .then((products) => {
        setSelectedCategory(products.data);
        console.log(selectedCategory);
      });
  };

  const handleAddToCart = (product) => {
    axios
      .post(`${env.API_BASE_URL}/api/cart/${user.id}/${product.id}`, {
        cantidad: 1,
      })
      .then(() => {
        toast.success("Producto agregado al carrito");
        axios
          .get(`${env.API_BASE_URL}/api/products/${product.id}`)
          .then((response) => {
            dispatch(setCartItems(response.data));
            localStorage.setItem("dataCart", JSON.stringify(response.data));
            JSON.stringify(localStorage.setItem("dataCart"));
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="categories">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: "90%",
          margin: "0 auto",
        }}
      >
        {categories.map((category) => {
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              style={{
                fontSize: "1.2rem",
                padding: "0.8rem 1.2rem",
                border: "none",
                borderRadius: "0.3rem",
                cursor: "pointer",
                transition: "background-color 0.3s ease, color 0.3s ease",
                maxWidth: "200px",
                width: "100%",
                height: "auto",
              }}
            >
              {category.name}
            </button>
          );
        })}
      </div>
      <div id="product" className="card-container">
        {selectedCategory === "Not found" ? (
          <h2>
            No contamos con stock de productos de esta categoría en este momento
          </h2>
        ) : (
          selectedCategory.map((product) => (
            <div className="card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.image[0]} alt={product.name} />
                <h3>{product.name}</h3>
              </Link>
              <p>{product.description}</p>
              <div className="card-info">
                <div className="price">
                  <h4>${product.price}</h4>
                </div>
                <div className="stock">
                  <h4>Stock: {product.stock}</h4>
                </div>
                <div className="add-to-cart">
                  {cart.some((item) => item.id === product.id) ? (
                    <button disabled>Añadido al carrito</button>
                  ) : (
                    <button
                      class="add-to-cart small"
                      onClick={() => handleAddToCart(product)}
                    >
                      Añadir al carrito
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FilterCategories;
