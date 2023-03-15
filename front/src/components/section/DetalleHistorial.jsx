import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DetalleHistorial = () => {
  const dispatch = useDispatch();
  const [productos, setProductos] = useState([]);
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  console.log("desde detalles", orders);
  const params = useParams();
  let prod = [];

  console.log("PARAMS", params);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/order/${user.id}/${params.id}`)
      .then((res) => {
        res.data[1].map((producto) => {
          axios
            .get(`http://localhost:3001/api/products/${producto.productId}/`)
            .then((res) => {
              setProductos([res.data]);
              console.log("PRODUCTOSL", productos);
            });
        });
      });

    // axios
    //   .get(`http://localhost:3001/api/order/${user.id}/${compra.id}`)
    //   .then((res) => {
    //     res.data[1].map((producto) => {
    //       axios
    //         .get(`http://localhost:3001/api/products/${producto.productId}/`)
    //         .then((res) => {
    //           <p>1</p>;
    //         });
    //     });
    //   });
  }, []);
  //   console.log("PRODUCTOMAP", productos);
  return (
    <div>
      {productos.map((unidad) => (
        <p>{unidad.name}</p>
      ))}
      <Link to="/">Volver a inicio</Link>
    </div>
  );
};

export default DetalleHistorial;
