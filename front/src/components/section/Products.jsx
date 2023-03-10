import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../utils/fakeData/Products.js"; // importo los datos falsos para utilizar en el contexto
import ImageSlider from "../carusel/ImageSilder.jsx";
import "../css/Products.css"; // importo el archivo de estilos CSS
import Footer from "../footer/Footer.jsx";
import Navbar from "../navbar/Navbar.jsx"; // importo la navbar

export class Products extends Component {
  static contextType = DataContext; // defino el contexto

  render() {
    const { products } = this.context; // obtengo los productos desde el contexto
    return (
      <div>
        <Navbar />

        <br />
        <br />
        <br />
        <br />
        <ImageSlider />
        <div>
          <h2>Productos Populares:</h2>
        </div>
        <div id="product" className="card-container">
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
                <p>{product.description}</p>
                {/* <button onClick={() => addCart(product.id)}>
                  Add to cart
                </button> */}

                {/* agrego un botón para agregar el producto al carrito de compras */}
                <button onClick={() => this.context.addCart(product.id)}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Products;
