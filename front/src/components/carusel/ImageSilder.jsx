import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import estilo from "../css/Carrusel.module.css";
import axios from "axios";

function ProductSlider() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  console.log(products[0]);
  return (
    <div>
      <section className={estilo.slider}>
        <FaArrowAltCircleLeft
          className={estilo.left_arrow}
          onClick={handlePrevClick}
        />
        <FaArrowAltCircleRight
          className={estilo.right_arrow}
          onClick={handleNextClick}
        />
        {/* //.slice(0, 10) */}
        {products.slice(0, 10).map((slide, index) => {
          console.log("SLIDE", slide);
          if(!slide.name){
            return <span>Error</span>
          }
          return (
            <div
              className={
                index === currentIndex ? estilo.slide + " active" : estilo.slide
              }
              key={index}
            >
              {index === currentIndex && (
                <Link to={`/product/${slide.id}`}>
                  <img
                    src={slide.image[0]}
                    alt="travel image"
                    className={estilo.image}
                  />
                  <div className="content">
                    <h3 style={{ color: "white", fontSize: "18px" }}>
                      <Link to={`/product/${slide.id}`}>{slide.name}</Link>
                    </h3>
                    <span>${slide.price}</span>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </section>
      <div>
        <h2>Nuestros productos</h2>
      </div>
      <div id="product" className={estilo.slider}>
        {products.map((product) => (
          <div className="card" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt="" />
            </Link>
            <div className="content">
              <h3>
                <Link to={`/product/${product.id}`}>{product.title}</Link>
              </h3>
              <span>${product.price}</span>
              {/* <button onClick={() => addCart(product.id)}>Add to cart</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSlider;
