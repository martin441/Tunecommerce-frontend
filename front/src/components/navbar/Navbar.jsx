import React, { useState, useEffect } from "react";
import Menu from "../svg/bars-solid.svg";
import Close from "../svg/times-solid.svg";
import CartIcon from "../svg/shopping-cart-solid.svg";
import LogoutIcon from "../svg/logout.svg";
import ProductSearch from "../search/ProductSearch";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import axios from "axios";
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
      <div className="header">
        <div className="menu" onClick={menuToggle}>
          <img src={Menu} alt="" width="20" />
        </div>

        <h1 className="logo">
          <Link to="/">Tunecommerce</Link>
        </h1>

        <div className="buscador">
          <ProductSearch />
        </div>

        <nav>
          <div className="navbar">
            <ul className={toggle ? "toggle" : ""}>
              {loggedInUser ? (
                <li>
                  <div className="user-icon" onClick={expandUserMenuToggle}>
                    {/* Mostramos el nombre de usuario */}
                    <li className="user-name">{user.username}</li>
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
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
