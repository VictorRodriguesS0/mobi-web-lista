import React, { Component } from "react";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import ListItemDataGroup from "../ListItemDataGroup";
import { colors } from "../../styles/colors";
import { connectWithStore } from "../../store";
import Parcela from "./Parcela";

import logo from "../../assets/logoLojinhaBranco.png";

class ModalParcelamento extends Component {
  state = {
    taxasArray: [],
    valorProduto: 0,
  };

  componentDidMount() {
    const { taxas, product } = this.props;
    this.organizeTaxas(taxas);
    this.setState({ valorProduto: parseFloat(product.valor) });
  }

  organizeTaxas = (taxas) => {
    const entries = Object.entries(taxas);
    const taxasArray = [];

    if (!taxas) return false;

    entries.map((item) => {
      if (item.find((i) => String(i).includes("parcela"))) {
        taxasArray.push(item[1]);
      }
      return false;
    });
    this.setState({ taxasArray });
    return true;
  };

  render() {
    const { product, onClose } = this.props;
    const { taxasArray, valorProduto } = this.state;
    return (
      <div
        style={{
          backgroundColor: colors.roxo,
          alignContent: "center",
          padding: 10,
        }}
      >
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <div className="text-center m-3">
          <span
            className="font-montserrat"
            style={{
              fontSize: 27,
              color: "white",
            }}
          >
            {product.descricao}
          </span>
          <ListItemDataGroup product={product} />
        </div>

        <div>
          <div className="d-flex flex-column justify-content-center mb-3" />

          <div
            style={{
              width: "100%",
              borderTop: "solid 1px",
              borderColor: colors.roxoClaro,
            }}
          />

          <div className="pb-4">
            {/* Débito a vista */}
            <Parcela valor={valorProduto} numero={0} />

            {/* Demais parcelas */}
            {taxasArray.map((item, index) => {
              const taxaFloat = parseFloat(item);
              return (
                <Parcela
                  numero={index + 1}
                  valor={valorProduto + valorProduto * taxaFloat}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                />
              );
            })}
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <img
            src={logo}
            style={{ height: 35, opacity: 0.5 }}
            alt="Mobi Eletronicos"
          />
        </div>

        {isMobile && (
          <div className="d-flex justify-content-center mt-4">
            <button
              type="button"
              className="custom-button btn-block"
              style={{
                backgroundColor: colors.roxoEscuro,
                color: colors.roxoClaro,
                padding: 5,
                borderRadius: 5,
              }}
              onClick={onClose}
            >
              Voltar
            </button>
          </div>
        )}
      </div>
    );
  }
}

ModalParcelamento.defaultProps = {
  onClose: () => {},
};

ModalParcelamento.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func,

  // Store
  taxas: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connectWithStore(ModalParcelamento);
