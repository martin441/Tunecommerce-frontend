import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Products from "./Products";
import styles from "../css/ProfilePage.module.css";

const DetalleHistorial = () => {
  const [first, setfirst] = useState(0);
  const [productos, setProductos] = useState([]);
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  console.log("desde detalles", orders);
  const params = useParams();

  useEffect(() => {
    let prod = [];
    axios
      .get(`http://localhost:3001/api/order/${user.id}/${params.id}`)
      .then((res) => {
        res.data[1].map((producto) => {
          axios
            .get(`http://localhost:3001/api/products/${producto.productId}/`)
            .then((res) => {
              prod.push(res.data);
              setfirst(Math.random());
            });
        });
      });
    setProductos(prod);
  }, []);
  useEffect(() => {}, [first]);
  console.log("PRODUCTS", productos);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Detalles de la compra </h1>
      {productos[0] ? (
        <div>
          {productos.map((unidad) => {
            return (
              <div className={styles.profilecontainer}>
                <img src={unidad.image[0]} alt={unidad.name} /> <br />
                <h3>{unidad.name}</h3>
                <h4>Precio: ${unidad.price}</h4>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      <div
        style={{
          marginTop: "30vh",
          textAlign: "center",
          textDecoration: "none",
        }}
      >
        <Link
          to="/historial"
          style={{
            textAlign: "center",
            color: "red",
            textDecoration: "none",
            paddingBottom: "3em",
          }}
        >
          Volver
        </Link>
      </div>
    </>
  );
};

export default DetalleHistorial;
