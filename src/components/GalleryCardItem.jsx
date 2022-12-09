import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "reactstrap";
import history from "history/browser";
import { colors } from "../styles/colors";
import { moneyStringMask, sliceStringBiggerThan } from "../helpers/utils";
import ModalParcelamento from "./parcelamentos/ModalParcelamento";

import iconHDBlack from "../assets/icons/hd_black.png";
import iconRAMBlack from "../assets/icons/ram_black.png";
import iconCorBlack from "../assets/icons/cor_black.png";

const GalleryCardItem = ({ product, style, className }) => {
  const [photoError, setPhotoError] = useState(false);
  const [parcelamentoModal, setParcelamentoModal] = useState(false);

  return (
    <div
      className={`my-3 p-2 d-flex flex-column ${className}`}
      style={{
        width: 370,
        height: 470,
        backgroundColor: "#eeeeee",
        borderRadius: 10,
        ...style,
      }}
    >
      <div
        tabIndex="0"
        role="button"
        onClick={() => window.open(product.linkFoto, "_blank")}
        style={{
          width: "100%",
          backgroundColor: "white",
          cursor: "pointer",
          height: 350,
          padding: 5,
          overflow: "hidden",
        }}
      >
        {product.linkFoto && !photoError ? (
          <img
            alt="Foto do produto"
            src={product.linkFoto}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "scale-down",
            }}
            onError={() => setPhotoError(true)}
            onLoad={() => setPhotoError(false)}
          />
        ) : (
          <div
            className="d-flex flex-column justify-content-center h-100"
            style={{ color: "lightgrey" }}
          >
            <i className="fas fa-camera" style={{ fontSize: 40 }} />
            <span>Sem Foto</span>
          </div>
        )}
      </div>

      <div className="d-flex flex-column w-100 text-left">
        <span style={{ color: colors.roxo }}>{product.marca}</span>

        <div
          className="d-flex flex-row justify-content-between font-montserrat"
          style={{
            color: colors.roxo,
            fontWeight: "bold",
            fontSize: 17,
          }}
        >
          <div style={{ width: "60%" }}>
            {sliceStringBiggerThan(product.descricao, 50)}
          </div>

          <div>{moneyStringMask(product.valor)}</div>
        </div>

        <div className="d-flex flex-row mt-3">
          {product.armazenamento && product.armazenamento.length && (
            <>
              <img
                alt="armazenamento"
                src={iconHDBlack}
                style={{ height: 20 }}
              />
              <span
                style={{
                  color: colors.cinza,
                  fontSize: 14,
                  alignSelf: "center",
                  margin: "0px 20px 0px 10px",
                }}
              >
                {product.armazenamento}
              </span>
            </>
          )}

          {product.ram && product.ram.length && (
            <>
              <img alt="RAM" src={iconRAMBlack} style={{ height: 20 }} />
              <span
                style={{
                  color: colors.cinza,
                  fontSize: 14,
                  alignSelf: "center",
                  margin: "0px 20px 0px 10px",
                }}
              >
                {product.ram}
              </span>
            </>
          )}

          {product.color && product.color.length && (
            <>
              <img
                alt="ProductColor"
                src={iconCorBlack}
                style={{ height: 20 }}
              />
              <span
                style={{
                  color: colors.cinza,
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

      {/* <div className="d-flex" style={{ marginTop: 10 }}>
        <button
          type="button"
          className="custom-button btn-lighten btn-block p-2 mt-auto"
          style={{ backgroundColor: colors.roxoEscuro, color: colors.amarelo, borderRadius: 5 }}
          onClick={() => setParcelamentoModal(true)}
        >
            Ver Parcelamento
        </button>
      </div> */}

      <Modal
        isOpen={parcelamentoModal}
        toggle={() => setParcelamentoModal(!parcelamentoModal)}
        onOpened={() => {
          history.push("#parcelamento");
          const unlisten = history.listen(() => {
            setParcelamentoModal(false);
            unlisten();
          });
        }}
        onClosed={() => {
          if (history.location.hash.includes("#parcelamento")) {
            history.back();
          }
        }}
      >
        <ModalParcelamento
          product={product}
          onClose={() => setParcelamentoModal(false)}
        />
      </Modal>
    </div>
  );
};

GalleryCardItem.defaultProps = {
  style: {},
  className: "",
};

GalleryCardItem.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
};

export default GalleryCardItem;
