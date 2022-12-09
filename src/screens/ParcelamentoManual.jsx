import React, { useCallback, useEffect, useState } from "react";
import { colors } from "../styles/colors";
import { isBrowser } from "react-device-detect";
import { connectWithStore } from "../store";
import { TextInputMask, MaskService } from "tp-react-web-masked-text";
import Parcela from "../components/parcelamentos/Parcela";
import SheetLoading from "../components/SheetLoading";
import ListHeader from "../components/ListHeader";

const ParcelamentoManual = ({ taxas }) => {
  const [taxasArray, setTaxasArray] = useState([]);
  const [appLoading, setAppLoading] = useState(true);
  const [value, setValue] = useState(0);

  const organizeTaxes = useCallback(() => {
    const entries = Object.entries(taxas);
    const organizedArray = [];

    if (!taxas) return false;

    entries.map((item) => {
      if (item.find((i) => String(i).includes("parcela"))) {
        organizedArray.push(item[1]);
      }
      return false;
    });
    setTaxasArray(organizedArray);
    return true;
  }, [taxas]);

  useEffect(() => {
    if (!appLoading) {
      organizeTaxes();
    }
  }, [organizeTaxes, appLoading]);

  if (appLoading) {
    return <SheetLoading onLoadFinish={() => setAppLoading(false)} />;
  }

  return (
    <>
      <ListHeader
        disableInfoButton
        backButtonFunction={() => {
          window.location.href = "/lista";
        }}
      />
      <div
        className="container"
        style={{
          backgroundColor: colors.roxo,
          color: "white",
          padding: 20,
          marginTop: 75,
        }}
      >
        <h3 className="text-center">Parcelamentos</h3>

        <div
          className="font-montserrat"
          style={{
            backgroundColor: colors.roxo,
            border: "2px solid " + colors.roxoEscuro,
            borderRadius: 10,
            padding: 10,
            flexDirection: "row",
            textAlign: "left",
          }}
        >
          <span style={{ color: colors.roxoClaro }}>Valor: R$ </span>
          <TextInputMask
            kind="money"
            className="parcelamento-input"
            style={{
              backgroundColor: colors.roxo,
              color: colors.roxoClaro,
              width: isBrowser ? "90%" : null,
              flexGrow: 1,
            }}
            onChange={(input) => {
              const rawValue = MaskService.toRawValue("money", input);
              if (rawValue <= 999999) {
                setValue(rawValue);
              }
            }}
            options={{
              unit: "",
            }}
            value={value}
          />
        </div>

        <div
          style={{
            borderTop: "1px solid " + colors.roxoEscuro,
            marginTop: 20,
          }}
        />

        <div className="pb-4">
          {/* Débito a vista */}
          <Parcela valor={value} numero={0} />

          {/* Demais parcelas */}
          {taxasArray.map((item, index) => {
            const taxaFloat = parseFloat(item);
            return (
              <Parcela
                numero={index + 1}
                valor={value + value * taxaFloat}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default connectWithStore(ParcelamentoManual);
