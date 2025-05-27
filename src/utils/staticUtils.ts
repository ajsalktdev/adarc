import strings from '@/utils/string';
import Solution from '../../public/assets/icons/solution.svg'
import Computer from '../../public/assets/icons/computer.svg'
import Gaming from '../../public/assets/icons/gaming.svg'
import Keyboard from '../../public/assets/icons/keyboard.svg'
import Networking from '../../public/assets/icons/networking.svg'
import Security from '../../public/assets/icons/security.svg'
import Software from '../../public/assets/icons/software.svg'
import Storage from '../../public/assets/icons/storage.svg'
import ShoppingBag from '../../public/assets/icons/shoppingBag.svg'
import Cart from '../../public/assets/icons/cart.svg'
import Profile from '../../public/assets/icons/profile.svg'
import Profile_black from '../../public/assets/icons/profile_icon_black.svg'
import myOrder_black from '../../public/assets/icons/my_orders_icon.svg'
import manage_address from '../../public/assets/icons/manage_address.svg'
import review_ratings from '../../public/assets/icons/ratings_black.svg'
import my_wishlist from '../../public/assets/icons/wish_list_black.svg'








export const aboutProduct = [
    { title: 'Product details' },
    { title: 'Specifications' }


]

export const navBarMiddle = [
    { icon: Profile, label: strings.navmiddlesection.my_account, route: '/my-account' },
    { icon: ShoppingBag, label: strings.navmiddlesection.wishlist, route: '/my-account/wishlist' },
    { icon: Cart, label: strings.navmiddlesection.cart, route: '/cartPage' },
]

export const navMenu = [

    {
        "icon": Storage,
        "title": strings.bannernavsection.component_storage,
        megaMenu: [
            {
                title: "Core Component's",
                data: [
                    ' CPUs/Processors',
                    'Memory',
                    'Motherboards',
                    'Video / Graphics Cards',
                    'Computer Cases',
                    'Fans & PC Cooling',
                    'Power Supplies',
                    'Sound Cards',
                    'Server Components',
                ]

            },
            {
                title: "Accessories",
                data: [
                    'Power Protection(UPS)',
                    'Cables',
                    'Adapters',
                    'Gender Changers',
                    'KVM Switches',
                    'Hubs',
                    'Computer Accessories',
                ]
            },
            {
                title: "Storage Devices",
                data: [
                    'Hard Drives',
                    'SSDs',
                    'USB Flash Drives',
                    'NAS',
                    'Memory Cards',
                    'SAS Drives',
                ]
            },
        ]
    },
    {
        "icon": Computer,
        "title": strings.bannernavsection.shop_by_category,
        megaMenu: [
            {
                title: "Desktop Computers",
                data: [
                    'Servers',
                    'Workstations',
                    'AIO Computers',
                    'Branded PC / Office PC',
                ]

            },
            {
                title: "Laptops",
                data: [
                    'Gaming Laptops',
                    'Chromebooks',
                ]
            },
            {
                title: "Peripherals",
                data: [
                    'Monitors',
                    'Keyboards & Mice',
                    'Headsets',
                    'Speakers',
                    'Soundcards',
                    'Wireless Headsets',
                    'Headsets & Video Conferencing',
                    'Bluetooth speaker',
                    'Bluetooth Headset',
                    'Conference Speaker',
                    'Graphic Tablets',
                ]
            },
            {
                title: 'Mini PC',
                data: [
                    'NUC'
                ]

            }
        ]
    },
    {
        "icon": Keyboard
        , "title": strings.bannernavsection.computer_peripherals,
        megaMenu: [
            {
                title: "Gaming PCs",
                data: [
                    'Powered by ASUS',
                    'Powered By MSI',
                    'Sofa',
                ]

            },
            {
                title: "Gaming Consoles",
            },
            {
                title: 'Gaming Headsets',
                data: [
                    'Headphone'
                ]
            },
            {
                title: "Game Controllers",
            },
            {
                title: "Gaming Mouse",
            },
            {
                title: "Gaming Chairs",
            },
            {
                title: "Gaming Desks",
            },
            {
                title: "VR Headset",
            },
            {
                title: "Gaming ATX Cases",
            },
            {
                title: "Nanotech",
            },
            {
                title: "Gaming Table",
            },
        ]

    },
    {
        "icon": Gaming,
        "title": strings.bannernavsection.gaming
    },
    {
        "icon": Networking,
        "title": strings.bannernavsection.networking
    },
    {
        "icon": Software,
        "title": strings.bannernavsection.software
    },
    {
        "icon": Security,
        "title": strings.bannernavsection.officesolution
    },
    {
        "icon": Solution,
        "title": strings.bannernavsection.officesolution
    },
]


export const accountMenu = [
    {
        title: 'ACCOUNT SETTINGS',
        items: [
            {
                id: 1,
                icon: Profile_black,
                title: 'Profile Information',
                route: '/my-account/my-profile'
            },
            {
                id: 2,
                icon: myOrder_black,
                title: 'My Orders',
                route: '/my-account/my-orders'
            },
            {
                id: 3,
                icon: manage_address,
                title: 'Manage Addresses',
                route: '/my-account/manage-addresses'
            },
        ]
    },
    {
        title: 'My Stuff',
        items: [
            {
                id: 4,
                icon: review_ratings,
                title: 'My Reviews & Ratings',
                route: '/my-account/my-reviews'
            },
          
            {
                id: 6,
                icon: my_wishlist,
                title: 'My Wishlist',
                route: '/my-account/wishlist'
            },
        ]
    }
]


export const resetPassword = [
    {
      id: "1",
      label: "New Password",
      placeHolder: "Enter new Password",
      errorMessage : 'check password',
      name : 'newPassword',
      type : 'password',
      len : 30
  
    },
    {
      id: "2",
      label: "Confirm Password",
      placeHolder: " Confirm new Password",
      errorMessage : 'check your last Name',
      name : 'confirmNewPassword',
      type : 'password',
      len : 30
  
  
  
  
    },
  ]
  export const verifyPasswordData = [
    'Must be 7 - 16 Characters',
    'Cannot contain spaces or . , - | \ / = _',
    'Must contain at least one uppercase',
    'Must contain at least one lowercase',
    'Must contain at least one numeric'
  ]