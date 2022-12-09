import React, { useState } from 'react';
import { Input } from 'reactstrap';
import Fade from 'react-reveal/Fade';
import { isBrowser } from 'react-device-detect';
import history from 'history/browser';
import LupaSvg from '../assets/icons/search';
import Chevron from '../assets/icons/chevron';
import { colors } from '../styles/colors';

const SearchEngine = ({ onSubmit }) => {
  const [searchBar, setSearchBar] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSearchButton = () => {
    let unlisten;
    if (!searchBar) {
      // Fluxo comum
      history.push('#search');
      setSearchBar(true);

      unlisten = history.listen(() => {
        // Quando usuário aperta Voltar no navegador
        setSearchBar(false);
        unlisten();
      });
      return true;
    }

    // Quando o usuário apertou ">"
    setSearchBar(false);
    if (unlisten) unlisten();

    // Quando o usuário não digitou nada e apertou ">"
    if (!inputValue || inputValue.length === 0) {
      history.back();
      return false;
    }

    // Usuário digitou na pesquisa e apertou ">" (Pesquisa válida)
    if (history.location.hash.includes('#search')) {
      history.replace({
        hash: '',
        pathname: '/lista/search_result',
        search: `?key=${inputValue}`,
      });
    }
    onSubmit(inputValue);
    setInputValue('');
    window.scrollTo(0, 0);
    return true;
  };

  const backdropClickHandler = () => {
    // Quando o usuário cancela clicando no backdrop
    setSearchBar(false);
    if (history.location.hash.includes('#search')) {
      history.back();
    }
  };

  return (
    <>
      <Fade when={searchBar} delay={200}>
        {searchBar && (
          <div
            aria-label="backdrop"
            tabIndex={0}
            role="button"
            onClick={backdropClickHandler}
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
            }}
          />
        )}
      </Fade>
      <div
        className="floating-button row"
        style={{
          right: isBrowser ? 'calc(50vw - 500px)' : 40,
          alignItems: 'center',
        }}
      >
        <Fade
          right
          when={searchBar}
          delay={100}
        >
          {searchBar && (
            <div
              style={{
                marginRight: 20,
                width: isBrowser ? 800 : '70vw',
              }}
            >
              <Input
                placeholder="Pesquisar produtos"
                className="floating-shadow"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => (e.which === 13 ? handleSearchButton() : false)}
                autoFocus
                type="search"
              />
            </div>
          )}
        </Fade>
        <button
          type="button"
          className="custom-button zoom-hover floating-shadow"
          style={{
            backgroundColor: colors.amarelo,
            borderRadius: '100%',
            height: 50,
            width: 50,
          }}
          onClick={handleSearchButton}
        >
          {searchBar
            ? Chevron({ color: colors.roxoEscuro, height: 30, transform: 'rotate(-90)' })
            : LupaSvg({ color: colors.roxoEscuro, height: 25 })}
        </button>
      </div>
    </>
  );
};

SearchEngine.defaultProps = {
  onSubmit: () => {},
};

export default SearchEngine;
