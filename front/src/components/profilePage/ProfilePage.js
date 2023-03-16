
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
  const [phoneNumber, setPhoneNumber] = useState("");
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
        celNumber: phoneNumber,
      })
      .then((res) => {
        console.log("reeeees", res);
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
    <>
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
          >
            Historial de órdenes
          </button>
          {/* cuando haga el click me cambie el estado de isEditing */}
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Editar perfil
          </button>
          <Link to="/">Volver a inicio</Link>
        </div>
      </div>
    </>
  ) : (
    <>
      {/* hacer condicional para que muestre lo que corresponda con isEditing. hacer que cambie con el onclick */}
      <div className={styles.profilecontainer}>
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
              type="text"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
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
            <Link to="/">Volver a inicio</Link>
          </div>
        </form>
      </div>
    </>

  );
}

export default ProfilePage;
