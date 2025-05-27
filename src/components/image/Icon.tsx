import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/utils';

// Icons
import VectorDown from '../../../public/assets/icons/vector_down.svg';
import VectorBlack from '../../../public/assets/icons/vector_black.svg';
import Flag from '../../../public/assets/icons/flag.svg';
import Cart from '../../../public/assets/icons/cart.svg';
import Profile from '../../../public/assets/icons/profile.svg';
import Search from '../../../public/assets/icons/search.svg';
import FreeDelivery from '../../../public/assets/icons/free_delivery.svg' ;
import SafePayment from '../../../public/assets/icons/safe_payment.svg' ;
import HelpCenter from '../../../public/assets/icons/help_center.svg' ;
import ReturnMoney from '../../../public/assets/icons/return_money.svg' ;
import Service from '../../../public/assets/icons/service.svg' ;
import StarYellow from '../../../public/assets/icons/star_yellow.svg' ;
import StarGray from '../../../public/assets/icons/star_gray.svg' ;
import ProfileIcon from '../../../public/assets/icons/profile_pic.svg' ;
import LikeButton from '../../../public/assets/icons/like_button.svg' ;
import Delivery from '../../../public/assets/icons/Delivery.svg';
import Dots from  '../../../public/assets/icons/dots.svg';
import CloseIcon from  '../../../public/assets/icons/close_icon.svg';


import DisLikeButton from '../../../public/assets/icons/dislike_button.svg' ;
import DollarIcon from '../../../public/assets/icons/dollar_icon.svg' ;




// temp  
import MasterCard from '../../../public/temp/mastercard.svg' ;





const icons = {
  vector_down: VectorDown,
  flag: Flag,
  cart: Cart,
  profile: Profile, 
  search: Search,
  vector_black: VectorBlack,
  free_delivery: FreeDelivery,
  safe_payment: SafePayment,
  help_center: HelpCenter,
  return_money: ReturnMoney,
  service: Service,
  masterCard: MasterCard,
  star_yellow: StarYellow,
  star_gray: StarGray,
  profile_icon : ProfileIcon,
  like_button: LikeButton,
  dislike_button: DisLikeButton,
  dollar_icon : DollarIcon,
  delivery:Delivery,
  dots:Dots,
  close_icon:CloseIcon,

};

type IconKeys = keyof typeof icons;

interface IconProps {
  icon: IconKeys;
  width?: any;
  height?: any;
  className?: string;
  customClasses?: string;
}

export const getIcon = ({
  icon,

  className = '',

}: IconProps) => {
  const IconComponent = icons[icon];

  if (!IconComponent) return null;

  return (
    <Image
      src={IconComponent}
      width={100}
      height={100}
      className={cn(
        `h-6 w-6`,
        className
      )}
      loading="lazy" 
      alt={icon.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} // Alt text transformation
    />
  );
};

// Example Usage:
// {getIcon({ icon: 'vector_down', className: 'text-blue-500' })}


 // Define the icons array to allow future updates
//  const icons = [
//   { icon: 'flag', className: 'w-[32px]' },
//   { icon: 'flag', className: 'w-[32px]' },
//   { icon: 'flag', className: 'w-[32px]' },
//   { icon: 'flag', className: 'w-[32px]' },
//   { icon: 'flag', className: 'w-[32px]' },

// ];
// {icons.map((iconData:any, index) => (
//   <div key={index}>
//       {getIcon(iconData)}
//   </div>
// ))}