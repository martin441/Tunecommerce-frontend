import React, { useState } from "react";
import styles from "./login.module.css";
import axios from "axios";

export const SignUp = ({ user }) => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [celNumber, setcelNumber] = useState("");

  const handleSubmiit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/user/register", {
        userName: userName,
        password: password,
        name: name,
        lastName: lastName,
        email: email,
        address: address,
        celNumber: celNumber,
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
        top: "20vh",
        width: "60vw",
        height: "30vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundSize: "80vw",
      }}
    >
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmiit}>
          <h1
            className={styles.title}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Create account
          </h1>
          <div className={styles.inputContainer}>
            <label
              className={styles.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              User Name:{" "}
            </label>
            <input
              className={styles.input}
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>
          <br />
          <div className={styles.inputContainer}>
            <label
              className={styles.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Password:{" "}
            </label>
            <input
              className={styles.input}
              type="text"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <br />
          <div className={styles.inputContainer}>
            <label
              className={styles.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Name:{" "}
            </label>
            <input
              className={styles.input}
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <br />
          <div className={styles.inputContainer}>
            <label
              className={styles.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Last Name:{" "}
            </label>
            <input
              className={styles.input}
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
          <br />
          <div className={styles.inputContainer}>
            <label
              className={styles.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Email:{" "}
            </label>
            <input
              className={styles.input}
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <br />
          <div className={styles.inputContainer}>
            <label
              className={styles.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Address:{" "}
            </label>
            <input
              className={styles.input}
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </div>
          <br />
          <div className={styles.inputContainer}>
            <label
              className={styles.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Cel Number:{" "}
            </label>
            <input
              className={styles.input}
              type="text"
              required
              value={celNumber}
              onChange={(e) => setcelNumber(e.target.value)}
            ></input>
          </div>
          <br />
          <button
            type="submit"
            className={styles.submitBtn}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  ) : (
    <h2>Welcome {localStorage.getItem("user").username}</h2>
  );
};
