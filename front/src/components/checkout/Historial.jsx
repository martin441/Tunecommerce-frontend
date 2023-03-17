import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { setOrders } from "../../redux/reducers/OrderReducer";

const Historial = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const user = useSelector((state) => state.user);
  console.log("desde historial", user);
  useEffect(() => {
    axios.get(`http://localhost:3001/api/order/${user.id}`).then((res) => {
      dispatch(setOrders(res.data));
    });
  }, []);
  console.log("ORDERS", orders);
  return (
    <div style={{ marginTop: "30vh", textAlign: "center" }}>
      {orders.length ? (
        orders.map((compra) => {
          return (
            <Link to={`/detalleOrden/${compra.id}`}>
              <div>
                <p>Número de orden: {compra.id}</p>
                <p>Fecha: {compra.createdAt}</p>
                <p>Estado de la compra: {compra.status}</p>
              </div>
            </Link>
          );
          // axios
          //   .get(`http://localhost:3001/api/order/${user.id}/${compra.id}`)
          //   .then((res) => {
          //     res.data[1].map((producto) => {
          //       axios
          //         .get(
          //           `http://localhost:3001/api/products/${producto.productId}/`
          //         )
          //         .then((res) => {
          //           <p>1</p>;
          //         });
          //     });
          //   });
        })
      ) : (
        <div style={{ marginTop: "30vh", textAlign: "center" }}>
          <p >No hay órdenes</p>
        </div>
      )}
      <Link style={{ textAlign: "center" , color: "red", textDecoration: "none", color: "grey"}} to="/">
        Volver a inicio
      </Link>
    </div>
  );
};

export default Historial;
