import React, { useState, useEffect, useCallback } from 'react';
import { Fade } from 'reactstrap';
import SearchEngine from './SearchEngine';
import WhatsAppButton from './WhatsAppButton';

let offset = 0;

const FloatingButtons = ({ onSearchSubmit }) => {
  const [viewButtons, setViewButtons] = useState(true);

  const handleScroll = useCallback(() => {
    const oldScroll = offset;
    const newScroll = window.scrollY;

    // Gambiarra pra resolver o bug que fechava a pesquisa ao scrollar
    if(window.location.href.match('#search')){
      return false;
    }

    if (oldScroll > newScroll) {
      if (!viewButtons) setViewButtons(true);
    } else if (oldScroll < newScroll) {
      if (viewButtons) setViewButtons(false);
    }

    offset = newScroll;
  }, [viewButtons]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <Fade in={viewButtons} unmountOnExit>
        <SearchEngine onSubmit={onSearchSubmit} />

        <WhatsAppButton />
      </Fade>
    </div>
  );
};

export default FloatingButtons;
