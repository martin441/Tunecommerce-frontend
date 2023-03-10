import React, { Component } from "react";
import Menu from "../svg/bars-solid.svg";
import Close from "../svg/times-solid.svg";
import CartIcon from "../svg/shopping-cart-solid.svg";
import UserIcon from "../svg/user-solid.svg";
import LogoutIcon from "../svg/logout.svg";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { DataContext } from "../../utils/fakeData/Products.js";

export class Navbar extends Component {
  static contextType = DataContext;

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      loggedInUser: localStorage.getItem("user"),
      expandUserMenu: false,
    };
  }

  menuToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  handleLogout = () => {
    localStorage.removeItem("user");
    this.setState({ loggedInUser: null });
  };

  expandUserMenuToggle = () => {
    this.setState({ expandUserMenu: !this.state.expandUserMenu });
  };

  render() {
    const { toggle, loggedInUser, expandUserMenu } = this.state;
    const { cart } = this.context;
    const user = JSON.parse(loggedInUser); // Parseamos la información del usuario
    return (
      <div className="contenedor">
        <header>
          <div className="menu" onClick={this.menuToggle}>
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
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              {loggedInUser ? (
                <li>
                  <div
                    className="user-icon"
                    onClick={this.expandUserMenuToggle}
                  >
                    <img src={UserIcon} alt="" width="20" />
                    {/* Mostramos el nombre de usuario */}
                    {user && <span className="user-name">{user.username}</span>}
                    {expandUserMenu && (
                      <div className="user-menu">
                        <Link to="/profile">Profile</Link>
                        <div onClick={this.handleLogout}>
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
              <li className="close" onClick={this.menuToggle}>
                <img src={Close} alt="" width="20" />
              </li>
            </ul>
            <div className="nav-cart">
              <span>{cart.length}</span>
              <Link to="/cart">
                <img src={CartIcon} alt="" width="20" />
              </Link>
              {loggedInUser && (
                <div className="logout-icon" onClick={this.handleLogout}>
                  Logout
                  <img src={LogoutIcon} alt="" width="20" />
                </div>
              )}
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default Navbar;
