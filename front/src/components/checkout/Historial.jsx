import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { setOrders } from "../../redux/reducers/OrderReducer";
import styles from "../css/HistorialPage.module.css";
import { FiArrowLeft } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import env from "../../config/env";

const Historial = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios.get(`${env.API_BASE_URL}/api/order/${user.id}`).then((res) => {
      dispatch(setOrders(res.data));
    });
  }, []);

  return (
    <div
      style={{ marginTop: "20vh", textAlign: "center", textDecoration: "none" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to="/profile" style={{ color: "black", textDecoration: "none" }}>
          <FiArrowLeft size={20} style={{ marginRight: "10px" }} />
        </Link>
        <h1 style={{ textAlign: "center", margin: "0" }}>
          Historial de compras
        </h1>
      </div>
      {orders.length ? (
        orders.map((compra) => {
          return (
            <Link
              to={`/detalleOrden/${compra.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className={`${styles.profilecontainer} ${styles.box3d}`}>
                <div className={styles.profileinfo}>
                  <br /> <br />
                  <p style={{ color: "black" }}>
                    <strong>Número de orden:</strong> {compra.id}
                  </p>
                  <p style={{ color: "black" }}>
                    <strong>Fecha:</strong> {compra.createdAt.substring(0, 10)}
                  </p>
                  <p style={{ color: "black" }}>
                    <strong>Estado de la compra:</strong> {compra.status}{" "}
                    <FaCheckCircle
                      style={{ color: "green", marginLeft: "5px" }}
                    />
                  </p>
                  <br /> <br />
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div style={{ marginTop: "30vh", textAlign: "center" }}>
          <p>No hay órdenes</p>
        </div>
      )}
    </div>
  );
};

export default Historial;
