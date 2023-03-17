import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ProductsAdmin.css";
import { Link } from "react-router-dom";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = () => {
    axios
      .get("http://localhost:3001/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const getCategories = () => {
    axios
      .get("http://localhost:3001/api/categories/todo")
      .then((response) => {
        console.log("CATEGORIEES", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const createProduct = (event) => {
    event.preventDefault();
    const data = {
      name,
      description,
      price,
      image,
      stock,
      category,
    };
    const url = editingProduct
      ? `http://localhost:3001/api/products/${editingProduct.id}`
      : "http://localhost:3001/api/products/1";

    axios({
      method: editingProduct ? "put" : "post",
      url,
      data,
    })
      .then(() => {
        getProducts();
        setName("");
        setDescription("");
        setPrice("");
        setImage([]);
        setStock("");
        setCategory("");
        setEditingProduct(null);
      })
      .catch((error) => {
        alert("Ocurrió un error inesperado");
        setError(error.message);
      });
  };

  const deleteProduct = (productId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      axios
        .delete(`http://localhost:3001/api/products/${productId}`)
        .then(() => {
          getProducts();
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const editProduct = (product) => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setImage(product.image);
    setStock(product.stock);
    setCategory(product.categoryId);
    setEditingProduct(product);
  };

  return (
    <div>
      {error && <div>Error al cargar los productos: {error}</div>}
      <div style={{ display: "flex" }}>
        <div style={{ width: "40%" }} className="form-container">
          <h2>{editingProduct ? "Editar Producto" : "Crear Producto"}</h2>
          <form onSubmit={createProduct}>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <label>Descripcion:</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div>
              <label>Precio:</label>
              <input
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div>
              <label>Imagen:</label>
              <input
                type="text"
                value={image}
                onChange={(event) => setImage([event.target.value])}
              />
            </div>
            <div>
              <label>Stock:</label>
              <input
                type="number"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
              />
            </div>
            <div>
              <label>Categoría:</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="">-- Seleccione una categoría --</option>
                {categories.map(
                  (category) => (
                    console.log("CATEGORIASSSfdg", category),
                    console.log("CATEGORIASSS", category.id),
                    (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    )
                  )
                )}
              </select>
            </div>
            <button type="submit">{editingProduct ? "Editar" : "Crear"}</button>
            <br />
            <Link to="/profile">
              <button className="volver">Volver</button>
            </Link>
          </form>
        </div>
        <div style={{ width: "50%" }}>
          <h2>Lista de productos</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                //console.log("PRODUCTIRO", product.categoryId),
                //console.log("CARTITEMS", cartItems),
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>
                    {product.image.length > 0 && (
                      <img src={product.image[0]} alt={product.name} />
                    )}
                  </td>
                  <td>{product.stock}</td>
                  <td>
                    {
                      categories.filter((e) => e.id === product.categoryId)[0]
                        .name
                    }
                  </td>
                  <td>
                    <button onClick={() => editProduct(product)}>Editar</button>
                    <button onClick={() => deleteProduct(product.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsAdmin;
