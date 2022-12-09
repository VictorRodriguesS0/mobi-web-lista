import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListTitle extends Component {
  state = {};

  render() {
    const { title, style, className } = this.props;
    return (
      <h3 className={className+"font-montserrat"} style={{ color: 'white', ...style }}>
        {title}
      </h3>
    );
  }
}

ListTitle.defaultProps = {
  style: {},
  className: '',
};

ListTitle.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ListTitle;
