import axios from "axios";
import React, { useEffect, useState } from "react";

const AddCategories = () => {
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [categoriaDescripcion, setCategoriaDescripcion] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState({});
  const [editarNombre, setEditarNombre] = useState("");
  const [editarDescripcion, setEditarDescripcion] = useState("");

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
      .put(`http://localhost:3001/api/categories/${categoria.id}`, {
        name: editarNombre,
        description: editarDescripcion,
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <>
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
          {console.log(categoria.name)}
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
          <button type="submit">Editar categoria</button>
        </form>
      </div>
    </>
  );
};

export default AddCategories;
