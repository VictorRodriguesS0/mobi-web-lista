import React, { useState } from "react";
import PropTypes from "prop-types";
import { isBrowser } from "react-device-detect";
import Modal from "reactstrap/lib/Modal";
import history from "history/browser";
import { connectWithStore } from "../store";
import { colors } from "../styles/colors";

import logoLojinha from "../assets/logoLojinha.png";
import logoLojinhaBranco from "../assets/logoLojinhaBranco.png";

const ListHeader = ({ backButtonFunction, disableInfoButton }) => {
  const [infoModal, setInfoModal] = useState(false);

  return (
    <div
      id="Teste"
      style={{
        position: "fixed",
        top: 0,
        height: 100,
        width: "100%",
        alignSelf: "center",
        backgroundColor: colors.roxo,
        zIndex: 1,
      }}
    >
      <div
        style={{ alignItems: "center" }}
        className={`d-flex flex-row justify-content-between ${
          isBrowser && "container"
        }`}
      >
        <div style={{ width: 70, padding: 10 }}>
          {backButtonFunction && (
            <button
              type="button"
              style={{
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
                alignSelf: "center",
                justifyContent: "center",
              }}
              className="flex-row d-flex custom-button"
              onClick={backButtonFunction}
            >
              <i
                style={{ alignSelf: "center" }}
                className="fas fa-chevron-left mr-2"
              />
              {isBrowser && (
                <span
                  style={{
                    alignSelf: "center",
                    color: colors.roxoClaro,
                    paddingTop: 3,
                  }}
                >
                  Voltar
                </span>
              )}
            </button>
          )}
        </div>

        <div
          role="button"
          className="custom-button"
          tabIndex={0}
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.location.href = "/lista";
          }}
        >
          <img
            src={logoLojinha}
            style={{ height: 100 }}
            alt="Mobi Eletronicos"
          />
        </div>

        <div style={{ width: 70, padding: 10, minHeight: 75 }}>
          {disableInfoButton === false && (
            <button
              type="button"
              className="custom-button"
              onClick={() => setInfoModal(true)}
            >
              <i
                className="fas fa-info-circle p-3"
                style={{ color: "white", fontSize: 23 }}
              />
            </button>
          )}
        </div>

        <Modal
          toggle={() => setInfoModal(!infoModal)}
          isOpen={infoModal}
          size="md"
          onOpened={() => {
            history.push("#info");
            const unlisten = history.listen(() => {
              setInfoModal(false);
              unlisten();
            });
          }}
          onClosed={() => {
            if (history.location.hash.includes("#info")) {
              history.back();
            }
          }}
        >
          <div
            className="text-center p-4"
            style={{
              backgroundColor: colors.roxo,
              color: "white",
            }}
          >
            <img
              src={logoLojinhaBranco}
              style={{ height: 50 }}
              alt="MOBI Eletronicos"
            />
            <div
              style={{ borderTop: "2px solid" + colors.roxoEscuro }}
              className="my-2"
            />
            Esta é a lista de produtos em atacado da MOBI Eletrônicos
            <br />
            <br />
            Bloco D Loja 341/342
            <br />
            <br />
            Valores para pagamento à vista, dinheiro, transferência ou PIX.
            <br />
            <br />
            Os valores e produtos disponíveis poderão ser alterados a qualquer
            momento sem aviso prévio.
            <div
              style={{ borderTop: "2px solid" + colors.roxoEscuro }}
              className="my-2"
            />
            {/* <button
              type="button"
              onClick={() => {
                window.location.href = "/calculadora";
              }}
              className="custom-button btn-darken"
              style={{
                color: colors.roxoClaro,
                backgroundColor: colors.roxoEscuro,
                borderRadius: 10,
                padding: "10px 20px",
              }}
            >
              <i className="fas fa-calculator mr-2" />
              <span
                className="font-montserrat"
                style={{ fontWeight: "normal" }}
              >
                Parcelamentos
              </span>
            </button> */}
          </div>
        </Modal>
      </div>
    </div>
  );
};

ListHeader.defaultProps = {
  backButtonFunction: null,
  disableInfoButton: false,
};

ListHeader.propTypes = {
  backButtonFunction: PropTypes.func,
  disableInfoButton: PropTypes.bool,
};

export default connectWithStore(ListHeader);
