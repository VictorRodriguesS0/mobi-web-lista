import React, { useState, useEffect } from "react";
import history from "history/browser";
import { isBrowser } from "react-device-detect";
import ListTitle from "../components/ListTitle";
import { colors } from "../styles/colors";
import { connectWithStore } from "../store";
import ListCategory from "../components/ListCategory";
import ListProduct from "../components/ListProduct";
import ListSearchResult from "../components/ListSearchResult";
import FloatingButtons from "../components/FloatingButtons";

const MainScreen = (props) => {
  const [selectedSection, setSelectedSection] = useState("");
  // A mudança de state abaixo "setSearchKey" serve pra forçar o disparo de update do componente
  // pra que chame a função routerRender e altere a exibição pro resultado de busca
  const [, setSearchKey] = useState("");
  const { updated, storeSetState } = props;
  const { pathname: path } = history.location;

  useEffect(() => {
    history.replace({ pathname: "/lista/", hash: "", search: "" });
  }, []);

  const handleCategoryPress = (sectionPressed) => {
    // Gerenciamento do conteúdo da tela
    setSelectedSection(sectionPressed);
    history.push({ pathname: "categoria/" });
    window.scrollTo(0, 0);

    // Gerenciamento do funcionamento do botão de voltar do header
    storeSetState({
      backButtonFunction: () => history.back(),
    });
  };

  const handleListTitle = () => {
    if (path.match("^\\/lista\\/search_result\\/?")) {
      return "Pesquisar produtos";
    }

    switch (selectedSection) {
      case "":
        return "Categorias";

      case "all":
        return "Todos os produtos";

      default:
        return selectedSection;
    }
  };

  const routerRender = () => {
    // Gambiarra feita pra lidar com as diferentes rotas e manipulação de histórico
    // Não me julga, Kalliu do futuro, você não fazia ideia de como resolver de outra forma <3

    if (path.match("^\\/lista\\/search_result\\/?")) {
      return <ListSearchResult />;
    }

    if (path.match("^\\/lista\\/?$")) {
      return (
        <ListCategory
          onCategoryClick={(sectionPressed) =>
            handleCategoryPress(sectionPressed)
          }
          onMount={() => setSelectedSection("")}
        />
      );
    }

    if (path.match("^\\/lista\\/categoria.*")) {
      return <ListProduct section={selectedSection} />;
    }
    window.location.href = "/lista/";
    return false;
  };

  return (
    <div style={{ paddingTop: 120 }}>
      <ListTitle className="mb-2" title={handleListTitle()} />

      <div className={isBrowser ? "container" : ""}>
        <div className="d-flex flex-row mb-3">
          <div
            style={{
              position: "absolute",
              alignSelf: "center",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
            }}
          >
            <span
              className="updated-list-date"
              style={{
                backgroundColor: colors.roxo,
                padding: 10,
              }}
            >
              Lista atualizada em: {updated}
            </span>
          </div>
          <div
            style={{ borderTop: "solid 1px white", width: "100%", margin: 20 }}
          />
        </div>

        {routerRender()}

        <FloatingButtons onSearchSubmit={setSearchKey} />
      </div>
    </div>
  );
};

export default connectWithStore(MainScreen);
