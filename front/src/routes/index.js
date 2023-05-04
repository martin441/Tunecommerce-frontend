import { Route, Routes, Navigate } from "react-router-dom";
import Cart from "../components/cart/Cart.jsx";
import NotFoundPage from "../components/notFoundPage/NotFoundPage.js";
import ProfilePage from "../components/profilePage/ProfilePage.jsx";
import Details from "../components/section/Details.jsx";
import Products from "../components/section/Products.jsx";
import Login from "../components/login/Login.jsx";
import SignUp from "../components/signup/SignUp";
import ProductsAdmin from "../components/admin/products/ProductsAdmin.jsx";
import Historial from "../components/checkout/Historial";
import DetalleHistorial from "../components/section/DetalleHistorial.jsx";
import Checkout from "../components/checkout/Checkout.jsx";
import AddCategories from "../components/admin/categories/AddCategories.jsx";
import Navbar from "../components/navbar/Navbar.jsx";
import EditUsuarios from "../components/EditUsuarios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/footer/Footer.jsx";

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
    <>
      <ToastContainer />
      <Navbar />

      <Routes>
        {/* rutas de admin */}
        <Route exact path="/admin/products" element={<ProductsAdmin />} />
        <Route exact path="/admin/categories" element={<AddCategories />} />
        {/* ------------------------------------------------------------ */}
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<Details />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/admin/products" element={<ProductsAdmin />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/detalleOrden/:id" element={<DetalleHistorial />} />
        <Route path="/editusuarios" element={<EditUsuarios />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
