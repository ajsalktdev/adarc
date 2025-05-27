import React, { useEffect, useState } from 'react';
import VectorIcon from '../../../public/assets/icons/vector_black.svg'
import fetchApiData from '@/config/fetch-api-data';
import Icon from '../includes/Icon';
import { cn } from '@/utils/utils';
import MegaMenu from '../banner-section/MegaMenu';
import FirstMenu from './FirstMenu';

const HamburgerMenu = ({onClose}:any) => {
 

  return (
    <div className="hamburger-menu h-full no-scrollbar">
      <FirstMenu onClose={onClose}/>
    </div>
  );
};

export default HamburgerMenu;
