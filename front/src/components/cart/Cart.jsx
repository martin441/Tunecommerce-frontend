import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  delFromCart,
} from "../../redux/action/cartActions";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import "../css/Cart.css";
import axios from "axios";
import { setCart } from "../../redux/reducers/CartReducers";
import { useNavigate } from "react-router";

const Cart = () => {
  let userLogueado = JSON.parse(localStorage.getItem("user")) || {};
  const dispatch = useDispatch();

  const cart = useSelector((state) => {
    return state.cart;
  });

  console.log("CART", cart);

  const navigate = useNavigate();

  const cartItems = useSelector((state) => {
    return state.cartItems;
  });
  const [total, setTotal] = useState(0);

  console.log("CARTITEMS", cartItems);

  const [first, setfirst] = useState(0);

  const [precio, setPrecio] = useState(0);

  console.log("PRECIO", precio);

  //localStorage.setItem("user", JSON.stringify(res.data));

  useEffect(() => {
    console.log("USER", userLogueado);
    axios
      .get(`http://localhost:3001/api/cart/${userLogueado.id}`)
      .then((response) => {
        console.log("DATOS", response.data);
        dispatch(setCart(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [first]);

  useEffect(() => {
    //getTotal();
    localStorage.setItem("total", JSON.stringify(total));
  }, [cart, cartItems, precio]);

  const getTotal = () => {
    const res = cart.reduce((prev, item) => {
      const producto = cartItems.find((p) => p.id === item.productId);
      setPrecio(producto.price);
      let calculo = prev + precio * item.cantidad;
      console.log("PRODUCTO", producto);
      return calculo;
    }, 0);
    setTotal(res);
  };

  const increase = (id, contador) => {
    axios
      .put(`http://localhost:3001/api/cart/${userLogueado.id}/${id}`, {
        cantidad: contador + 1,
      })
      .then((response) => {
        //alert("cantidad incrementada");
        console.log("CART-INCREASE", response.data);
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
          console.log("CART-REDUCCION", response.data);

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
    //e.preventDefault();
    if (window.confirm("¿Quieres quitar este producto?")) {
      axios
        .delete(`http://localhost:3001/api/cart/${userLogueado.id}/${id}`)
        .then((response) => {
          console.log("CART-REMOVE", response.data);
          dispatch(setCart(response.data));
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
            let contador =
              cart.filter((e) => e.productId === item.id)[0]?.cantidad || 0;

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
          <button
            className="clear-button"
            onClick={() => dispatch(clearCart())}
          >
            Vaciar carrito
          </button>
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
