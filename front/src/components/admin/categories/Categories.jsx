import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//importar env
import env from "../../../config/env";

const AddCategories = () => {
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [categoriaDescripcion, setCategoriaDescripcion] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState({});
  const [editarNombre, setEditarNombre] = useState("");
  const [editarDescripcion, setEditarDescripcion] = useState("");
  const [deleteCategoria, setDeleteCategoria] = useState("");

  useEffect(() => {
    axios.get(`${env.API_BASE_URL}/api/categories/todo`).then((res) => {
      setCategorias(res.data);
    });
  }, []);

  const handleAddCategoty = (e) => {
    e.preventDefault();
    axios
      .post(`${env.API_BASE_URL}/api/categories`, {
        name: categoriaNombre,
        description: categoriaDescripcion,
      })
      .then(() => {});
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
      .put(`${env.API_BASE_URL}/api/categories/${categoria.id}`, {
        name: editarNombre,
        description: editarDescripcion,
      })
      .then(() => {
        toast.success("Categoria editada correctamente");
      });
  };

  const handleDeleteCategory = (e) => {
    e.preventDefault();
    console.log("asdasd", deleteCategoria);
    axios
      .delete(`${env.API_BASE_URL}/api/categories/${deleteCategoria}`)
      .then(() => {
        toast.success("Categoria eliminada correctamente");
      });
  };
  console.log(deleteCategoria);

  return (
    <div>
      <div>
        <h3>Agregar Categorias</h3>
        <form onSubmit={handleAddCategoty}>
          <label>Nombre de categoria: </label>
          <input
            placeholder="Ingrese el nombre de la categoria"
            value={categoriaNombre}
            onChange={(e) => setCategoriaNombre(e.target.value)}
            type="text"
            required
          ></input>
          <label>Descripcion de categoria: </label>
          <input
            placeholder="Ingrese la descripcion de la"
            value={categoriaDescripcion}
            onChange={(e) => setCategoriaDescripcion(e.target.value)}
            type="text"
            required
          ></input>
          <button type="submit">Agregar</button>
        </form>
      </div>
      <br></br>
      <div>
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
      <div>
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
          <button type="submit">Eliminar</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategories;
