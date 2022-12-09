import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { connectWithStore } from '../store';
import GalleryCardItem from './GalleryCardItem';
import { colors } from '../styles/colors';
import SortSelector from './SortSelector';

const PAGE_LENGTH = 10;

const GalleryView = (props) => {
  const { sectionFilteredList } = props;

  // Array com todos os produtos, organizados em páginas (arrays) de 10
  // [ [pagina1] [pagina2] [paginaX] ]
  const [fullPaginatedList, setFullPaginatedList] = useState([]);
  // Array contendo os produtos que estão sendo exibidos no momento
  // [ {elemento1}, {elemento2} {elementoX} ]
  const [showingProductsList, setShowingProductsList] = useState([]);
  // Último índice de fullPaginatedList concatenado em showingProductsList
  const [page, setPage] = useState(0);

  const paginateElements = (list) => {
    const paginatedList = [];
    let buffer = [];

    // Separando em arrays de 10 em 10 produtos.
    list.forEach((element, index) => {
      // Caso o índice do elemento não seja um múltiplo de 10, o elemento entra no buffer
      buffer.push(element);
      if ((index + 1) % PAGE_LENGTH === 0) {
        paginatedList.push([...buffer]);
        buffer = [];
      }
    });

    // Caso ainda reste elementos no buffer, agrupa em um último array de elementos
    if (buffer.length > 0) {
      paginatedList.push([...buffer]);
    }

    return paginatedList;
  };

  useEffect(() => {
    // Criando a paginação e associando aos states
    const paginatedList = paginateElements(sectionFilteredList);

    // Mostra os primeiros 10 elementos apenas no estado inicial, ou seja
    // quando o componente é montado
    if (showingProductsList.length === 0) {
      setShowingProductsList(paginatedList[0]);
    }

    setFullPaginatedList(paginatedList);
  }, [sectionFilteredList, showingProductsList]);

  const appendProducts = () => {
    // Função do botão de ver mais que adiciona a próxima página à lista que está sendo exibida
    const newList = showingProductsList.concat([...fullPaginatedList[page + 1]]);
    setShowingProductsList(newList);
    setPage(page + 1);
  };

  const loadMoreItemsButton = () => {
    if (fullPaginatedList.length !== page + 1) {
      return (
        <button
          type="button"
          onClick={appendProducts}
          className="custom-button btn-darken btn-block my-3"
          style={{
            backgroundColor: colors.roxoEscuro,
            color: 'white',
            padding: 5,
            borderRadius: 10,
          }}
        >
          Ver Mais
        </button>
      );
    }

    return false;
  };

  if (isMobile) {
    return (
      <div>
        <SortSelector
          originalList={sectionFilteredList}
          arrayToSort={sectionFilteredList.flat()}
          onSortComplete={(sortedList) => {
            const fullPaginatedSortedList = paginateElements(sortedList);
            setFullPaginatedList(fullPaginatedSortedList);
            setShowingProductsList(fullPaginatedSortedList[0]);
            setPage(0);
          }}
        />
        {showingProductsList
          .map((product) => (
            <GalleryCardItem
              style={{
                width: '100%',
              }}
              product={product}
              key={product.id}
            />
          ))}
        {loadMoreItemsButton()}
      </div>
    );
  }

  return (
    <div>
      <SortSelector
        originalList={sectionFilteredList}
        arrayToSort={sectionFilteredList.flat()}
        onSortComplete={(sortedList) => {
          const fullPaginatedSortedList = paginateElements(sortedList);
          setFullPaginatedList(fullPaginatedSortedList);
          setShowingProductsList(fullPaginatedSortedList[0]);
          setPage(0);
        }}
      />

      <div className="d-flex flex-row justify-content-around">
        <div>
          {showingProductsList
            .filter((product, index) => index % 2 === 0)
            .map((product) => (
              <GalleryCardItem product={product} key={product.id} />
            ))}
        </div>

        <div>
          {showingProductsList
            .filter((product, index) => index % 2 === 1)
            .map((product) => (
              <GalleryCardItem product={product} key={product.id} />
            ))}
        </div>
      </div>

      {loadMoreItemsButton()}
    </div>
  );
};

GalleryView.defaultProps = {};

GalleryView.propTypes = {
  sectionFilteredList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connectWithStore(GalleryView);
