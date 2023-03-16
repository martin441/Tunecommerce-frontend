import { Route, Routes, Navigate } from "react-router-dom";
import Cart from "../components/cart/Cart.jsx";
import NotFoundPage from "../components/notFoundPage/NotFoundPage.js";
import ProfilePage from "../components/profilePage/ProfilePage.js";
import Details from "../components/section/Details.jsx";
import Products from "../components/section/Products.jsx";
import { Checkout } from "../components/checkout/Checkout";
import Login from "../components/login/Login.jsx";
import SignUp from "../components/signup/SignUp";
import Historial from "../components/checkout/Historial";
import DetalleHistorial from "../components/section/DetalleHistorial.jsx";

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  // Devuelve verdadero o falso dependiendo de si el usuario está autenticado o no.
  // En esta ocasión voy a probar en hardcore
  const userLogueadoo = JSON.parse(localStorage.getItem("user")) || {};
  return userLogueadoo;
};
const userLogueado = JSON.parse(localStorage.getItem("user")) || {};
// Componente para renderizar rutas privadas
function PrivateRoute(props) {
  // Extraer las propiedades de la ruta
  const { component: Component, path } = props;

  // Devuelvo una ruta que renderice el componente sólo si el usuario está autenticado
  return (
    <Route path={path}>
      {userLogueado.name ? (
        <Component />
      ) : (
        // Redirigir al usuario a la página de inicio si no está autenticado
        <Navigate
          to={{
            pathname: "/login", // Redirige al usuario a la página de inicio
            state: { from: props.location }, // Almacena la ubicación actual del usuario en caso de que quiera volver más tarde
          }}
        />
      )}
    </Route>
  );
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      {/* <Route path="/product" component={Products} exact /> */}
      <Route path="/product/:id" element={<Details />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route path="/checkout" element={<Checkout />} />
      {/* <Route path="/profile" component={ProfilePage} /> */}
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/historial" element={<Historial />} />
      <Route path="/detalleOrden/:id" element={<DetalleHistorial />} />
    </Routes>
  );
};

export default App;
