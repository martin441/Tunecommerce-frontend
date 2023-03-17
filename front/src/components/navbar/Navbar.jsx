import React, { useState, useEffect } from "react";
import Menu from "../svg/bars-solid.svg";
import Close from "../svg/times-solid.svg";
import CartIcon from "../svg/shopping-cart-solid.svg";
import UserIcon from "../svg/user-solid.svg";
import LogoutIcon from "../svg/logout.svg";
import ProductSearch from "../search/ProductSearch";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import axios from "axios";
import CartItemsReducer from "../../redux/reducers/CartItemsReducer";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("user")
  );
  const [expandUserMenu, setExpandUserMenu] = useState(false);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const cartItems = useSelector((state) => state.cartItems);

  useEffect(() => {
    // Obtener productos del servidor
    axios.get("http://localhost:3001/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
  };

  const menuToggle = () => {
    setToggle(!toggle);
  };

  const expandUserMenuToggle = () => {
    setExpandUserMenu(!expandUserMenu);
    setToggle(false);
  };

  const user = JSON.parse(loggedInUser); // Parseamos la información del usuario

  return (
    <div className="contenedor">
      <header>
        <div className="menu" onClick={menuToggle}>
          <img src={Menu} alt="" width="20" />
        </div>
        <div className="logo">
          <h1>
            <Link to="/">Tunecommerce</Link>
          </h1>
          
        </div>
        <nav>
          <ul className={toggle ? "toggle" : ""}>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/product">Product</Link>
            </li> */}
            {/* <li>
                <Link to="/contact">Contact</Link>
              </li> */}
            {/* <li>
                <Link to="/about">About</Link>
              </li> */}
            {loggedInUser ? (
              <li>
                {/* <div className="buscador">
                  <ProductSearch />
                </div> */}
                <div className="user-icon" onClick={expandUserMenuToggle}>
                  <img src={UserIcon} alt="" width="20" />
                  {/* Mostramos el nombre de usuario */}
                  {user && <span className="user-name">{user.username}</span>}
                  {expandUserMenu && (
                    <div className="user-menu">
                      <Link to="/profile">Profile</Link>
                      <div onClick={handleLogout}>
                        <img src={LogoutIcon} alt="" width="20" />
                        Logout
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login">Login / Register</Link>
              </li>
            )}
            <li className="close" onClick={menuToggle}>
              <img src={Close} alt="" width="20" />
            </li>
          </ul>
          <div className="nav-cart">
            <span>{cartItems.length}</span>
            <Link to="/cart">
              <img src={CartIcon} alt="" width="20" />
            </Link>
            {/* {loggedInUser && (
              <div className="cart-dropdown">
                <ul>
                  {cart.length === 0 ? (
                    <li></li>
                  ) : (
                    cart.map((item) => (
                      <li key={item.id}>
                        <Link to={`/product/${item.id}`}>
                          <img src={item.image} alt={item.title} />
                          <div>
                            <h3>{item.title}</h3>
                            <p>
                              {item.price}€ x {item.quantity}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))
                  )}
                  {cart.length > 0 && (
                    <li>
                      <Link to="/cart">Go to cart</Link>
                    </li>
                  )}
                </ul>
              </div>
            )} */}
          </div>
        </nav>
      </header>
      <div className="buscador">
            <ProductSearch />
          </div>
    </div>
  );
};

export default Navbar;
