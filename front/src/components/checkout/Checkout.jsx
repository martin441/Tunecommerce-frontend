import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCartItems } from "../../redux/reducers/CartItemsReducer";
import "../admin/css/Checkout.css";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const [paymentM, setPaymentM] = useState("");
  const [date, setDate] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [tarjetaSeg, setTarjetaSeg] = useState("");
  const [transferencia, setTransferencia] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const total = JSON.parse(localStorage.getItem("totales"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartItems);
  console.log("CARTITEMS", cartItems);

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
          toast.success("Pago realizado correctamente");
          dispatch(deleteCartItems([]));
          return navigate("/");
        } else {
          toast.error("No se pudo realizar el pago");
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
      <h2
        style={{ textAlign: "center", paddingBottom: "2%", paddingTop: "2%" }}
      >
        Checkout
      </h2>
      <form className="formCheckout" onSubmit={handleCheckout}>
        <Link to="/cart">
          <FaArrowLeft style={{ width: 18, height: 20 }} />
        </Link>
        <h5>
          <strong>Comprador:</strong>{" "}
          <span className="normal-text">
            {user.name} {user.lastname}
          </span>
        </h5>
        <h5>
          <strong>Dirección:</strong>{" "}
          <span className="normal-text">{user.address}</span>
        </h5>
        <h5>
          <strong>Celular:</strong>{" "}
          <span className="normal-text">{user.celnumber}</span>
        </h5>
        <h5>
          <strong>Total a pagar:</strong>{" "}
          <span className="normal-text">{total}</span>
        </h5>
        {/* pasar el total a pagar desde el carrito */}
        <label for="pay">Metodo de pago:</label>
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
        {paymentM && paymentM !== "Metodo" ? (
          <>
            {paymentM === "Tarjeta" ? (
              <>
                <label>Numero de tarjeta: </label>
                <input
                  className="inputCheckout"
                  value={tarjeta}
                  onChange={(e) => setTarjeta(e.target.value)}
                  required
                ></input>
                <label>Numero de Seguridad: </label>
                <input
                  className="inputCheckout"
                  style={{ marginBottom: "6%" }}
                  value={tarjetaSeg}
                  onChange={(e) => setTarjetaSeg(e.target.value)}
                  required
                ></input>
              </>
            ) : (
              <>
                <label>Numero de tranferencia: </label>
                <input
                  className="inputCheckout"
                  style={{ marginBottom: "6%" }}
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
        <button type="submit" className="buttons">
          Pagar
        </button>
      </form>
    </div>
  );
};

export default Checkout;
