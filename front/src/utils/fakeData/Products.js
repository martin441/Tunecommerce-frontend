import React, { Component } from "react";

// Creamos el contexto
export const DataContext = React.createContext();

export class DataProvider extends Component {
  // Defino el estado
  state = {
    products: [
      {
        id: "1",
        title: "Controlador DJ Pioneer DDJ-200 negro de 2 canales",
        image:
          "https://http2.mlstatic.com/D_NQ_NP_635686-MLA43076856539_082020-O.webp",
        description: "Ideal para los que aman la mezcla",
        price: 96000,
        ranking: ["⭐", "⭐", "⭐", "⭐", "", "(46reviews)"],
        count: 1,
        category: "Category 1",
        stock: "5 unidades",
      },
      {
        id: "2",
        title: "Guitarra eléctrica Cort X Series X100 de meranti black cherry",
        image:
          "https://http2.mlstatic.com/D_NQ_NP_625922-MLA48678794814_122021-O.webp",
        description: "Haz musica con elegancia",
        price: 19000,
        ranking: ["⭐", "⭐", "⭐", "⭐", "⭐", "(29reviews)"],
        count: 1,
        category: "Category 2",
        stock: "5 unidades",
      },
      {
        id: "3",
        title:
          "Micrófono Behringer Ultravoice XM8500 dinámico  cardioide negro",
        image:
          "https://http2.mlstatic.com/D_NQ_NP_820287-MLA50293652880_062022-O.webp",
        description:
          "Recomendado para   voces,  grabaciones,  actuaciones,  instrumentos.",
        price: 15000,
        ranking: ["⭐", "⭐", "⭐", "⭐", "⭐", "(520reviews)"],
        count: 1,
        category: "Category 3",
        stock: "5 unidades",
      },
      {
        id: "4",
        title: "Auriculares AKG K52 matte black",
        image:
          "https://http2.mlstatic.com/D_NQ_NP_880229-MLA40185360474_122019-O.webp",
        description:
          "En la calle, en el colectivo o en la oficina, tené siempre a mano tus auriculares AKG ",
        price: 26000,
        ranking: ["⭐", "⭐", "⭐", "⭐", "⭐", "(19reviews)"],
        count: 1,
        category: "Category 4",
        stock: "5 unidades",
      },
      {
        id: "5",
        title: "Auriculares Gaming Stream Audio Technica Ath-102usb - Om",
        image:
          "https://http2.mlstatic.com/D_NQ_NP_826791-MLA49739578597_042022-O.webp",
        description:
          "no busque más que el ATH-102USB. Los auriculares estéreo permiten a los usuarios escuchar un audio limpio",
        price: 30000,
        ranking: ["⭐", "⭐", "⭐", "⭐", "⭐", "(92reviews)"],
        count: 1,
        category: "Category 5",
        stock: "5 unidades",
      },
      {
        id: "6",
        title: "Teclado musical Casio Mini SA-76 44 teclas negro/naranja",
        image:
          "https://http2.mlstatic.com/D_NQ_NP_885510-MLA46441280101_062021-O.webp",
        description:
          "cuando sea necesario para que tu instrumento suene siempre perfecto.",
        price: 37000,
        ranking: ["⭐", "⭐", "⭐", "⭐", "⭐", "(45reviews)"],
        count: 1,
        category: "Category 6",
        stock: "5 unidades",
      },
    ],
    cart: [], // Aquí guardaré los productos agregados al carrito
    total: 0, // Aquí se guardará el total de la compra
  };

  // funcion para agregar un producto al carrito
  addCart = (id) => {
    const { products, cart } = this.state;
    const check = cart.every((item) => {
      return item.id !== id;
    });
    if (check) {
      const data = products.filter((product) => {
        return product.id === id;
      });
      //console.log(data);
      this.setState({ cart: [...cart, ...data] });
    } else {
      alert("El producto ya está en el carrito.");
    }
  };

  // función para Disminuir la cantidad de un producto en el carrito
  reduction = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item.id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };

  // función para Aumentar la cantidad de un producto en el carrito
  increase = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item.id === id) {
        item.count += 1;
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };

  //función para remover un producto del carrito
  removeProduct = (id) => {
    if (window.confirm("Estas seguro de eliminar este producto del carrito?")) {
      const { cart } = this.state;
      cart.forEach((item, index) => {
        if (item.id === id) {
          cart.splice(index, 1);
        }
      });
      this.setState({ cart: cart });
      this.getTotal();
    }
  };

  // función para obtener el total de la compra
  getTotal = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    this.setState({ total: res });
  };

  // Se ejecuta después de cada actualización del componente
  // Guardo el carrito y el total en el almacenamiento local
  componentDidUpdate() {
    //convierto los objetos cart y total a cadenas JSON utilizando 
    //el método JSON.stringify() antes de almacenarlos en localStorage.
    localStorage.setItem("dataCart", JSON.stringify(this.state.cart));
    localStorage.setItem("dataTotal", JSON.stringify(this.state.total));
  }

  // Se ejecuta cuando el componente está montado
  // Obtengo el carrito y el total del almacenamiento local
  // y los establezco en el estado del componente
  componentDidMount() {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart !== null) {
      this.setState({ cart: dataCart });
    }
    const dataTotal = localStorage.getItem("dataTotal");
    if (dataTotal !== null && dataTotal !== undefined) {
      this.setState({ total: JSON.parse(dataTotal) });
    }
  }


  // Renderizo los componentes hijos
  render() {
    const { products, cart, total } = this.state;
    const { addCart, reduction, increase, removeProduct, getTotal } = this;

    return (

      // Paso los valores del estado y los métodos a los componentes hijos a través del Provider

      <DataContext.Provider
        value={{
          products,
          addCart,
          cart,
          reduction,
          increase,
          removeProduct,
          total,
          getTotal,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
