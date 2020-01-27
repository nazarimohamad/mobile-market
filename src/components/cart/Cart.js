import React, {Component} from "react";
import Title from "../Title";
import CartColumn from "./CartColumn";
import {ProductConsumer} from "../../Context";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";

export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
            const {cartProducts} = value;
            if (cartProducts.length > 0) {
              return (
                <>
                  <Title name="your" title="cart" />
                  <CartColumn />
                  <CartList value={value} />
                </>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}
