import { React, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import env from "../../../src/config/env";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [celnumber, setcelNumber] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const navigate = useNavigate();
  // `${env.API_BASE_URL}/api/user/register`
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${env.API_BASE_URL}/api/user/register`, {
        username: username,
        password: password,
        name: name,
        lastname: lastname,
        email: email,
        address: address,
        celnumber: celnumber,
      })
      .then((res) => {
        setUserCreated(true);
        toast.success("Se creó el usuario correctamente");
        if (userCreated) {
          navigate("/login");
        }
      })
      .catch(() => {
        toast.error("Hubo un error al crear el usuario");
      });
  };

  if (userCreated) {
    navigate("/login");
  }



  console.log(name,lastname, username, address, celnumber, )

  return localStorage.getItem("user") === null ? (
    <>

    {/* <div style={{ width:"150vh" , height:"130vh",  backgroundColor:"pink",}}> */}
      <div
        style={{
          // position: "absolute",
          // borderRadius: "5px",
          // left: "20vw",
          // top: "50vh",
          // width: "60vw",
          // height: "30vh",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",

          // backgroundSize: "80vw",
          display:"flex",
          width:"100%" , height:"110%"
        }}
      >

        <div  style={{margin:"auto", marginTop:"1.5%"}}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.title} >
              Crea tu cuenta
            </h3>

            <div className={styles.inputContainer}>
              <label
                className={styles.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Nombre:
              </label>
              <input
                className={styles.input}
                placeholder="Ingrese su nombre"
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
                Apellido:
              </label>
              <input
                className={styles.input}
                placeholder="Ingrese su apellido"
                type="text"
                required
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
            <br />
            <div className={styles.inputContainer}>
              <label className={styles.label}>Nombre de usuario: </label>
              <input
                className={styles.input}
                placeholder="Nombre de usuario"
                type="text"
                required
                value={username}
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
                Email:
              </label>
              <input
                className={styles.input}
                placeholder="Ingrese su email"
                type="email"
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
                Dirección:
              </label>
              <input
                className={styles.input}
                placeholder="Ingrese su dirección"
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
                Número de teléfono:
              </label>
              <input
                className={styles.input}
                placeholder="Ingrese su número de teléfono"
                type="number"
                required
                value={celnumber}
                onChange={(e) => setcelNumber(e.target.value)}
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
                Contraseña: (mínimo 8 caracteres)
              </label>
              <input
                className={styles.input}
                placeholder="Ingrese su contraseña"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Registrarse
            </button>
            <br />
            <div>
              <Link to="/login" className={styles.link}>
                ¿Ya tienes cuenta? Inicia Sesión aquí
              </Link>
            </div>
            <br />
            <hr />
            <div style={{ marginTop: "15px" }}>
              <Link to="/" className={styles.link}>
                Volver al inicio
              </Link>
            </div>
          </form>
        </div>
      </div>
         {/* </div> */}
    </>
  ) : (
    navigate("/")
  );
};

export default SignUp;
