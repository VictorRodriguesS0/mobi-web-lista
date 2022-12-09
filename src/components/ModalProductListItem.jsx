import React, { Component } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import PropTypes from "prop-types";
import { colors } from "../styles/colors";
import { moneyStringMask, sliceStringBiggerThan } from "../helpers/utils";

import iconHDBlack from "../assets/icons/hd_black.png";
import iconRAMBlack from "../assets/icons/ram_black.png";
import iconCorBlack from "../assets/icons/cor_black.png";

class ModalProductListItem extends Component {
  state = {};

  render() {
    const { product, modalToggle, onClickParcelamento } = this.props;
    return (
      <>
        <BrowserView renderWithFragment>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={modalToggle}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div
            tabIndex="0"
            role="button"
            onClick={() => window.open(product.linkFoto, "_blank")}
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <img
              alt="Foto do produto"
              src={product.linkFoto}
              style={{ height: 300, objectFit: "scale-down" }}
            />
          </div>
        </BrowserView>

        <MobileView renderWithFragment>
          <div
            tabIndex="0"
            role="button"
            onClick={() => window.open(product.linkFoto, "_blank")}
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <img
              alt="Foto do produto"
              src={product.linkFoto}
              style={{ height: "50vmin", objectFit: "scale-down" }}
            />
          </div>
        </MobileView>

        <div className="d-flex flex-column w-100">
          <span style={{ color: colors.roxo }}>{product.marca}</span>

          <div
            className="d-flex flex-row justify-content-between font-montserrat"
            style={{
              color: colors.roxo,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            <div style={{ width: "60%" }}>
              {sliceStringBiggerThan(product.descricao, 50)}
            </div>

            <div>{moneyStringMask(product.valor)}</div>
          </div>

          <div className="d-flex flex-row mt-3">
            {product.armazenamento && (
              <>
                <img
                  alt="armazenamento"
                  src={iconHDBlack}
                  style={{ height: 20 }}
                />
                <span
                  style={{
                    color: colors.roxoEscuro,
                    fontSize: 14,
                    alignSelf: "center",
                    margin: "0px 20px 0px 10px",
                  }}
                >
                  {product.armazenamento}
                </span>
              </>
            )}

            {product.ram && (
              <>
                <img alt="RAM" src={iconRAMBlack} style={{ height: 20 }} />
                <span
                  style={{
                    color: colors.roxoEscuro,
                    fontSize: 14,
                    alignSelf: "center",
                    margin: "0px 20px 0px 10px",
                  }}
                >
                  {product.ram}
                </span>
              </>
            )}

            {product.cor && (
              <>
                <img
                  alt="armazenamento"
                  src={iconCorBlack}
                  style={{ height: 20 }}
                />
                <span
                  style={{
                    color: colors.roxoEscuro,
                    fontSize: 14,
                    alignSelf: "center",
                    margin: "0px 20px 0px 10px",
                  }}
                >
                  {product.cor}
                </span>
              </>
            )}
          </div>
        </div>
        {/* <button
          type="button"
          className="custom-button btn-lighten btn-block mt-2"
          style={{
            backgroundColor: colors.roxo,
            color: 'white',
            padding: 10,
            borderRadius: 5,
          }}
          onClick={onClickParcelamento}
        >
          Ver parcelamento
        </button> */}
      </>
    );
  }
}

ModalProductListItem.defaultProps = {
  modalToggle: () => {},
  onClickParcelamento: () => {},
};

ModalProductListItem.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  modalToggle: PropTypes.func,
  onClickParcelamento: PropTypes.func,
};

export default ModalProductListItem;
