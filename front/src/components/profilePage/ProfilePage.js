import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../css/ProfilePage.module.css";
import { setUser } from "../../redux/reducers/userReducer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

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

  return !isEditing ? (
    <div className={styles.profilecontainer}>
      <h2 className={styles.username}>Usuario: {user.username} </h2>
      <div className={styles.profileinfo}>
        <p className={styles.name}>Nombre: {user.name}</p>
        <p className={styles.lastname}>Apellido: {user.lastname}</p>
        <p className={styles.mail}>Mail: {user.email}</p>
        <p className={styles.address}>Dirección: {user.address}</p>
        <p className={styles.phone}>Número de teléfono: {user.celnumber}</p>
        <button
          onClick={() => {
            navigate("/historial");
          }}
          style={{ width: "50vh" }}
        >
          Historial de órdenes
        </button>

        <button
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
            <div>Panel administrador ↓</div>
            <button
              onClick={() => {
                navigate("/editusuarios");
              }}
            >
              Editar usuarios
            </button>
            <button
              onClick={() => {
                navigate("/admin/categories");
              }}
            >
              Editar categorias
            </button>
            <button
              onClick={() => {
                navigate("/admin/products");
              }}
            >
              Editar productos
            </button>
          </>
        )}
        <Link style={{textDecoration: "none" , color:"grey", marginTop:"10px"}} to="/">Volver a inicio</Link>
      </div>
    </div>
  ) : (
    <div className={styles.profilecontainer}>
      <h2>Editar Perfil</h2>
      <form className={styles.profileform} onSubmit={handleSubmit}>
        <label>
          Dirección:
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <label>
          Número de teléfono:
          <input
            type="number"
            value={celnumber}
            onChange={(event) => setCelnumber(event.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <div className={styles.buttoncontainer}>
          <button type="submit">Guardar</button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Cancelar
          </button>
          {/* <Link to="/">Volver a inicio</Link> */}
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
