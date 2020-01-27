import React, {Component} from "react";
import {storeProducts, detailProduct} from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cartProducts: [],
    isModalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = {...item};
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return {products: tempProducts};
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetails = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return {detailProduct: product};
    });
  };

  addToCart = id => {
    let tempProducts = [...this.state.products];
    let index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(() => {
      return {product: tempProducts, cartProducts: [...this.state.cartProducts, product]};
    });
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return {isModalOpen: true, modalProduct: product};
    });
  };

  closeModal = () => {
    this.setState({isModalOpen: false});
  };

  increment = id => {
    let tempProducts = [...this.state.cartProducts];
    let index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    let count = product.count + 1;
    product.count = count;
    product.total = product.total + product.price;
    this.setState(() => {
      return {cartProducts: tempProducts};
    });
  };

  decrement = id => {
    let tempProducts = [...this.state.cartProducts];
    let index = tempProducts.indexOf(this.getItem(id));
    let product = tempProducts[index];
    let count = product.count - 1;
    if (count > 0) {
      product.count = count;
      let diffPrice = product.total - product.price;
      product.total = diffPrice;
      this.setState(() => {
        return {cartProducts: tempProducts};
      });
    } else {
      this.removeItem(id);
    }
  };

  removeItem = id => {
    let tempProducts = [...this.state.cartProducts];
    tempProducts = tempProducts.filter(item => item.id !== id);
    this.setState(() => {
      return {cartProducts: tempProducts};
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetails: this.handleDetails,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
