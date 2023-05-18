import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../css/ProfilePage.module.css";
import { setUser } from "../../redux/reducers/userReducer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/ProfilePage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import env from "../../config/env";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let random = `https://api.multiavatar.com/0.24218016646343754.svg`;

  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [celnumber, setCelnumber] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userLogueado = JSON.parse(localStorage.getItem("user")) || {};
    dispatch(setUser(userLogueado));
  }, [setUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${env.API_BASE_URL}/api/user/update/${user.id}`, {
        password: password,
        email: email,
        address: address,
        celnumber: celnumber,
      })
      .then((res) => {
        dispatch(setUser(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsEditing(false);

        toast.success("Se realizaron los cambios satisfactoriamente");
      })
      .catch(() => {
        toast.error("Hubo un error al actualizar los datos");
      });
  };

  console.log("EMAIL", email);

  return !isEditing ? (
    <div className={styles.profilecontainer} style={{ paddingTop: "10px" }}>
      <div className={styles.profileinfo}>
        <img className="profileImage" src={random} alt="" />

        <div
          className="userdata"
          style={{ margin:"auto" }}
        >
          <div className="item" style={{ marginRight: "auto" }}>
            <p>
              <b> Nombre:</b> {user.name}
            </p>

            <p>
              <b> Apellido:</b> {user.lastname}
            </p>

            <p>
              <b> Mail:</b> {user.email}
            </p>

            <p>
              <b> Dirección: </b> {user.address}
            </p>

            <p>
              <b> Número de teléfono:</b> {user.celnumber}
            </p>
          </div>
        </div>

        <button
          className="button"
          onClick={() => {
            navigate("/historial");
          }}
          style={{ width: "50vh" }}
        >
          Historial de órdenes
        </button>

        <button
          className="button"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Editar perfil
        </button>

        {!user.isAdmin ? (
          <></>
        ) : (
          <>
            <div className="admin">Panel administrador ↓</div>
            <button
              className="button"
              onClick={() => {
                navigate("/editusuarios");
              }}
            >
              Editar usuarios
            </button>
            <button
              className="button"
              onClick={() => {
                navigate("/admin/categories");
              }}
            >
              Editar categorias
            </button>
            <button
              className="button"
              onClick={() => {
                navigate("/admin/products");
              }}
            >
              Editar productos
            </button>
          </>
        )}
        <button id="inicio">
          <Link
            style={{
              textDecoration: "none",
              color: "black",
              marginTop: "10px",
            }}
            to="/"
          >
            Volver a inicio
          </Link>
        </button>
      </div>
    </div>
  ) : (
    <div style={{display:"flex", marginTop:"10%"}}>
    <div className="formDiv" style={{ maxWidth:"35%", margin:"auto", padding:"20px 55px 20px", borderRadius:"5px", border:"2px solid grey", backgroundColor:"#fafafa"}}>

    <p style={{fontSize:"30px",fontWeight:"bold", marginBottom:"20px"}}>Editar Perfil</p>

      <form className="form" onSubmit={handleSubmit}>
        <label style={{marginRight:"30px" }}>
          Dirección:
          <input
            className="inputEdit"
            type="text"
            placeholder={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <label>
          Número de teléfono:
          <input
            className="inputEdit"
            type="text"
            placeholder={celnumber}
            onChange={(event) => setCelnumber(event.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            className="inputEdit"
            type="text"
            placeholder={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Contraseña:
          <input
            className="inputEdit"
            type="password"
            placeholder="* * * * * * *"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <div className="editButton">
          <button className="button" type="submit">
            Guardar
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default ProfilePage;
