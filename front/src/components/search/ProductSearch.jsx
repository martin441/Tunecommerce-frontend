import React, { useState } from 'react';
import axios from "axios"
import "../css/Navbar.css";
import { Link } from 'react-router-dom';


function ProductSearch() {
  const [nombre, setNombre] = useState('');
  const [productos, setProductos] = useState([]);
  const [expandUserMenu, setExpandUserMenu] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

   axios.get(`http://localhost:3001/api/products/search/${nombre}`)
      .then(product => {
        setProductos(product.data);
        setExpandUserMenu(!expandUserMenu);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleChange = (event) => {
    setNombre(event.target.value);
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <>Buscar producto:</>
        <input type="text" id="nombre" value={nombre} onChange={handleChange} />
        <button type="submit">Buscar</button>
      </form>

      <ul >
      {expandUserMenu && (
                    productos.map(producto => (
                      <Link to={`/product/${producto.id}`}>
                      <li key={producto.id}
                     >{producto.name}</li>
                      </Link>
                      ))
                      )}
      
      </ul>
    </div>
  );
}

export default ProductSearch;