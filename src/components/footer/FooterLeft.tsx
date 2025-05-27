import Link from 'next/link';
import React from 'react';

function FooterLeft() {
  const footerLinks = [
    // {
    //   header: 'Help & Customer Care',
    //   links: [
    //     { label: 'Payment Terms', href: '/payment-terms' },
    //   ],
    // },
    {
      header: 'Customer Service',
      links: [
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'Warranty & Repairs Policy', href: '/warranty-&-repairs-policy' },
        { label: 'Shipping Policy', href: '/shipping-policy' },
        { label: 'Online Returns Policy', href: '/return-policy' },
        // { label: 'Terms And Conditions', href: '/terms-and-conditions' },
        { label: 'Payment Terms', href: '/payment-terms' },
        // { label: 'Privacy policy', href: '/privacy-policy' },

      ],
    },
    {
      header: 'Quick Links',
      links: [
        { label: 'My Account', href: '/my-account' },
        { label: 'Checkout', href: '/checkout' },
        { label: 'Cart', href: '/shopping-cart' },
        { label: 'Wishlist', href: '/wishlist' },
      ],
    },
  ];

  return (
    <div className=" ">
      <table className="min-w-full footerTable">
        <thead>
          <tr className='!border-none'>
            {footerLinks.map((section, index) => (
              <td key={index} className="py-2 px-2 md:px-4 text-[14px] !text-[white]  text-left rubik_semibold md:text-[16px] ">
                {section.header}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from(
            { length: Math.max(...footerLinks.map(section => section.links.length)) },
            (_, rowIndex) => (
              <tr className='!border-none' key={rowIndex}>
                {footerLinks.map((section, colIndex) => (
                  <td key={colIndex} className="py-1 px-2 !text-[white] md:px-4 text-left rubik_normal ">
                    {section.links[rowIndex] && (
                      <Link
                        href={section?.links[rowIndex].href}
                        className="md:text-[14px] rubik_regular text-[12px] hover:text-[#FDB514]"
                        aria-label={`Go to ${section.links[rowIndex].label}`}
                      >
                        {section.links[rowIndex].label}
                      </Link>
                    )}
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
      {/* <div className="sm:hidden grid grid-cols-2 justify-between gap-4 mt-6">
        {footerLinks.map((section, index) => (
          <div key={index} className="">
            <h3 className="text-[14px] lg:text-[16px] rubik_semibold mb-2">{section.header}</h3>
            <ul className="flex flex-col gap-1">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[14px] rubik_regular"
                    aria-label={`Go to ${link.label}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}

    </div>
  );
}

export default FooterLeft;
