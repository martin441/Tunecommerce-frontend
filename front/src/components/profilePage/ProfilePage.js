import React from "react";

// import PrivateRoute from "../../routes/index.js";
import { Link } from "react-router-dom";
const ProfilePage = () => {
  return (
    <div>
      <h1>Página de perfil</h1>
      <p>Contenido de la página de perfil</p>
      <Link to="/">Volver a inicio</Link>
    </div>
  );
};

export default ProfilePage;
