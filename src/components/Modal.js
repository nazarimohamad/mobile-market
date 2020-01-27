import React, {Component} from "react";
import styled from "styled-components";
import {ProductConsumer} from "../Context";
import {Link} from "react-router-dom";
import {ButtonContainer} from "./Button";

export default class Modal extends Component {
  render() {
    // if(!isModalOpen) {
    //   return null
    // } else {
    return (
      <ProductConsumer>
        {value => {
          const isModalOpen = value.isModalOpen;
          const {id, img, title, price} = value.detailProduct;
          if (!isModalOpen) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="container">
                  <div className="row">
                    <div className="card col-8 mx-auto col-md-6 col-lg-4" id="modal">
                      <img src={img} alt={title} className="card-image img-fluid" />
                      <h2>{title}</h2>
                      <h4>price: ${price}</h4>
                      <Link to="/">
                        <ButtonContainer onClick={value.closeModal}>
                          Go To Store
                        </ButtonContainer>
                      </Link>
                      <Link to="/cart">
                        <ButtonContainer
                          cart
                          onClick={() => {
                            value.closeModal();
                          }}
                        >
                          continue shopping
                        </ButtonContainer>
                      </Link>
                    </div>
                  </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
    // }
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // color: var(--mainWhite);
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  #modal {
  }
`;
