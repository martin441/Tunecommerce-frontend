import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EditUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [first, setfirst] = useState(0);

  const userLogueado = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    console.log("USERLOG", userLogueado);
    axios
      .get(`http://localhost:3001/api/admin`)
      .then((res) => {
        const filtrados = res.data.filter((e) => e.id !== userLogueado.id);
        console.log("FILTRADO", filtrados);
        setUsers(filtrados);
      })
      .catch(() => {
        alert("No se encontraron usuarios");
      });
  }, [first]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/admin/${id}`, {})
      .then((res) => {
        alert("usuario borrado");
        setfirst(Math.random());
      })
      .catch((err) => console.log(err));
  };

  const handleAdmin = (user) => {
    axios
      .put(`http://localhost:3001/api/admin/${user.id}`, {
        isAdmin: !user.isAdmin,
      })
      .then((res) => {
        setfirst(Math.random());
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Editar usuarios</h1>
      {users.map((user) => {
        return (
          <div>
            <li>{user.name}, Admin: </li>{" "}
            <input
              onClick={() => handleAdmin(user)}
              type="checkbox"
              checked={user.isAdmin ? true : false}
            />
            <button onClick={() => handleDelete(user.id)}>
              Eliminar usuario
            </button>
          </div>
        );
      })}

      <Link to="/">Volver a inicio</Link>
    </>
  );
};

export default EditUsuarios;
