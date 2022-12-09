import React, { Component } from "react";
import PropTypes from "prop-types";
import { isBrowser } from "react-device-detect";
import { colors } from "../../styles/colors";
import { moneyStringMask } from "../../helpers/utils";

class Parcela extends Component {
  state = {};

  render() {
    const { valor, numero } = this.props;
    return (
      <div className="btn-darken" style={{ backgroundColor: colors.roxo }}>
        <div className="d-flex flex-row justify-content-between align-content-center p-2 font-montserrat">
          <div className="d-flex flex-row">
            {numero === 0 ? (
              <span
                style={{
                  color: colors.textoClaro,
                  fontSize: isBrowser ? 27 : 20,
                }}
              >
                PIX ou Dinheiro
              </span>
            ) : (
              <>
                <span
                  className="mr-1 text-left"
                  style={{
                    color: colors.amarelo,
                    width: 50,
                    fontSize: isBrowser ? 25 : 20,
                    fontWeight: 800,
                  }}
                >
                  {`${numero}x`}
                </span>

                <span
                  style={{
                    color: colors.textoClaro,
                    fontSize: isBrowser ? 27 : 20,
                    alignSelf: "center",
                  }}
                >
                  {moneyStringMask(parseFloat(valor) / numero)}
                </span>
              </>
            )}
          </div>

          <span
            style={{ color: colors.amarelo, fontSize: isBrowser ? 27 : 20 }}
          >
            {moneyStringMask(parseFloat(valor))}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            borderTop: "solid 1px",
            borderColor: colors.roxoClaro,
          }}
        />
      </div>
    );
  }
}

Parcela.defaultProps = {};

Parcela.propTypes = {
  valor: PropTypes.number.isRequired,
  numero: PropTypes.number.isRequired,
};

export default Parcela;
