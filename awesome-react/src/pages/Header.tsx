import React from 'react';
import { useContext } from 'react';

import { AppContext } from '../context';

export const Header = () => {
  const state = useContext(AppContext);

  return (
    <header className="main">
      <label>🖥️</label>
      <button>
        Favs
        {state.favs.length > 0 && <span>{state.favs.length}</span>}
      </button>
    </header>
  );
};

export default Header;
