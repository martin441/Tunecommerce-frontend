import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { setCartItems } from "../../redux/reducers/CartItemsReducer";
import { useDispatch, useSelector } from "react-redux";


const FilterCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);

  const dispatch = useDispatch();


  useEffect(() => {
    axios
      .get("http://localhost:3001/api/categories/todo")
      .then((categories) => setCategories(categories.data));
  }, []);

  const handleCategoryClick = (id) => {
    console.log("ID", id)
    axios
      .get(`http://localhost:3001/api/products/filter/${id}`)
      .then((products) =>  {setSelectedCategory(products.data)
        console.log(selectedCategory)});
  };

  const handleAddToCart = (product) => {
    axios
      .post(`http://localhost:3001/api/cart/${user.id}/${product.id}`, {
        cantidad: 1,
      })
      .then(() => {
        alert("Producto agregado al carrito");
        axios
          .get(`http://localhost:3001/api/products/${product.id}`)
          .then((response) => {
            dispatch(setCartItems(response.data));
            localStorage.setItem("dataCart", JSON.stringify(response.data));
            JSON.stringify(localStorage.setItem("dataCart"));
            
          });

        })
        .catch((error) => {
          console.log(error);
        })
    };

  return (
    <div>

      <div>
        {categories.map((category) => {
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          );
        })}
      </div>
      <div id="product"  className="card-container">
          {selectedCategory.map((product) => (
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
                    <button onClick={() => handleAddToCart(product)}>
                      Añadir al carrito
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>


      {/* <input type="text" placeholder="Buscar categorias"></input> */}
    </div>
  );
};

export default FilterCategories;
