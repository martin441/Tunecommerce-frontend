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

const Cart = () => {
  let userLogueado = JSON.parse(localStorage.getItem("user")) || {};
  const dispatch = useDispatch();

  const cart = useSelector((state) => {
    return state.cart;
  });

  console.log("CART", cart);

  let cantidadTotal = 0;

  //let cartItems;
  
  const [total, setTotal] = useState(0);

  const cartItems = useSelector((state) => {
    return state.cartItems;
  });


  console.log("CARTITEMS", cartItems);

  
  useEffect(() => {
    
  }, [cartItems]);

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
  }, []);

  useEffect(() => {
    getTotal();
  }, [cart]);

  const getTotal = () => {
    const res = cart.reduce((prev, item) => {
      const precio = cartItems[0].price
      const calculo = prev + precio * item.cantidad;
      return calculo;
    }, 0);
    setTotal(res);
  };

  const increase = (id, cantidad) => {
    axios
      .put(`http://localhost:3001/api/cart/${userLogueado.id}/${id}`, {
        cantidad: cantidad + 1,
      })
      .then((response) => {
        cantidadTotal += 1
        dispatch(setCart(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reduction = (id, cantidad) => {
    // if (cantidad === 1) {
    //   if (window.confirm("¿Quieres quitar este producto?")) {
    //     removeProduct(id);
    //   }
    // } else {
    axios
      .put(`http://localhost:3001/api/cart/${userLogueado.id}/${id}`, {
        cantidad: cantidad - 1,
      })
      .then((response) => {
        console.log("CART-REDUCCION", response.data);
        cantidadTotal -= 1
        dispatch(setCart(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    //}
  };

useEffect(()=> {
  
},[])

  const removeProduct = (id) => {
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
          {cartItems.map((item) => (
            <div className="product-container" key={item.id}>
              <img src={item.image} alt="" />
              <div className="product-details">
                <h2>{item.name}</h2>
                <p>Precio: ${item.price}</p>
                <div className="cantidad">
                  <button
                    className="cantidad-button"
                    onClick={() =>
                      reduction(
                        item.id,
                        cart.filter((e) => e.productId === item.id)[0].cantidad
                      )
                    }
                  >
                    -
                  </button>
                  <span>
                    {cart.filter((e) => e.productId === item.id)[0].cantidad}
                  </span>
                  <button
                    className="cantidad-button"
                    onClick={() =>
                      increase(
                        item.id,
                        cart.filter((e) => e.productId === item.id)[0].cantidad
                      )
                    }
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
          ))}
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
