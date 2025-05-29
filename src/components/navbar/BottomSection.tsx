import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import DropDownButton from '../buttons/DropDownButton';
import TitleComponent from '@/app/product/[productTitle]/components/TitleComponent';
import strings from '@/utils/string';
import Image from 'next/image';
import Icon from '../includes/Icon';
import Menu from '../../../public/assets/icons/menu.svg';
import dropdownIcon from '../../../public/assets/icons/vector_black.svg';

import MenudropIcons from '../../../public/assets/icons/menudropIcons.svg';
import { cn } from '@/utils/utils';
// import useStore from '@/store/useStore';
import { useRouter } from 'next/navigation';
import HamburgerMenu from '../hamburger/HamburgerMenu';
import useZustandStore from '@/store/useStore';

function BottomSection() {
  const menuRef = useRef<HTMLDivElement>(null);
  const { accessToken, clearAccessToken } = useZustandStore();
  const isLoggedIn = Boolean(accessToken);
  const [isClient, setIsClient] = useState(false);
  const [navMenuActive, setNavMenuActive] = useState(false);

  const router = useRouter();
  const onClose = () => {
    setNavMenuActive(false);
  };
  // Ensure the component renders only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const logout = () => {
    clearAccessToken();
    router.push('/');
  };

  useEffect(() => {
    const html = document.documentElement;
    if (navMenuActive) {
      html.classList.add("modal-enabled");
    } else {
      html.classList.remove("modal-enabled");
    }

    return () => {
      html.classList.remove("modal-enabled");
    };
  }, [navMenuActive]);

  const links = [
    { label: 'Best Deals', href: '/best-deals' },
    { label: 'Trending', href: '/trending-products' },
    { label: 'New Releases', href: '/new-arrival' },

  ];



  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef?.current?.contains(event?.target)) {
        onClose(); // Call the onClose function when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose])

  return (
    <>
      {navMenuActive && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500"
          onClick={() => setNavMenuActive(false)}
        />
      )}

      <div
        ref={menuRef}
        className={cn(
          'fixed top-0 h-full w-[340px] sm:w-[400px]  bg-white m shadow-md z-50 overflow-hidden transition-all duration-500 ease-in-out',
          navMenuActive ? 'left-0' : '-left-[500px]'
        )}
      >
        <HamburgerMenu onClose={()=>setNavMenuActive(false)} navMenuActive={navMenuActive}/>
      </div>

      <div className="bg-white border-b border-[#C5CBD5] border-solid font-normal text-[16px] rubik_regular max-sm:hidden">
        <div className="navbarWrapper flex px-[48px] items-center">
          {/* Menu button */}
          <div>
            <button
              onClick={() => setNavMenuActive(!navMenuActive)}
              className="hover:opacity-[.7] flex flex-row items-center gap-1"
            >
              <div>
                <Icon src={Menu} alt="menuIcon" width={'24px'} height={'24px'} />
              </div>
              <TitleComponent
                title={strings.button.menu}
                titleClass="text-[16px] leading-[20px] max-[980px]:text-[13px]"
              />
              <div
                className={cn(
                  'transition-transform duration-300',
                  navMenuActive ? '-rotate-180' : 'rotate-0'
                )}
              >
                <Icon
                  src={MenudropIcons}
                  alt="menuIcon"
                  width={'24px'}
                  height={'24px'}
                />
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="mx-4">
            <TitleComponent title="|" titleClass="rubik_semibold text-xl " />
          </div>

          {/* Links */}
          <div className="h-[44px] w-full flex justify-between items-center gap-5">
            <div className="flex gap-6">
              {links?.map((link, index) => (
                <Link
                  className="hover:opacity-[.7] text-base leading-5 rubik_regular max-[980px]:text-[13px]"
                  key={index}
                  href={link?.href}
                >
                  {link.label}
                </Link>
              ))}


              <div className="relative group">
                <div className="flex  gap-1 hover:opacity-[.7]  leading-5 rubik_regular max-[980px]:text-[13px] cursor-pointer">
                  <h5 className="hover:opacity-[.7] text-base leading-5 rubik_regular max-[980px]:text-[13px]">
                    Powered by
                  </h5>
                  <div className="transform transition-transform duration-300 group-hover:rotate-180">
                    <Icon
                      src={dropdownIcon}
                      alt="dropdown icon"
                      width={'12px'}
                      height={'12px'}
                    />
                  </div>
                </div>

                {/* First-level dropdown */}
                <div className="absolute top-[18px] left-0 bg-white shadow-md mt-2 rounded-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity z-50 min-w-[180px]">
                  <Link
                    href="/powered-by-msi"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Powered by MSI
                  </Link>

                  <div className="relative group/submenu">
                    <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 text-sm w-full cursor-pointer">
                      <Link href="/powered-by-asus" className="w-full">Powered by ASUS</Link>

                      {/* Dropdown Icon for Powered by ASUS */}
                      <div className="transform transition-transform duration-300 group-hover/submenu:rotate-180">
                        <Icon
                          src={dropdownIcon}
                          alt="dropdown icon"
                          width={'12px'}
                          height={'12px'}
                        />
                      </div>
                    </div>

                    {/* Submenu for Powered by ASUS */}
                    <div className="absolute top-0 left-full bg-white shadow-md rounded-md opacity-0 group-hover/submenu:opacity-100 group-hover/submenu:visible invisible transition-opacity z-50 min-w-[200px]">
                      <Link
                        href="/powered-by-asus/powered-by-content-creation"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        Content Creation
                      </Link>
                      <Link
                        href="/powered-by-asus/powered-by-asus-gaming"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        Gaming PC
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Powered by Dropdown */}



          {/* Conditionally render logout button only after client-side rendering */}
          {/* {isClient && isLoggedIn && (
            <button onClick={logout} className="hover:opacity-[.7] text-red-500 max-[980px]:text-[13px]">
              Logout
            </button>
          )} */}
        </div>
      </div>
    </>
  );
}

export default BottomSection;
