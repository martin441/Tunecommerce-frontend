import React from "react";
import SimpleReactFooter from "simple-react-footer";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const url = useLocation();
  // Define the data for the footer
  const description =
    //poner una descripcion
    "Gracias por visitar Tunecommerce, tu destino en línea para encontrar los mejores instrumentos musicales. Nuestra misión es ofrecerte una amplia selección de productos de calidad y brindarte una experiencia de compra en línea excepcional.";
  const title = "TUNECOMMERCE";

  const columns = [];

  return (
    <>
      {url.pathname === "/login" || url.pathname === "/signup" ? (
        ""
      ) : (
        <SimpleReactFooter
          description={description}
          title={title}
          columns={columns}
          copyright="Tunecommerce 2023"
          iconColor="black"
          backgroundColor="crimson"
          fontColor="white"
          copyrightColor="white"
        />
      )}
    </>
  );
};

export default Footer;
