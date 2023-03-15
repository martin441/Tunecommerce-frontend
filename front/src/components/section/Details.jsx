import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import "../css/Detail.css";
import axios from "axios";

const Details = () => {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const { id } = useParams();

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
    setCart([...cart, product]);
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
              <img src={product.image[0]} alt={product.name} />
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
                    <img key={index} src={img} alt={product.name} />
                  ))}
                </div>
              </div>
              <div className="details-cart">
                <button onClick={() => addToCart(product)}>
                  Añadir al carrito
                </button>
                {/* {console.log("CART", cart)} */}
              </div>
              <Link to="/">
                <button className="button-volver">Volver</button>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="details-reviews">
            <h3>Reviews:</h3>
            <div className="details-review-percentage">
              <p>{product.reviews}% de reviews positivas</p>
            </div>
            <div className="details-review-list">
              {/* {product.reviews.map((review) => (
                <div className="details-review" key={review.id}>
                  <p>{review.text}</p>
                  <p>Por: {review.author}</p>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
