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
    this.setState(
      () => {
        return {
          product: tempProducts,
          cartProducts: [...this.state.cartProducts, product],
        };
      },
      () => {
        this.addTotal();
      }
    );
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
    let tempCart = [...this.state.cartProducts];
    let selectedProduct = tempCart.find(item => item.id === id);

    let index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return {cartProducts: [...tempCart]};
      },
      () => {
        this.addTotal();
      }
    );
  };

  decrement = id => {
    let tempProducts = [...this.state.cartProducts];
    let index = tempProducts.indexOf(this.getItem(id));
    let product = tempProducts[index];
    let count = product.count - 1;
    if (count === 0) {
      this.removeItem(id);
    } else {
      product.count = count;
      let diffPrice = product.total - product.price;
      product.total = diffPrice;
      this.setState(
        () => {
          return {cartProducts: tempProducts};
        },
        () => {
          this.addTotal();
        }
      );
    }
  };

  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cartProducts];
    tempCart = tempCart.filter(item => item.id !== id);
    let index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    this.setState(
      () => {
        return {cartProducts: [...tempCart], products: [...tempProducts]};
      },
      () => {
        this.addTotal();
      }
    );
  };

  clearCart = () => {
    this.setState(
      () => {
        return {cartProducts: []};
      },
      () => {
        this.setProducts();
        this.addTotal();
      }
    );
  };

  addTotal = () => {
    let subTotal = 0;
    this.state.cartProducts.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      };
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
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
