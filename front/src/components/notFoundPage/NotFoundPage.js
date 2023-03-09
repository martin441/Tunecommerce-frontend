import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const NotFoundPage = () => {
  return (
    <div>
      <h1>Error 404: Página no encontrada</h1>
      <p>Lo siento, la página que estás buscando no existe.</p>
      <Button variant="contained" color="primary" component={Link} to="/">
        Volver a la página principal
      </Button>
    </div>
  );
};

export default NotFoundPage;
