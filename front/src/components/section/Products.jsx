import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import estilo from "../css/Carrusel.module.css";
import ProductSlider from "../carusel/ImageSilder.jsx";
import "../css/Products.css";
import Navbar from "../navbar/Navbar.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../redux/reducers/CartItemsReducer";
import FilterCategories from "../Filter/filterCategories";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [loadMore, setLoadMore] = useState(10);

  // const user = useSelector((state) => state.user);

  const user = JSON.parse(localStorage.getItem("user"));
  const cartItems = useSelector((state) => state.cartItems);
  console.log("CARTITEMS", cartItems);

  // useEffect(() => {

  // });

  //console.log("USER", user);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 5);
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
            //JSON.stringify(localStorage.setItem("dataCart"));
            
          });

      })
      .catch((error) => {
        console.log(error);
      });

      const cart = JSON.parse(localStorage.getItem("dataCart"));
      console.log("CARTREAL", cart);
    // const newCart = [...cart];
    // const index = newCart.findIndex((item) => item.id === product.id);
    // if (index === -1) {
    //   newCart.push({ ...product, count: 1 });
    // } else {
    //   newCart[index].count += 1;
    // }

    // setCart(newCart);
    //getTotal(newCart);
  };

  // const getTotal = (cartItems) => {
  //   const res = cartItems.reduce((prev, item) => {
  //     return prev + item.price * item.count;
  //   }, 0);
  //   setTotal(res);
  // };

  return (
    <>

      <Navbar />
      <div>
        <br />
        <br />
        <br />
        <br />
        <ProductSlider />
      <FilterCategories/>
        <div>
          <h2>Productos Populares:</h2>
        </div>
        <div id="product" className="card-container">
          {products.slice(0, visibleProducts).map((product) => (
            <div className="card" key={product.id}>
              <Link to={`/products/${product.id}`}>
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
          <div>
            {visibleProducts < products.length && (
              <button onClick={handleLoadMore}>Ver más</button>
            )}
          </div>
        </div>
        <div>
          <h2>Nuestros productos</h2>
        </div>
        <div id="product" className={estilo.slider}>
          {products.slice(0, visibleProducts).map((product) => (
            <div className="card" key={product.id}>
              <Link to={`/products/${product.id}`}>
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
                {console.log("CART", cart)}
              </div>
            </div>
          ))}
          <div>
            {visibleProducts < products.length && (
              <button onClick={handleLoadMore}>Ver más</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
