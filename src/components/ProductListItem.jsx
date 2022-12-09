import React, { useState } from 'react';
import history from 'history/browser';
import { isMobile } from 'react-device-detect';
import { Modal } from 'reactstrap';
import { colors } from '../styles/colors';
import { moneyStringMask, sliceStringBiggerThan } from '../helpers/utils';
import ModalProductListItem from './ModalProductListItem';
import ListItemDataGroup from './ListItemDataGroup';
import ModalParcelamento from './parcelamentos/ModalParcelamento';

const ProductListItem = (props) => {
  const [productModal, setProductModal] = useState(false);
  const [parcelamentoModal, setParcelamentoModal] = useState(null);
  const { product } = props;

  return (
    <>
      <Modal
        isOpen={productModal}
        toggle={() => setProductModal(!productModal)}
        onOpened={() => {
          history.push('#foto');
          const unlisten = history.listen(() => {
            setProductModal(false);
            unlisten();
          });
        }}
        onClosed={() => {
          if (history.location.hash.includes('#foto')) {
            history.back();
          }
        }}
      >
        <div style={{
          backgroundColor: '#eeeeee', padding: 10, alignItems: 'center', justifyContent: 'center',
        }}
        >
          <ModalProductListItem
            product={product}
            modalToggle={() => setProductModal(false)}
            onClickParcelamento={() => {
              setProductModal(false);
              setParcelamentoModal(true);
            }}
          />
        </div>
      </Modal>

      <Modal
        isOpen={parcelamentoModal}
        toggle={() => setParcelamentoModal(!parcelamentoModal)}
        onOpened={() => {
          history.push('#parcelamento');
          const unlisten = history.listen(() => {
            setParcelamentoModal(false);
            unlisten();
          });
        }}
        onClosed={() => {
          if (history.location.hash.includes('#parcelamento')) {
            history.back();
          }
        }}
      >
        <ModalParcelamento product={product} onClose={() => setParcelamentoModal(false)} />
      </Modal>

      <div
        role="button"
        onClick={() => setProductModal(true)}
        className="d-flex flex-column w-100 custom-button product-list-item px-2"
        tabIndex={product.id}
      >
        {isMobile ? (
        // Visão Mobile
          <>
            <div className="d-flex flex-row justify-content-between mt-2">
              <div className="d-flex flex-column">
                <span
                  className="font-montserrat"
                  style={{
                    textAlign: 'left',
                    width: 160,
                  }}
                >
                  {sliceStringBiggerThan(product.descricao, 50)}
                </span>

                <span style={{ textAlign: 'left', fontSize: 14, color: colors.roxoClaro }}>
                  {product.marca}
                </span>
              </div>

              <span style={{ color: colors.amarelo, fontSize: '20px', textAlign: 'right' }}>
                {moneyStringMask(product.valor)}
              </span>
            </div>

            <ListItemDataGroup product={product} className="my-3 text-left" />
          </>
        ) : (
        // Visão Desktop
          <div className="d-flex flex-row justify-content-between">
            <div style={{ textAlign: 'left', width: '40%' }}>
              <span style={{ color: colors.roxoClaro }}>
                {`[${product.marca}] - `}
              </span>
              <span className="font-montserrat">
                {product.descricao}
              </span>
            </div>

            <ListItemDataGroup product={product} className="flex-fill" style={{ textAlign: 'left', width: '40%' }} />

            <span style={{
              color: colors.amarelo, fontSize: '20px', textAlign: 'right', width: '20%',
            }}
            >
              {moneyStringMask(product.valor)}
            </span>
          </div>
        )}

        <div
          style={{
            border: 'solid 1px',
            borderColor: colors.roxoEscuro,
          }}
          className="w-100"
        />
      </div>
    </>
  );
};

ProductListItem.defaultProps = {
  product: {},
};

export default ProductListItem;
