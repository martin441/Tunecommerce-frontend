import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/EditUsuarios.module.css";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import env from "../../src/config/env";

const EditUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [first, setfirst] = useState(0);

  const userLogueado = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    axios
      .get(`${env.API_BASE_URL}/api/admin`, {
        withCredentials: true,
      })
      .then((res) => {
        const filtrados = res.data.filter((e) => e.id !== userLogueado.id);
        setUsers(filtrados);
      })
      .catch(() => {
        toast.success("No se encontraron usuarios");
      });
  }, [first]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de que desea eliminar este usuario?"
    );

    if (confirmDelete) {
      axios
        .delete(`${env.API_BASE_URL}/api/admin/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success("usuario borrado");
          setfirst(Math.random());
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAdmin = (user) => {
    axios
      .put(
        `${env.API_BASE_URL}/api/admin/${user.id}`,
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
        <div className={styles.title}>
          <Link to="/profile">
            <FiArrowLeft size={20} style={{ marginRight: "10px" }} />
          </Link>
          <h1 className={styles.editarUsuario}>Editar usuarios</h1>
        </div>
        <div className={styles.usermap}>
          {users.map((user) => {
            console.log("USERMAP", user);
            return (
              <div className={styles.conainerUser}>
                <li className={styles.name}>
                  {user.name} {user.isAdmin ? "-> Admin" : ""}{" "}
                </li>
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
        </div>
      </div>
    </>
  );
};

export default EditUsuarios;
