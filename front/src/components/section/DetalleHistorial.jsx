import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Products from "./Products";
import styles from "../css/ProfilePage.module.css";
import { FiArrowLeft } from "react-icons/fi";
import env from "../../../src/config/env.js";

const DetalleHistorial = () => {
  const [first, setfirst] = useState(0);
  const [productos, setProductos] = useState([]);
  const [date, setDate] = useState("")
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const params = useParams();


useEffect(() => {
  let prod = [];
  axios
    .get(`${env.API_BASE_URL}/api/order/${user.id}/${params.id}`)
    .then((res) => {
      setDate(res.data[0].date);
      const productoPromises = res.data[1].map((producto) => {
        return axios.get(`${env.API_BASE_URL}/api/products/${producto.productId}/`)
          .then((response) => {
            prod.push(response.data);
          });
      });
      Promise.all(productoPromises)
        .then(() => {
          setProductos(prod);
          setfirst(Math.random());
        })
          .catch((error) => {
            console.log("error", error)
          });
      })
      .catch((error) => {
        console.log("error", error)
      });
  }, []);





  useEffect(() => {}, [first]);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          to="/historial"
          style={{ color: "black", textDecoration: "none" }}
        >
          <FiArrowLeft size={20} style={{ marginRight: "10px" }} />
        </Link>
        <h1 style={{ textAlign: "center" ,marginTop:"80px"}}>Detalles de la compra del día: {date} </h1>
      </div>
      {productos[0] ? (
        <div style={{ display: "flex", flexWrap: "wrap",paddingTop:"5%" }}>
          {productos.map((unidad, index) => {
            return (
              <div key={index} className={styles.profilecontainer} style={{backgroundColor:"lightgrey", padding:"15px", border:"2px solid grey", borderRadius:"3px",  maxWidth:"200px", margin:"auto"}}>
                <img
                  style={{ height: "150px", width: "90px" , border:"2px solid grey"}}
                  src={unidad.image[0]}
                  alt={unidad.name}
                />{" "}
                <br />
                <p style={{ fontSize: "17px", fontWeight:"bold" }}>{unidad.name}</p>
                <p style={{ fontSize: "15px" , paddingRight:"15px"}}>Precio: ${unidad.price}</p>
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
      ></div>
    </>
  );
};

export default DetalleHistorial;
