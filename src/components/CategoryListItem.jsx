import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../styles/colors';

class CategoryListItem extends Component {
  state = {};

  render() {
    const { onClick, title } = this.props;
    return (
      <div>
        <button
          type="button"
          className="custom-button"
          style={{
            width: '100%',
          }}
          onClick={onClick}
        >
          <div className="d-flex flex-row justify-content-center category-menu p-3">
            <span style={{ color: colors.amarelo, fontWeight: 'bold' }}>
              {title}
            </span>
            <i className="fas fa-chevron-right" style={{ alignSelf: 'center', color: 'white' }} />
          </div>
          <div
            style={{
              border: 'solid 1px', borderColor: colors.roxoEscuro, width: '100%', opacity: 0.5,
            }}
          />
        </button>
      </div>
    );
  }
}

CategoryListItem.defaultProps = {
  onClick: () => {},
};

CategoryListItem.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default CategoryListItem;
