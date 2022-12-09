import React, { useEffect } from 'react';
import history from 'history/browser';
import { connectWithStore } from '../store';
import ProductListItem from './ProductListItem';
import { colors } from '../styles/colors';

const ListSearchResult = (props) => {
  const { productList, storeSetState } = props;

  useEffect(() => {
    storeSetState({
      backButtonFunction: () => history.back(),
    });
    window.scrollTo(0, 0);
  }, [storeSetState]);

  const searchQuery = history.location.search;
  let searchKey = '';
  if (searchQuery.includes('?key=')) {
    [, searchKey] = searchQuery.split('?key=');
  }

  searchKey = decodeURI(searchKey).toUpperCase();

  const searchResult = productList
    .filter((product) => {
      const pMARCA = product.marca.toUpperCase();
      const pDESCRICAO = product.descricao.toUpperCase();
      if (
        pMARCA.includes(searchKey)
        || pDESCRICAO.includes(searchKey)
      ) return true;

      return false;
    });

  return (
    <div>
      <h5>Exibindo resultados para {`"${searchKey}"`}</h5>
      {searchResult.length === 0
        ? (
          <p style={{ color: colors.roxoClaro }}>Nenhum resultado encontrado</p>
        )
        : searchResult
          .map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
    </div>
  );
};

export default connectWithStore(ListSearchResult);
