import getJson from "../helpers/sheetFromCSV";

let errorStrike = 0;

const showError = () => {
  window.alert("Ops!", "Ocorreu um erro ao atualizar os dados da lista.");
  errorStrike = 0;
};

export const getData = async () => {
  // Função responsável por buscar os dados da planilha

  // Caso ocorra qualquer erro ao buscar, a função tenta por si só por mais 2 vezes
  // até que finalmente retorna um erro para ser exibido para o usuário
  try {
    return getJson();
  } catch (e) {
    if (errorStrike === 2) {
      showError();
      return new Error(e)
    }
    errorStrike += 1;
    getData();
  };
};

export const getProductsCategory = (productList) => {
  const categories = [];
  let actualCategory = "";

  productList.map((item) => {
    if (
      actualCategory !== item.categoria &&
      (item.inativo === "FALSE" || !item.inativo) &&
      item.categoria &&
      item.categoria.length > 1
    ) {
      categories.push(item.categoria);
      actualCategory = item.categoria;
    }
    return true;
  });
  return categories;
};
