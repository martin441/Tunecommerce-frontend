import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import "../css/Cart.css";
import axios from "axios";
import { setCart } from "../../redux/reducers/CartReducers";
import { FiTrash2 } from "react-icons/fi";

import {
  deleteCartId,
  deleteCartItems,
} from "../../redux/reducers/CartItemsReducer";
import { FaArrowLeft } from "react-icons/fa";
import env from "../../config/env";

const Cart = () => {
  let userLogueado = JSON.parse(localStorage.getItem("user")) || {};
  const [carts, setCarts] = useState(() => {
    const storedCart = localStorage.getItem("dataCart");
    if (storedCart) {
      return JSON.parse(storedCart);
    } else {
      return [];
    }
  });

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => {
    return state.cartItems;
  });

  const [total, setTotal] = useState(0);

  const [first, setfirst] = useState(0);
  const cart = useSelector((state) => {
    return state.cart;
  });

  useEffect(() => {
    axios
      .get(`${env.API_BASE_URL}/api/cart/${userLogueado.id}`)
      .then((response) => {
        dispatch(setCart(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, userLogueado.id, first]);

  // Guardar los datos del carrito en el LocalStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("dataCart", JSON.stringify(carts));
  }, [carts]);

  const handleClearCart = () => {
    const confirmClearCart = window.confirm(
      "¿Estás seguro de vaciar el carrito?"
    );
    if (confirmClearCart) {
      axios
        .delete(`${env.API_BASE_URL}/api/cart/${userLogueado.id}`)
        .then((response) => {
          console.log("CART-CLEAR", response.data);
          dispatch(deleteCartItems([]));
          localStorage.removeItem("dataCart");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${env.API_BASE_URL}/api/cart/${userLogueado.id}`)
      .then((response) => {
        dispatch(setCart(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [first]);

  useEffect(() => {
    localStorage.setItem("totales", JSON.stringify(total));
  }, [total]);

  useEffect(() => {
    getTotal();
  }, [cart, cartItems]);

  const getTotal = () => {
    axios
      .get(`${env.API_BASE_URL}/api/cart/${userLogueado.id}`)
      .then((response) => {
        const cart = response.data;
        axios
          .get(`${env.API_BASE_URL}/api/products`)
          .then((response) => {
            const cartItems = response.data;
            if (!Array.isArray(cart) || cart.length === 0) {
              setTotal(0);
              return;
            }
            const res = cart.reduce((prev, item) => {
              const producto = cartItems.find((p) => p.id === item.productId);
              const precio = producto ? producto.price : 0;
              const calculo = prev + precio * item.cantidad;
              return calculo;
            }, 0);
            setTotal(res);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const increase = (id, contador) => {
    axios
      .put(`${env.API_BASE_URL}/api/cart/${userLogueado.id}/${id}`, {
        cantidad: contador + 1,
      })
      .then((response) => {
        setfirst(Math.random());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reduction = (id, contador) => {
    if (contador === 1) {
      if (window.confirm("¿Quieres quitar este producto?")) {
        removeProduct(id);
      }
    } else {
      axios
        .put(`${env.API_BASE_URL}/api/cart/${userLogueado.id}/${id}`, {
          cantidad: contador - 1,
        })
        .then((response) => {
          setfirst(Math.random());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const removeProduct = (id) => {
    if (window.confirm("¿Quieres quitar este producto?")) {
      axios
        .delete(`${env.API_BASE_URL}/api/cart/${userLogueado.id}/${id}`)
        .then((response) => {
          // actualizo el estado del carrito con los nuevos datos que devuelve la API
          dispatch(deleteCartId(id));
        })
        .then(() => {
          // obtengo la cantidad del otro producto en el carrito
          const otroProducto = cart.find((e) => e.productId !== id);
          if (otroProducto) {
            const nuevaCantidad = otroProducto.cantidad;
            // actualizo la cantidad del otro producto en la base de datos
            axios
              .put(
                `${env.API_BASE_URL}/api/cart/${userLogueado.id}/${otroProducto.productId}`,
                {
                  cantidad: nuevaCantidad,
                }
              )
              .then((response) => {
                // actualizo el estado del carrito con los nuevos datos que devuelve la API
                //con el setfirst que creamos arriba
                setfirst(Math.random());
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <Navbar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "20%",
            paddingTop: "2%",
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            <FaArrowLeft style={{ width: 18, height: 20, color: "black" }} />
          </Link>
        </div>
        <br></br>
        <h2 style={{ textAlign: "center" }}>No hay productos en el carrito</h2>
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="details-container">
          <Link to="/">
            <FaArrowLeft
              className="icon icon-arrow"
              style={{ width: 18, height: 20, color: "black" }}
            />
          </Link>
          {cartItems.map((item) => {
            let contador = 0;
            if (
              Array.isArray(cart) &&
              cart.some((e) => e.productId === item.id)
            ) {
              contador = cart.filter((e) => e.productId === item.id)[0]
                .cantidad;
            }

            return (
              <div className="cart-container">
                <div className="product-container" key={item.id}>
                  <div>
                    <div className="product-details">
                      <img src={item.image} alt="" />
                      <h2>{item.name}</h2>
                      <p>Precio: ${item.price}</p>

                      <div className="cantidad">
                        <button
                          className="cantidad-button"
                          onClick={() => {
                            reduction(item.id, contador);
                            return contador--;
                          }}
                        >
                          -
                        </button>
                        <span>{`${contador}`}</span>
                        <button
                          className="cantidad-button"
                          onClick={() => {
                            increase(item.id, contador);
                            return contador++;
                          }}
                        >
                          +
                        </button>
                        <button
                          className="remove-button"
                          onClick={() => removeProduct(item.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="total-container">
          <h2>Total: ${total}</h2>
          {userLogueado.id ? (
            <div className="botones-comprarvaciar">
              <button
                className="remove-button"
                style={{ marginTop: "5px" }}
                onClick={handleClearCart}
              >
                Vaciar carrito
              </button>
              <Link to="/checkout">
                <button className="checkout-button">Comprar</button>
              </Link>
            </div>
          ) : (
            <Link to="/login" className="login-button">
              Ingresar
            </Link>
          )}
        </div>
      </>
    );
  }
};

export default Cart;
