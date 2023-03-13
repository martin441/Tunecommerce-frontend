import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../carusel/ImageSilder.jsx";
import "../css/Products.css"; // importo el archivo de estilos CSS
//import Footer from "../footer/Footer.jsx";
import Navbar from "../navbar/Navbar.jsx"; // importo la navbar

const Products = () => {
  const products = [
    {
      name: "Guitarra Criolla clásica Fonseca para diestros",
      description:
        "Está diseñada para aficionados y profesionales. Con este instrumento descubrirás nuevos acordes, entonarás tus canciones y disfrutarás de la vida musical. La tapa de abeto genera un tono brillante y claro, incluso en los registros más agudos.",
      price: 90503,
      image: [
        "https://http2.mlstatic.com/D_NQ_NP_938847-MLA46740504634_072021-O.webp",
        "https://http2.mlstatic.com/D_NQ_NP_679109-MLA46740426975_072021-O.webp",
        "https://http2.mlstatic.com/D_NQ_NP_631154-MLA46740504569_072021-O.webp",
      ],
      stock: 15,
      ranking: [3, 2, 5, 4, 4, 1, 5, 4, 3],
    },

    {
      name: "Guitarra Acústica para diestros",
      description:
        "Las cuerdas de metal se caracterizan por su bajo estiramiento y resistencia a la corrosión y abrasión. Son más duraderas, sólidas y generan un sonido brillante y claro.",
      price: 78657,
      image: [
        "https://http2.mlstatic.com/D_NQ_NP_938847-MLA46740504634_072021-O.webp",
        "https://http2.mlstatic.com/D_NQ_NP_679109-MLA46740426975_072021-O.webp",
        "https://http2.mlstatic.com/D_NQ_NP_631154-MLA46740504569_072021-O.webp",
      ],
      stock: 8,
      ranking: [5, 2, 5, 1, 2, 1, 3, 2, 4],
    },
  ];

  return (
    <>
      <h1>Hola</h1>
      <Navbar />
    </>
    // <div>
    //   <br />
    //   <br />
    //   <br />
    //   <br />
    //   <ImageSlider />
    //   <div>
    //     <h2>Productos Populares:</h2>
    //   </div>
    //   <div id="product" className="card-container">
    //     {/* mapeo los productos para crear un card por cada uno */}
    //     {products.map((product) => (
    //       <div className="card" key={product.id}>
    //         {/* agrego un enlace para que al hacer click en la imagen o el título, se redirija a la página de detalles del producto */}
    //         <Link to={`/product/${product.id}`}>
    //           <img src={product.image} alt="" />
    //         </Link>
    //         <div className="content">
    //           <h3>
    //             {/* agrego un enlace para que al hacer click en el título, se redirija a la página de detalles del producto */}
    //             <Link to={`/product/${product.id}`}>{product.name}</Link>
    //           </h3>
    //           <span>${product.price}</span>
    //           <p>{product.description}</p>
    //           {/* <button onClick={() => addCart(product.id)}>
    //               Add to cart
    //             </button> */}

    //           {/* agrego un botón para agregar el producto al carrito de compras */}
    //           <button onClick={() => this.context.addCart(product.id)}>
    //             Add to cart
    //           </button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   {/* <Footer /> */}
    // </div>
  );
};

export default Products;
