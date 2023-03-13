import { React, useEffect, useState } from "react";
import Menu from "../svg/bars-solid.svg";
import Close from "../svg/times-solid.svg";
import CartIcon from "../svg/shopping-cart-solid.svg";
import UserIcon from "../svg/user-solid.svg";
import LogoutIcon from "../svg/logout.svg";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const [state, setState] = useState("");
  const [toggle, setToggle] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [expandUserMenu, setExpandUserMenu] = useState(false);

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const menuToggle = () => {
    setToggle({ toggle: !state.toggle });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedInUser({});
  };

  const expandUserMenuToggle = () => {
    setExpandUserMenu(!expandUserMenu);
  };

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
            <li>
              <Link to="/product">Product</Link>
            </li>
            {/* <li>
                <Link to="/contact">Contact</Link>
              </li> */}
            {/* <li>
                <Link to="/about">About</Link>
              </li> */}
            {loggedInUser ? (
              <li>
                <div className="user-icon" onClick={expandUserMenuToggle}>
                  <img src={UserIcon} alt="" width="20" />
                  {/* Mostramos el nombre de usuario */}
                  {loggedInUser && (
                    <span className="user-name">{loggedInUser.username}</span>
                  )}
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
          {/* <div className="nav-cart">
            <span>{cart.length}</span>
            <Link to="/cart">
              <img src={CartIcon} alt="" width="20" />
            </Link>
            {loggedInUser && (
              <div className="logout-icon" onClick={handleLogout}>
                Logout
                <img src={LogoutIcon} alt="" width="20" />
              </div>
            )}
          </div> */}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
