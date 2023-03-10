import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Checkout extends Component {
  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Checkout</h2>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }
}

export default Checkout;
