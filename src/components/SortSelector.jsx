import React, { useState } from 'react';
import { isBrowser } from 'react-device-detect';
import PropTypes from 'prop-types';
import { connectWithStore } from '../store';
import { colors } from '../styles/colors';

const SortSelector = (props) => {
  const { arrayToSort, onSortComplete, originalList } = props;
  const [, setSelectedValue] = useState(0);

  const selectHandler = (value) => {
    let sortedList = [...arrayToSort];
    switch (value) {
      case '1':
        sortedList = sortedList.sort((a, b) => (parseFloat(a.valor) - parseFloat(b.valor)));
        setSelectedValue(1);
        break;

      case '2':
        sortedList = sortedList.sort((a, b) => (-parseFloat(a.valor) + parseFloat(b.valor)));
        setSelectedValue(2);
        break;

      default:
        sortedList = [...originalList];
        setSelectedValue(0);
        break;
    }
    onSortComplete(sortedList);
  };

  return (
    <div className="d-flex flex-row-reverse mb-3">
      <select
        className="custom-select custom-select-sm"
        style={{
          width: isBrowser ? '30%' : '60%',
          backgroundColor: colors.roxo,
          borderColor: colors.roxoEscuro,
          color: colors.roxoClaro,
        }}
        onChangeCapture={(e) => selectHandler(e.target.value)}
        defaultValue={0}
      >
        <option value={0}>-</option>
        <option value={1}>Preço: crescente</option>
        <option value={2}>Preço: decrescente</option>
      </select>
      <span
        style={{
          color: colors.roxoClaro,
          marginRight: 10,
          alignSelf: 'center',
        }}
      >
          Ordernar por:
      </span>
    </div>
  );
};

SortSelector.propTypes = {
  arrayToSort: PropTypes.arrayOf(PropTypes.object).isRequired,
  originalList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSortComplete: PropTypes.func.isRequired,
};

export default connectWithStore(SortSelector);
