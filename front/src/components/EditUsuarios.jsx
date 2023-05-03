import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/EditUsuarios.module.css";

const EditUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [first, setfirst] = useState(0);

  const userLogueado = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/admin`, {
        withCredentials: true,
      })
      .then((res) => {
        const filtrados = res.data.filter((e) => e.id !== userLogueado.id);
        setUsers(filtrados);
      })
      .catch(() => {
        alert("No se encontraron usuarios");
      });
  }, [first]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de que desea eliminar este usuario?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:3001/api/admin/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          alert("usuario borrado");
          setfirst(Math.random());
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAdmin = (user) => {
    axios
      .put(
        `http://localhost:3001/api/admin/${user.id}`,
        {
          isAdmin: !user.isAdmin,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setfirst(Math.random());
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={styles.marcoEditar}>
        <h1 className={styles.editarUsuario}>Editar usuarios</h1>
        {users.map((user) => {
          console.log("USERMAP", user);
          return (
            <div>
              <li>{user.name}, Admin: </li>{" "}
              <input
                className={styles.checkbox}
                onClick={() => handleAdmin(user)}
                type="checkbox"
                checked={user.isAdmin ? true : false}
              />
              <div className={styles.text}>
                <button
                  className={styles.botonEliminar}
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar usuario
                </button>
              </div>
            </div>
          );
        })}

        <Link
          style={{
            marginTop: "30vh",
            textAlign: "center",
            textDecoration: "none",
            color: "grey",
            paddingBottom: "30px",
            paddingTop: "30px",
          }}
          to="/"
        >
          Volver a inicio
        </Link>
      </div>
    </>
  );
};

export default EditUsuarios;
