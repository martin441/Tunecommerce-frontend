import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCartItems } from "../../redux/reducers/CartItemsReducer";
import "../admin/css/Checkout.css";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import Confetti from "react-confetti";
import { useMediaQuery } from "react-responsive";
import env from "../../config/env";

const Checkout = () => {
  const [paymentM, setPaymentM] = useState("");
  const [date, setDate] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [tarjetaSeg, setTarjetaSeg] = useState("");
  const [transferencia, setTransferencia] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // Nuevo estado para verificar si el pago se realizó con éxito
  const user = JSON.parse(localStorage.getItem("user"));
  const total = JSON.parse(localStorage.getItem("totales"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartItems);
  console.log("CARTITEMS", cartItems);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${env.API_BASE_URL}/api/order/${user.id}`, {
        status: "realizada",
        date: date,
        paymentM: paymentM,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Pago realizado correctamente");

          setIsPaymentSuccessful(true);
          //alert("Pago realizado correctamente");

          dispatch(deleteCartItems([]));
          Confetti();
          //alert("pago realizado correctamante")
          return navigate("/");
        } else {
          toast.error("No se pudo realizar el pago");
        }
      })
      .finally(() => {
        setIsLoading(false); // establecer isLoading a false cuando se completa la solicitud
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
    <div style={{ position: "relative", height: isMobile ? "100%" : "100vh" }}>
      {isPaymentSuccessful && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Confetti
            width={isMobile ? window.innerWidth : undefined}
            height={isMobile ? window.innerHeight : undefined}
          />

          <div
            className="payment-confirmation"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <p>Pago realizado correctamente</p>
            <button onClick={() => navigate("/")}>OK</button>
          </div>
        </div>
      )}
      <h2
        style={{ textAlign: "center", paddingBottom: "2%", paddingTop: "2%" }}
      >
        Checkout
      </h2>
      {/* resto del código... */}
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
          <span className="normal-text">{total + "$"}</span>
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

        <button disabled={isLoading} type="submit" className="buttons">
          {isLoading ? (
            <BeatLoader
              color={"#fff"}
              css={{ display: "block", margin: "0 auto" }}
            />
          ) : (
            "Pagar"
          )}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
