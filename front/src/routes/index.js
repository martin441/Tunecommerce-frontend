import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import HomePage from "../components/home/Home.jsx";
import NotFoundPage from "../components/notFoundPage/NotFoundPage.js";
import ProfilePage from "../components/profilePage/ProfilePage.js";

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  // Devuelve verdadero o falso dependiendo de si el usuario está autenticado o no.
  // En esta ocasión voy a probar en hardcore
  return true;
};

// Componente para renderizar rutas privadas
function PrivateRoute(props) {
  // Extraer las propiedades de la ruta
  const { component: Component, path } = props;

  // Devuelvo una ruta que renderice el componente sólo si el usuario está autenticado
  return (
    <Route path={path}>
      {isAuthenticated() ? (
        <Component />
      ) : (
        // Redirigir al usuario a la página de inicio si no está autenticado
        <Redirect
          to={{
            pathname: "/", // Redirige al usuario a la página de inicio
            state: { from: props.location }, // Almacena la ubicación actual del usuario en caso de que quiera volver más tarde
          }}
        />
      )}
    </Route>
  );
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
