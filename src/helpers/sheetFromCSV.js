const fetch = require("node-fetch");
const XLSX = require("xlsx");

const getInfo = async () => {
  var url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQdb836GVwctOap9fvJQCYdJSVW1gom-JV7eNqEeb7tFSHF0sy58CcWgkBwrM4s0khWwLEFM2B-uIPv/pub?output=xlsx";
  return fetch(url)
    .then((res) => {
      /* get the data as a Blob */
      if (!res.ok) throw new Error("fetch failed");
      return res.arrayBuffer();
    })
    .then((ab) => {
      /* parse the data when it is received */
      var data = new Uint8Array(ab);
      var workbook = XLSX.read(data, { type: "array" });

      /* DO SOMETHING WITH workbook HERE */
      return xlsxResultToJSON(workbook);
    })
    .catch((e) => {
      console.error("Ocorreu um erro ao baixar os dados da lista", e);
    });
};

const xlsxResultToJSON = function to_json(workbook) {
  let result = {};
  workbook.SheetNames.forEach(function (sheetName) {
    const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1,
    });
    if (roa.length) result[sheetName] = roa;
  });
  return JSON.stringify(result, 2, 2);
};

const transformDatasetIntoJSON = (list) => {
  if (!list || list.length === 0) return null;

  const keys = list[0];
  const elements = list.slice(1);

  const finalArray = elements.map((element) => {
    if (!element.find((e) => e !== null)) return null;

    const result = {};
    for (let i = 0; i <= keys.length; i += 1) {
      if (i === keys.length) break;
      Object.assign(result, { [keys[i]]: element[i] });
    }

    return result;
  });

  return finalArray.filter((e) => e !== null);
};

const handleProductList = (productList) => {
  // Função repsonsável por manipulações de dados na lista de produtos
  // como filtros e alterações eventuais de valores

  let filteredList = productList
    // Removendo produtos inativos
    .filter((product) => product.inativo !== true)
    // Removendo produtos que não possuem as chaves de descrição ou valor
    .filter((product) => product.descricao && product.valor);

  // Exceção para casos onde o produto não tenha marca
  filteredList = filteredList.map((product) => {
    if (!product.marca) {
      return {
        ...product,
        marca: "-",
      };
    }
    return product;
  });

  return filteredList;
};

export default async () => {
  return getInfo().then((infos) => {
    const json = JSON.parse(infos);
    const arrayProdutos = transformDatasetIntoJSON(json["1 Produtos"]);
    const listaAtualizadaEm = arrayProdutos[0].listaAtualizadaEm;
    const arrayTaxas = transformDatasetIntoJSON(json["2 Taxas"]);
    const arrayLinks = transformDatasetIntoJSON(json["3 Links externos"]);

    const result = {
      productList: handleProductList(arrayProdutos),
      updateDate: listaAtualizadaEm,
      taxes: arrayTaxas,
      links: arrayLinks,
    };

    return result;
  });
};
