import React, { useEffect } from 'react';
import { colors } from '../styles/colors';
import { connectWithStore } from '../store';
import CategoryListItem from './CategoryListItem';


const ListCategory = (props) => {
  const {
    storeSetState, productSections, onCategoryClick, onMount,
  } = props;

  useEffect(() => {
    storeSetState({ backButtonFunction: null });
    onMount();
    // eslint-disable-next-line
  }, [storeSetState]);

  return (
    <div>
      <div
        style={{
          border: 'solid 1px',
          borderColor: colors.roxoEscuro,
          width: '100%',
          opacity: 0.5,
        }}
      />

      <CategoryListItem title="Todos os Produtos" onClick={() => onCategoryClick('all')} />

      {productSections.map((section, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <CategoryListItem title={section} onClick={() => onCategoryClick(section)} key={index} />
      ))}
    </div>
  );
};

ListCategory.defaultProps = {
  onCategoryClick: () => {},
  onMount: () => {},
};

export default connectWithStore(ListCategory);
