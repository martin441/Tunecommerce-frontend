import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Checkout = () => {
  const [paymentM, setPaymentM] = useState("");
  const [date, setDate] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [tarjetaSeg, setTarjetaSeg] = useState("");
  const [transferencia, setTransferencia] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api/order/${user.id}`, {
        status: "realizada",
        date: date,
        paymentM: paymentM,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Pago realizado correctamente");
          return navigate("/");
        } else {
          alert("No se pudo realizar el pago");
        }
      });
  };

  const handlePaymentM = (metodoDePago) => {
    setPaymentM(metodoDePago);
  };

  useEffect(() => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    setDate(`${dia}/${mes}/${anio}`);
  }, []);
  console.log(date);
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Checkout</h2>

      <h3>Agregar Categorias</h3>
      <form onSubmit={handleCheckout}>
        <h5>
          Comprador: {user.name} {user.lastname}
        </h5>
        <h5>Direccion: {user.address}</h5>
        <h5>Celular: {user.celnumber}</h5>
        <h5>Total a pagar:</h5>
        {/* pasar el total a pagar desde el carrito */}
        <label for="pay">Metodo de pago</label>
        <select
          name="paymentM"
          id="pay"
          onChange={(e) => handlePaymentM(e.target.value)}
        >
          <option value="Metodo">Elegir metodo</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Transferencia">Transferencia</option>
        </select>
        <br></br>
        {paymentM ? (
          <>
            {paymentM === "Tarjeta" ? (
              <>
                <label>Numero de tarjeta: </label>
                <input
                  value={tarjeta}
                  onChange={(e) => setTarjeta(e.target.value)}
                  required
                ></input>
                <label>Numero de Seguridad: </label>
                <input
                  value={tarjetaSeg}
                  onChange={(e) => setTarjetaSeg(e.target.value)}
                  required
                ></input>
              </>
            ) : (
              <>
                <label>Numero de tranferencia: </label>
                <input
                  value={transferencia}
                  onChange={(e) => setTransferencia(e.target.value)}
                  required
                ></input>
              </>
            )}
          </>
        ) : (
          ""
        )}
        <br></br>
        <button type="submit">Pagar</button>
        <Link to="/cart">
          <button>Volver al carrito</button>
        </Link>
      </form>
    </div>
  );
};

export default Checkout;
