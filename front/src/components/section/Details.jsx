import React, { Component } from "react";
import { DataContext } from "../../utils/fakeData/Products.js";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import "../css/Detail.css";

export class Details extends Component {
  static contextType = DataContext;

  state = {
    product: [],
  };

  getProduct = () => {
    if (this.props.match.params.id) {
      const res = this.context.products;
      const data = res.filter((item) => {
        return item.id === this.props.match.params.id;
      });
      // console.log(data);
      this.setState({ product: data });
    }
  };

  componentDidMount() {
    this.getProduct();
  }

  render() {
    // console.log(this.props);
    // console.log(this.props.match.params.id);

    // console.log(this.context.products);

    const { product } = this.state;
    const { addCart } = this.context;

    return (
      <>
        <Navbar />
        <div class="details-container">
          {product.map((item) => (
            <div className="details" key={item.id}>
              <img src={item.image} alt="" />
              <div className="box">
                <div className="row">
                  <h2>{item.title}</h2>
                  <span>${item.price}</span>
                </div>
                <p>{item.ranking}</p>
                <p>{item.description}</p>
                <Link
                  to="/cart"
                  className="cart"
                  onClick={() => addCart(item.id)}
                >
                  Add to cart
                </Link>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Details;
