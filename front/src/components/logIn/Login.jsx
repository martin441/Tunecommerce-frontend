import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/userReducer";

export const Login = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    const dispatch = useDispatch();
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(setUser(res.data));
      })
      .catch(() => {
        alert("Hubo un problema con tu usuario o contraseña");
      });
  };

  if (localStorage.getItem("user") === null) {
    return (
      <div className={styles.signupFrm}>
        <div className={styles.wrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.title}>Login</h1>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Username: </label>
              <input
                className={styles.input}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="userName"
              ></input>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Email: </label>
              <input
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              ></input>
            </div>
            <div className={styles.inputContainer}>
              <br />
              <label>Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <br />
            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </form>

          <Link
            to="/register"
            style={{
              position: "absolute",
              textDecoration: "none",
              color: "black",
            }}
          >
            <h1>Don't have account? Register</h1>
          </Link>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};
