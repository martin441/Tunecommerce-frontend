import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../css/ProductsAdmin.css";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategories = () => {
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [categoriaDescripcion, setCategoriaDescripcion] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState({});
  const [editarNombre, setEditarNombre] = useState("");
  const [editarDescripcion, setEditarDescripcion] = useState("");
  const [deleteCategoria, setDeleteCategoria] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/api/categories/todo`).then((res) => {
      setCategorias(res.data);
    });
  }, []);

  const handleAddCategoty = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api/categories`, {
        name: categoriaNombre,
        description: categoriaDescripcion,
      })
      .then(() => {
        // Setear los campos
        setCategoriaNombre("");
        setCategoriaDescripcion("");
        //recargar la pagina para cargar los dats
        window.location.reload();
      });
  };

  const handleCategoryChange = (categoryId) => {
    const categoria = categorias.filter(
      (e) => e.id === parseInt(categoryId)
    )[0];

    setCategoria(categoria);
    setEditarNombre(categoria.name);
    setEditarDescripcion(categoria.description);
  };

  const handleEditCategory = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/api/categories/${categoria.id}`, {
        name: editarNombre,
        description: editarDescripcion,
      })
      .then(() => {
        toast.success("Categoria editada correctamente");
        setEditarNombre("");
        setEditarDescripcion("");
        // Recargar la página para cargar los datos
        window.location.reload();
      });
  };

  const handleDeleteCategory = (e) => {
    e.preventDefault();
    const confirmation = window.confirm(
      "¿Está seguro que desea eliminar la categoría?"
    );
    if (confirmation) {
      axios
        .delete(`http://localhost:3001/api/categories/${deleteCategoria}`)
        .then(() => {
          toast.success("Categoria eliminada correctamente");
          // Recargar la página para cargar los datos
          window.location.reload();
        });
    }
  };
  console.log(deleteCategoria);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{ width: "100%", maxWidth: "500px" }}
        className="form-container"
      >
        <Link to="/profile">
          <FaArrowLeft style={{ width: 18, height: 20 }} />
        </Link>
        <h3>Agregar Categorias</h3>
        <form onSubmit={handleAddCategoty}>
          <label>Nombre de categoria: </label>
          <input
            placeholder="nombre de la categoria"
            value={categoriaNombre}
            onChange={(e) => setCategoriaNombre(e.target.value)}
            type="text"
            required
          ></input>
          <label>Descripcion de categoria: </label>
          <input
            placeholder="descripcion de la categoria"
            value={categoriaDescripcion}
            onChange={(e) => setCategoriaDescripcion(e.target.value)}
            type="text"
            required
          ></input>
          <button type="submit">Agregar</button>
        </form>
        <br />
      </div>
      <br></br>
      <div
        style={{ width: "100%", maxWidth: "500px" }}
        className="form-container"
      >
        <h3>Editar Categorias</h3>
        <form action="#" onSubmit={handleEditCategory}>
          <label for="cat">Categorias</label>
          <select
            name="categorias"
            id="cat"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categorias.map((category, i) => {
              return (
                <option key={i} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <label>Nombre de categoria: </label>
          <input
            value={editarNombre}
            onChange={(e) => setEditarNombre(e.target.value)}
            required
          ></input>
          <label>Descripcion de categoria: </label>
          <input
            value={editarDescripcion}
            onChange={(e) => setEditarDescripcion(e.target.value)}
            type="text"
            required
          ></input>
          <button type="submit">Editar</button>
        </form>
      </div>
      <br></br>
      <div
        style={{ width: "100%", maxWidth: "500px" }}
        className="form-container"
      >
        <h3>Eliminar Categorias</h3>
        <form action="#" onSubmit={handleDeleteCategory}>
          <label for="cat">Categorias</label>
          <select
            name="categorias"
            id="cat"
            onChange={(e) => setDeleteCategoria(e.target.value)}
          >
            {categorias.map((category, i) => {
              return (
                <option key={i} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <button type="submit">Eliminar ❕ </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategories;
