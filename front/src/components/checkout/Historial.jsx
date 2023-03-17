import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { setOrders } from "../../redux/reducers/OrderReducer";
import styles from "../css/ProfilePage.module.css";

const Historial = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/order/${user.id}`).then((res) => {
      dispatch(setOrders(res.data));
    });
  }, []);

  return (
    <div
      style={{ marginTop: "30vh", textAlign: "center", textDecoration: "none" }}
    >
      {orders.length ? (
        orders.map((compra) => {
          return (
            <Link
              to={`/detalleOrden/${compra.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.profilecontainer}>
                <div className={styles.profileinfo}>
                  <p style={{ color: "black" }}>Número de orden: {compra.id}</p>
                  <p style={{ color: "black" }}>Fecha: {compra.createdAt}</p>
                  <p style={{ color: "black" }}>
                    Estado de la compra: {compra.status}
                  </p>
                  <br /> <br /> <br />
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div style={{ marginTop: "30vh", textAlign: "center" }}>
          <p >No hay órdenes</p>
        </div>
      )}

      <Link
        style={{ textAlign: "center", color: "red", textDecoration: "none" }}
        to="/profile"
      >
        Volver

      </Link>
    </div>
  );
};

export default Historial;
