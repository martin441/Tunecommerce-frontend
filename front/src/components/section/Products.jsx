import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import estilo from "../css/Carrusel.module.css";
import ProductSlider from "../carusel/ImageSilder.jsx";
import "../css/Products.css";
import Navbar from "../navbar/Navbar.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCartItems } from "../../redux/reducers/CartItemsReducer";
import FilterCategories from "../Filter/filterCategories";
import Footer from "../footer/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

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
    // const notificacion = () => {toast("agregado al carrito")}

    if (!user) {
      toast.error("Debes loguearte para agregar productos al carrito");
    } else {
      axios
        .post(`http://localhost:3001/api/cart/${user.id}/${product.id}`, {
          cantidad: 1,
        })
        .then(() => {
          toast.success("Producto agregado al carrito");
          axios
            .get(`http://localhost:3001/api/products/${product.id}`)
            .then((response) => {
              dispatch(setCartItems(response.data));
              localStorage.setItem("dataCart", JSON.stringify(response.data));
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <div>
          <ProductSlider />
        </div>

        <div>
          <FilterCategories />
        </div>

        <div>
          <h2 style={{ margin: "15px" }}>Nuestros productos</h2>
        </div>
        <div id="product" className={estilo.slider}>
          {products.slice(0, visibleProducts).map((product) => (
            <div className="card" key={product.id}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/product/${product.id}`}
              >
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
          ))}
        </div>
        <div>
          {visibleProducts < products.length && (
            <button className="moreButton" onClick={handleLoadMore}>
              Ver más
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
