import React from "react";
import SimpleReactFooter from "simple-react-footer";

const Footer = () => {
  // Define the data for the footer
  const description =
    //poner una descripcion
    "Gracias por visitar Tunecommerce, tu destino en línea para encontrar los mejores instrumentos musicales. Nuestra misión es ofrecerte una amplia selección de productos de calidad y brindarte una experiencia de compra en línea excepcional.";
  const title = "Tunecommerce";

  const columns = [];

  return (
    <SimpleReactFooter
      description={description}
      title={title}
      columns={columns}
      facebook="lorem_ipsum_on_fb"
      twitter="lorem_ipsum_on_twitter"
      instagram="lorem_ipsum_live"
      copyright="Tunecommerce 2023"
      iconColor="black"
      backgroundColor="lightgrey"
      fontColor="black"
      copyrightColor="darkgrey"
    />
  );
};

export default Footer;
