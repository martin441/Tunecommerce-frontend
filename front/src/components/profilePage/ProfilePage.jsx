import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../css/ProfilePage.module.css";
import { setUser } from "../../redux/reducers/userReducer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/ProfilePage.css";

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
      .put(`http://localhost:3001/api/user/update/${user.id}`, {
        password: password,
        email: email,
        address: address,
        celnumber: celnumber,
      })
      .then((res) => {
        dispatch(setUser(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsEditing(false);

        alert("Se realizaron los cambios satisfactoriamente");
      })
      .catch(() => {
        alert("Hubo un error al actualizar los datos");
      });
  };

  console.log("RANDOM", random);

  return !isEditing ? (
    <div className={styles.profilecontainer}>
      <div className={styles.profileinfo}>
        <img className="profileImage" src={random} alt="" />

        <div className="userdata">
          <div className="item">
            <p>
              <b> Nombre:</b> {user.name}
            </p>
          </div>

          <div className="item">
            <p>
              <b> Apellido:</b> {user.lastname}
            </p>
          </div>

          <div className="item">
            <p>
              <b> Mail:</b> {user.email}
            </p>
          </div>
          <div className="item">
            <p>
              <b> Dirección: </b> {user.address}
            </p>
          </div>
          <div className="item">
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
    <div className="formDiv">
      <h2>Editar Perfil</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Dirección
          <input
            className="inputEdit"
            type="text"
            value={user.address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <label>
          Número de teléfono:
          <input
            className="inputEdit"
            type="text"
            defaultValue={user.celnumber}
            onChange={(event) => setCelnumber(event.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            className="inputEdit"
            type="text"
            defaultValue={user.email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Contraseña:
          <input
            className="inputEdit"
            type="text"
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
  );
}

export default ProfilePage;
