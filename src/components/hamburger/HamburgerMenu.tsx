import React from 'react';
import FirstMenu from './FirstMenu';

const HamburgerMenu = ({onClose, navMenuActive }:any) => {
 

  return (
    <div className="hamburger-menu h-full no-scrollbar">
      <FirstMenu onClose={onClose} navMenuActive={navMenuActive}/>
    </div>
  );
};

export default HamburgerMenu;
