import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/Signup.module.css";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/user/login", {
        email: email,
        password: password,
      })
      .then(() => alert("Usuario creado correctamente"))
      .catch(() => {
        alert("Hubo un error al crear el usuario");
      });
  };

  return localStorage.getItem("user") === null ? (
    <div
      style={{
        position: "absolute",
        borderRadius: "5px",
        left: "20vw",
        top: "50vh",
        width: "60vw",
        height: "30vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundSize: "80vw",
      }}
    >
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Login</h1>
          <div className={styles.inputContainer}>
            <label className={styles.label}>email: </label>
            <input
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            ></input>
          </div>
          <div className={styles.inputContainer}>
            <br />
            <label className={styles.label}>password: </label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <br />
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
          <br />
          <div>
            <Link to="/signup">¿no tienes cuenta? Registrate aquí</Link>
          </div>
          <br />
          <hr />
          <div>
            <Link to="/">Volver a inicio</Link>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <h2>Welcome {localStorage.getItem("user").username}</h2>
  );
};

export default Login;
