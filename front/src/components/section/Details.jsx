import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import "../css/Detail.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../redux/reducers/CartItemsReducer";

const Details = () => {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [reviews, setReviews] = useState([
    { id: 1, text: "Excelente producto", author: "Juan Pérez" },
    { id: 2, text: "Muy buena calidad", author: "María Gómez" },
    { id: 3, text: "Lo recomiendo totalmente", author: "Pedro Rodríguez" },
  ]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const addToCart = (product) => {
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
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <Navbar />
        <div className="container">
          <div className="details-container">
            <div className="details-image">
              <img src={product.image[0]} alt={product.name} className="zoom-on-hover"/>
            </div>
            <div className="details-info">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="details-price">
                <h3>Precio: ${product.price}</h3>
                <h3>Stock: {product.stock}</h3>
              </div>
              <div>
                <h3>Otras imágenes:</h3>
                <div className="details-images">
                  {product.image.map((img, index) => (
                    <img key={index} src={img} alt={product.name} className="zoom-on-hover"/>
                  ))}
                </div>
              </div>
              <div className="details-cart">
                {cart.some((item) => item.id === product.id) ? (
                  <button disabled>Añadido al carrito</button>
                ) : (
                  <button
                    class="add-to-cart small"
                    onClick={() => addToCart(product)}
                  >
                    Añadir al carrito
                  </button>
                )}
                {/* {console.log("CART", cart)} */}
              </div>
              <Link style={{ textDecoration: "none" }} to="/">
                ,<button className="button-volver">Volver</button>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="details-reviews">
            <h3>Reviews:</h3>
            <div className="details-review-percentage">
              <p>
                {!product.ranking ? 0 : product.ranking[0] || 0} 🌟 de reviews
                positivas
              </p>
            </div>
            {product.ranking && (
              <div className="details-review-list">
                {reviews.map((review) => (
                  <div className="details-review" key={review.id}>
                    <p>{review.text}</p>
                    <p>Por: {review.author}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
