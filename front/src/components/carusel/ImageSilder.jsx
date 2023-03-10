import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../utils/fakeData/Products.js";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import estilo from "../css/Carrusel.module.css";

export class ImageSilder extends Component {
  static contextType = DataContext;

  state = {
    currentIndex: 0,
  };

  handlePrevClick = () => {
    this.setState((prevState) => ({
      currentIndex:
        prevState.currentIndex === 0
          ? this.context.products.length - 1
          : prevState.currentIndex - 1,
    }));
  };

  handleNextClick = () => {
    this.setState((prevState) => ({
      currentIndex:
        prevState.currentIndex === this.context.products.length - 1
          ? 0
          : prevState.currentIndex + 1,
    }));
  };

  render() {
    const { products } = this.context;
    const { currentIndex } = this.state;

    return (
      <div>
        <section className={estilo.slider}>
          <FaArrowAltCircleLeft
            className={estilo.left_arrow}
            onClick={this.handlePrevClick}
          />
          <FaArrowAltCircleRight
            className={estilo.right_arrow}
            onClick={this.handleNextClick}
          />
          {products.map((slide, index) => {
            return (
              <div
                className={index === currentIndex ? "slide active" : "slide"}
                key={index}
              >
                {index === currentIndex && (
                  <Link to={`/product/${slide.id}`}>
                    <img
                      src={slide.image}
                      alt="travel image"
                      className={estilo.image}
                    />
                    <div className="content">
                      <h3  style={{ color: "white", fontSize: "18px" }}>
                        {/* agrego un enlace para que al hacer click en el título, se redirija a la página de detalles del producto */}
                        <Link to={`/product/${slide.id}`}>{slide.title}</Link>
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
          {/* mapeo los productos para crear un card por cada uno */}
          {products.map((product) => (
            <div className="card" key={product.id}>
              {/* agrego un enlace para que al hacer click en la imagen o el título, se redirija a la página de detalles del producto */}
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt="" />
              </Link>
              <div className="content">
                <h3>
                  {/* agrego un enlace para que al hacer click en el título, se redirija a la página de detalles del producto */}
                  <Link to={`/product/${product.id}`}>{product.title}</Link>
                </h3>
                <span>${product.price}</span>
                {/* agrego un botón para agregar el producto al carrito de compras */}
                <button onClick={() => this.context.addCart(product.id)}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ImageSilder;
