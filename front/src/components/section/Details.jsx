import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import "../css/Detail.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCartItems } from "../../redux/reducers/CartItemsReducer";
import { FaArrowLeft } from "react-icons/fa";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Details = () => {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  console.log(product);
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

  const handleRating = (rate) => {
    setRating(rate);
  };

  const addToCart = (product) => {
    if (Array.isArray(cart)) {
      const productIndex = cart.findIndex((item) => item.id === product.id);
      if (productIndex === -1) {
        setCart([...cart, product]);
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
                setCart([...response.data]);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      console.error("cart is not an array");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const isProductInCart =
    cart.findIndex((item) => item.id === product.id) !== -1;

  return (
    <>
      <div>
        <Navbar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "20%",
            paddingTop: "2%",
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            <FaArrowLeft style={{ width: 18, height: 20, color: "black" }} />
          </Link>
        </div>
        <div className="container">
          <div className="details-container">
            <div className="details-image-container">
              <div className="details-image">
                <img
                  id="imageprinci"
                  src={product.image[0]}
                  alt={product.name}
                  className="details-image"
                />
              </div>
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
                    <div className="details-image-container">
                      <div className="details-image">
                        <img
                          key={index}
                          src={img}
                          alt={product.name}
                          className="zoom-on-hover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="detailss-cart">
                {isProductInCart ? (
                  <button disabled style={{ backgroundColor: "green" }}>
                    Ya en el carrito
                  </button>
                ) : (
                  <button
                    class="button-cart"
                    onClick={() => addToCart(product)}
                  >
                    Añadir al carrito
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="details-reviews">
            <h3>Reviews:</h3>
            <div className="details-review-percentage">
              {/* <p>
                <Rating onClick={handleRating} initialValue={rating} />
              </p> */}
            </div>
            <div>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => {
                        setRating(ratingValue);
                      }}
                    />
                    <FaStar
                      className="star"
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      size={100}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
            <p>
              {!product.ranking ? 0 : product.ranking || 0} 🌟 de reviews
              positivas
            </p>

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
