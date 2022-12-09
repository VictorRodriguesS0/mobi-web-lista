import React, { Component } from "react";
import PropTypes from "prop-types";
import { colors } from "../styles/colors";

import iconHDRoxo from "../assets/icons/hd_purple.png";
import iconRAMRoxo from "../assets/icons/ram_purple.png";
import iconCorRoxo from "../assets/icons/cor_purple.png";

class ListItemDataGroup extends Component {
  state = {};

  render() {
    const { product, className, style } = this.props;
    return (
      <div className={`d-flex flex-row ${className}`} style={style}>
        {product.armazenamento && (
          <div style={{ width: "33%" }}>
            <img alt="Armazenamento" src={iconHDRoxo} style={{ height: 20 }} />
            <span
              style={{
                color: colors.roxoClaro,
                fontSize: 14,
                alignSelf: "center",
                margin: "0px 20px 0px 10px",
              }}
            >
              {product.armazenamento}
            </span>
          </div>
        )}

        {product.ram && (
          <div style={{ width: "33%" }}>
            <img alt="RAM" src={iconRAMRoxo} style={{ height: 20 }} />
            <span
              style={{
                color: colors.roxoClaro,
                fontSize: 14,
                alignSelf: "center",
                margin: "0px 20px 0px 10px",
              }}
            >
              {product.ram}
            </span>
          </div>
        )}

        {product.cor && (
          <div style={{ width: "33%" }}>
            <img alt="Armazenamento" src={iconCorRoxo} style={{ height: 20 }} />
            <span
              style={{
                color: colors.roxoClaro,
                fontSize: 14,
                alignSelf: "center",
                margin: "0px 20px 0px 10px",
              }}
            >
              {product.cor}
            </span>
          </div>
        )}
      </div>
    );
  }
}

ListItemDataGroup.defaultProps = {
  className: "",
  style: {},
};

ListItemDataGroup.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
};

export default ListItemDataGroup;
