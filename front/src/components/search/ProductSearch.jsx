import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

function ProductSearch() {
  const [nombre, setNombre] = useState("");
  const [productos, setProductos] = useState([]);
  const [expandUserMenu, setExpandUserMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expandUserMenu && !event.target.closest(".search-container")) {
        setExpandUserMenu(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [expandUserMenu]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:3001/api/products/search/${nombre}`
      );
      console.log("response", response.data);
      setProductos(response.data);
      setExpandUserMenu(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    setExpandUserMenu(true);
  };

  const handleChange = (event) => {
    setNombre(event.target.value);
  };

  return (
    <div className="search-container">
      {expandUserMenu && (
        <div className="search-results">
          {Array.isArray(productos) && productos.length > 0 ? (
            productos.map((producto) => (
              <Link to={`/product/${producto.id}`} key={producto.id}>
                <div className="search-result">
                  <img
                    src={producto.image}
                    alt={producto.name}
                    className="search-result-image"
                  />
                  <span className="search-result-name">{producto.name}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="search-result">No se encontraron resultados</div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={handleChange}
          placeholder="Buscar producto"
          className="search-input"
        />
        {/* <button
          type="submit"
          className="search-button"
          onClick={handleButtonClick}
        >
          <i className="fas fa-search"></i>
        </button> */}
      </form>
    </div>
  );
}

export default ProductSearch;
