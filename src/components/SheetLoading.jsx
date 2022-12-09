import React, { useEffect, useState, useCallback } from "react";
import { Spinner } from "reactstrap";
import { getData, getProductsCategory } from "../api/sheet";
import { connectWithStore } from "../store";
import { colors } from "../styles/colors";

import logoLojinha from "../assets/logoLojinha.png";

const SheetLoading = (props) => {
  const [error, setError] = useState(false);
  const { storeSetState, onLoadFinish } = props;

  const loadAsync = useCallback(async () => {
    setError(false);
    try {
      const listData = await getData();

      storeSetState({
        productList: listData.productList,
        updated: listData.updateDate,
        productSections: getProductsCategory(listData.productList),
        taxas: listData.taxes[0],
      });

      onLoadFinish();
    } catch (e) {
      setError(true);
    }
  }, [onLoadFinish, storeSetState]);

  useEffect(() => {
    loadAsync();
  }, [loadAsync]);

  return (
    <div
      style={{
        paddingTop: "40vh",
      }}
    >
      <img
        src={logoLojinha}
        style={{ height: "20vmin" }}
        alt="Origem Shop"
      />

      {error ? (
        <div>
          <p className="m-3" style={{ color: colors.amarelo }}>
            Houve um erro ao carregar a lista de produtos.
            <br />
            <br />
            Deseja tentar novamente?
          </p>
          <button
            type="button"
            className="btn"
            style={{
              backgroundColor: colors.roxoEscuro,
              color: "white",
            }}
            onClick={loadAsync}
          >
            Tentar novamente
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column mt-4">
          <Spinner
            color="white"
            style={{ alignSelf: "center" }}
            className="mb-3"
          />
          <span style={{ color: "white" }}>
            Carregando informações da lista...
          </span>
        </div>
      )}
    </div>
  );
};

export default connectWithStore(SheetLoading);
