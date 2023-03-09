// Importo las dependencias necesarias
import React, { Component } from "react"; // React y Componentes
import { DataContext } from "../../utils/fakeData/Products.js"; // El contexto de datos
import Navbar from "../navbar/Navbar"; // Componente de la barra de navegación
import { Link } from "react-router-dom"; // Componente de enlace para la navegación
import "../css/Cart.css"; // Hoja de estilos CSS para el carrito de compras

// Defino el componente Carrito
export class Cart extends Component {
  // Especifico el contexto de datos utilizado
  static contextType = DataContext;

  // Ejecuto el método getTotal() del contexto de datos una vez que se ha montado el componente
  componentDidMount() {
    this.context.getTotal();
  }

  // Renderizo el componente
  render() {
    // Obtengo los elementos necesarios del contexto de datos
    const { cart, increase, reduction, removeProduct, total } = this.context;

    // Si el carrito está vacío, mostrar un mensaje de "No hay productos en el carrito"
    if (cart.length === 0) {
      return (
        <div>
          <Navbar />
          <h2 style={{ textAlign: "center" }}>
            No hay productos en el carrito
          </h2>
        </div>
      );
    }
    // Si el carrito contiene elementos, mostrar la información correspondiente
    else {
      return (
        <>
          <Navbar />
          <div class="details-container">
            {cart.map((item) => (
              <div className="details" key={item.id}>
                <img src={item.image} alt="" />
                <div className="box">
                  <div className="row">
                    <h2>{item.title}</h2>
                    <span>${item.price * item.count}</span>
                  </div>
                  <p>{item.ranking}</p>
                  <p>{item.description}</p>
                  <div className="amount">
                    <button
                      className="count"
                      onClick={() => reduction(item.id)}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <span>{item.count}</span>
                    <button className="count" onClick={() => increase(item.id)}>
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </div>
                <div className="delete" onClick={() => removeProduct(item.id)}>
                  X
                </div>
              </div>
            ))}
            <div className="total">
              <Link to="/checkout">Checkout</Link>
              <h3>Total: ${total}</h3>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Cart;
