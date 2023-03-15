import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import estilo from "../css/Carrusel.module.css";
import axios from "axios";

function ProductSlider() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(10);
  const [loadMore, setLoadMore] = useState(10);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
    if (currentIndex === 9) {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => setProducts(res.data));
  }, []);

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
        {products.slice(0, visibleProducts).map(
          (slide, index) => (
            //console.log("SLIDE", slide.image[0]),
            (
              <div>
                {index === currentIndex && (
                  <Link to={`/product/${slide.id}`}>
                    <div key={slide.id}>
                      {slide.image && (
                        <img
                          key={slide.image[0]}
                          src={slide.image[0]}
                          alt={`Imagen 1`}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/img/image-error.png";
                          }}
                        />
                      )}
                    </div>
                    <div className="content">
                      <h3 style={{ color: "white", fontSize: "18px" }}>
                        <Link to={`/product/${slide.id}`}>{slide.name}</Link>
                      </h3>
                      <span>${slide.price}</span>
                    </div>
                  </Link>
                )}
              </div>
            )
          )
        )}
      </section>
    </div>
  );
}

export default ProductSlider;
