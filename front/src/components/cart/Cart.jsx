import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import "../css/Cart.css";
import axios from "axios";
import { setCart } from "../../redux/reducers/CartReducers";
import { useNavigate } from "react-router";
//import { clearCart } from "../../redux/action/clearCart";
import { deleteCartItems } from "../../redux/reducers/CartItemsReducer";

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
  // Guardar los datos del carrito en el LocalStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("dataCart", JSON.stringify(carts));
  }, [carts]);

  useEffect(() => {
    axios
    .get(`http://localhost:3001/api/cart/${userLogueado.id}`)
    .then((response) => {
    dispatch(setCart(response.data));
    })
    .catch((error) => {
    console.log(error);
    });
    }, [dispatch, userLogueado.id]);

  const cart = useSelector((state) => {
    return state.cart;
  });


  const navigate = useNavigate();

  const cartItems = useSelector((state) => {
    return state.cartItems;
  });
  const [total, setTotal] = useState(0);

  const [first, setfirst] = useState(0);

  const handleClearCart = () => {
    const confirmClearCart = window.confirm(
      "¿Estás seguro de vaciar el carrito?"
    );
    if (confirmClearCart) {
      axios
        .delete(`http://localhost:3001/api/cart/${userLogueado.id}`)
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

  //localStorage.setItem("user", JSON.stringify(res.data));

  //permanecia del carro

  // useEffect(() => {
  //   JSON.parse(localStorage.getItem("dataCart")) || [];
  // }, []);
  // useEffect(() => {
  //   JSON.parse(localStorage.getItem("dataCart")) || [];
  //   //dispatch(setCart(savedCart));
  //   //setfirst(Math.random(savedCart));
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("dataCart", JSON.stringify(cart));
  // }, [cart]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/cart/${userLogueado.id}`)
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
      .get(`http://localhost:3001/api/cart/${userLogueado.id}`)
      .then((response) => {
        const cart = response.data;
        axios
          .get(`http://localhost:3001/api/products`)
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
      .put(`http://localhost:3001/api/cart/${userLogueado.id}/${id}`, {
        cantidad: contador + 1,
      })
      .then((response) => {
        //alert("cantidad incrementada");
        //navigate("/cart");
        setfirst(Math.random());
        //dispatch(setCart(response.data));
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
        .put(`http://localhost:3001/api/cart/${userLogueado.id}/${id}`, {
          cantidad: contador - 1,
        })
        .then((response) => {
          //navigate("/cart");
          //alert("cantidad reducida")
          //dispatch(setCart(response.data));
          setfirst(Math.random());
          //dispatch(setCart(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const removeProduct = (id) => {
    if (window.confirm("¿Quieres quitar este producto?")) {
      axios
        .delete(`http://localhost:3001/api/cart/${userLogueado.id}/${id}`)
        .then((response) => {
          // actualizo el estado del carrito con los nuevos datos que devuelve la API
          setfirst(Math.random());
          //window.location.reload();

          // obtengo la cantidad del otro producto en el carrito
          const otroProducto = cart.find((e) => e.productId !== id);
          if (otroProducto) {
            const nuevaCantidad = otroProducto.cantidad;
            // actualizo la cantidad del otro producto en la base de datos
            axios
              .put(
                `http://localhost:3001/api/cart/${userLogueado.id}/${otroProducto.productId}`,
                {
                  cantidad: nuevaCantidad,
                }
              )
              .then((response) => {
                // actualizo el estado del carrito con los nuevos datos que devuelve la API
                //con el setfirst que creamos arriba
                //dispatch(setCart(response.data));
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
        <br />
        <br />
        <br />
        <br />
        <h2 style={{ textAlign: "center" }}>No hay productos en el carrito</h2>
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <div className="details-container">
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
              <div className="product-container" key={item.id}>
                <img src={item.image} alt="" />
                <div className="product-details">
                  <h2>{item.name}</h2>
                  <p>Precio: ${item.price}</p>
                  <div className="cantidad">
                    <button
                      className="cantidad-button"
                      onClick={() => {
                        reduction(
                          item.id,
                          contador
                          // cart.filter((e) => e.productId === item.id)[0]
                          //   .cantidad
                        );
                        return contador--;
                      }}
                    >
                      -
                    </button>
                    <span>
                      {`${contador}`}
                      {/* {cart.filter((e) => e.productId === item.id)[0].cantidad} */}
                    </span>
                    <button
                      className="cantidad-button"
                      onClick={() => {
                        increase(
                          item.id,
                          contador
                          // cart.filter((e) => e.productId === item.id)[0]
                          //   .cantidad
                        );
                        return contador++;
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeProduct(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="total-container">
          <h2>Total: ${total}</h2>
          <button onClick={handleClearCart}>Vaciar carrito</button>
          {userLogueado.id ? (
            <Link to="/checkout" className="checkout-button">
              Comprar
            </Link>
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
