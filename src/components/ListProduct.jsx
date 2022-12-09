import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connectWithStore } from '../store';
import { colors } from '../styles/colors';
import GalleryView from './GalleryView';
import ListView from './ListView';


import iconGallery from '../assets/icons/galeria.png';

const ListProduct = (props) => {
  const { productList, section } = props;
  const sectionFilteredList = productList
    .filter((product) => (section === 'all' ? true : product.categoria === section));

  const [viewMode, setViewMode] = useState('list');

  if (!section || section === '') {
    window.location.href = '/lista';
  }

  return (
    <div>
      <div className="my-3 d-flex flex-row justify-content-around">
        <button
          type="button"
          className="custom-button btn-darken"
          style={{
            backgroundColor: viewMode === 'list' ? colors.roxoEscuro : 'transparent',
            border: '2px solid',
            borderColor: colors.roxoEscuro,
            borderRadius: 5,
            fontSize: 20,
            color: 'white',
            padding: '5px 20px 5px 20px',
          }}
          onClick={() => setViewMode('list')}
        >
          <i
            className="fas fa-stream mr-2"
            style={{ fontSize: 17 }}
          />
            Lista
        </button>

        <button
          type="button"
          className="custom-button btn-darken"
          style={{
            backgroundColor: viewMode === 'gallery' ? colors.roxoEscuro : 'transparent',
            border: '2px solid',
            borderColor: colors.roxoEscuro,
            borderRadius: 5,
            fontSize: 20,
            color: 'white',
            padding: '5px 20px 5px 20px',
          }}
          onClick={() => setViewMode('gallery')}
        >
          <img
            alt=""
            src={iconGallery}
            style={{ height: 20, marginBottom: 3 }}
            className="mr-2"
          />
            Galeria
        </button>
      </div>

      {viewMode === 'list' && (
        <ListView sectionFilteredList={sectionFilteredList} />
      )}
      {viewMode === 'gallery' && (
        <GalleryView sectionFilteredList={sectionFilteredList} />
      )}

    </div>
  );
};

ListProduct.defaultProps = {};

ListProduct.propTypes = {
  section: PropTypes.string.isRequired,

  // Store
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connectWithStore(ListProduct);
