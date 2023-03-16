import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import Products from "../section/Products";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/reducers/userReducer";
import Navbar from "../navbar/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState({});

  const [loading, setLoading] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const userLogueado = JSON.parse(localStorage.getItem("user")) || {};
    dispatch(setUser(userLogueado));
  }, [setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmail("");
    setPassword("");
    try {
      const res = await axios.post("http://localhost:3001/api/user/login", {
        email: email,
        password: password,
      });

      dispatch(setUser(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      alert("Hubo un error al iniciar sesión");
    }
  };

  console.log("USER", user);
  // if (userCreated) {

  // }

  return loading ? (
    <div>Loading...</div>
  ) : localStorage.getItem("user") === null ? (
    <>
      <Navbar />
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
            <h1 className={styles.title}>Iniciar sesión</h1>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Email: </label>
              <input
                className={styles.input}
                placeholder="Ingrese su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              ></input>
            </div>
            <div className={styles.inputContainer}>
              <br />
              <label className={styles.label}>Contraseña: </label>
              <input
                placeholder="Ingrese su contraseña"
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
            </div>
            <br />
            <button type="submit" className={styles.submitBtn}>
              Iniciar sesión
            </button>
            <br />
            <div>
              <Link to="/signup">¿No tienes cuenta? Registrate aquí</Link>
            </div>
            <br />
            <hr />
            <div>
              <Link to="/">Volver a inicio</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    navigate("/")
  );
};

export default Login;
