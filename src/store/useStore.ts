// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import Cookies from 'js-cookie';

// interface UserState {
//   deliveryLocation:string
//   accessToken: string | null;
//   userInfo: {
//     username: string;
//     email: string;
//     first_name: string;
//   } | null;
//   language: string;
//   setAccessToken: (token: string | null) => void;
//   setUserInfo: (info: { username: string; email: string; first_name: string } | null) => void;
//   setLanguage: (newLanguage: string) => void;
//   setDeliveryLocation: (newDeliverylocation: string) => void;
//   clearAccessToken: () => void; // Added to interface
// }

// const useStore = create<UserState>()(
//   persist(
//     (set) => ({
//       deliveryLocation : Cookies.get('deliverylocation') || 'Abu Dhabi',
//       setDeliveryLocation : (newDeliverylocation)=>{
//         set({deliveryLocation: newDeliverylocation});
//         Cookies.set('deliverylocation', newDeliverylocation, { expires: 365 });



//       },
//       accessToken: Cookies.get('accessToken') || null,
//       userInfo: null,
//       language: Cookies.get('language') || 'en',

//       setAccessToken: (token) => {
//         set({ accessToken: token });
//         if (token) {
//           Cookies.set('accessToken', token, { expires: 365 });
//         } else {
//           Cookies.remove('accessToken');
//         }
//       },

//       setUserInfo: (info) => set({ userInfo: info }),

//       setLanguage: (newLanguage) => {
//         set({ language: newLanguage });
//         Cookies.set('language', newLanguage, { expires: 365 });
//       },

//       clearAccessToken: () => {
//         Cookies.remove('accessToken');
//         Cookies.remove('language');
//         set({ accessToken: null, userInfo: null, language: 'en',deliveryLocation :'Abu Dhabi' }); // Resetting state
//       },
//     }),
//     { name: 'user-storage' }
//   )
// );

// export default useStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

const useZustandStore = create(
  persist<any>(
    (set) => ({
      wishlist: [],
      isSelectedItems:[],
      setSelectedItems: (newSelectedItems:any) => {
        set({isSelectedItems:newSelectedItems})
      },
      
      cartlist : [],
      cartAmountDetails:{},
      setCartAmountDetails:(newCartAmountDetails:any)=>{
        set({cartAmountDetails:newCartAmountDetails});
      },
      setCartlist :(newCartlist:any)=>{
        set({cartlist:newCartlist});

      },
      setWishlist :(newWishlist:any)=>{
        set({wishlist:newWishlist});

      },
      // deliveryLocation: 'Abu Dhabi',
      // setDeliveryLocation: (newLocation: string) => {
      //   set({ deliveryLocation: newLocation });
      // },
        deliveryLocation: {
          id: 1,
          title: 'Abu Dhabi',
          deliveryTime: 1,
        },
        setDeliveryLocation: (newLocation:any) => set({ deliveryLocation: newLocation }),
      language: 'en',
      setLanguage: (newLanguage: string) => {
        set({ language: newLanguage });
      },
      userInfo: {
        username: '',
        email: '',
        first_name: '',
      },
      accessToken: Cookies.get('accessToken') || '', // Initialize from cookies
      setAccessToken: (token: string) => {
        set({ accessToken: token });
        if (token) {
          Cookies.set('accessToken', token, { expires: 365 }); // Set token in cookies
        } else {
          Cookies.remove('accessToken'); // Remove token from cookies
        }
      },
      refreshToken: Cookies.get('refreshToken') || '', // Initialize from cookies
      setRefreshToken: (token: string) => {
        set({ refreshToken: token });
        if (token) {
          Cookies.set('refreshToken', token, { expires: 365 }); // Set token in cookies
        } else {
          Cookies.remove('refreshToken'); // Remove token from cookies
        }
      },
      setUserInfo: (newUserInfo: any) => {
        set((state: any) => ({
          userInfo: {
            ...state.userInfo,
            ...newUserInfo,
          },
        }));
      },
      clearAccessToken: () => {
        console.log("clearclear");
        
                Cookies.remove('accessToken');
                Cookies.remove('language');
                set({ accessToken: null, userInfo: null, language: 'en',deliveryLocation :{
                  id: 1,
                  title: 'Abu Dhabi',
                  deliveryTime: 1,
                },
                wishlist:[],
                cartAmountDetails:{},
                cartlist:[] }); 
              },
    }),
    {
      name: 'app_data',
      partialize: (state) => ({
        deliveryLocation: state?.deliveryLocation,
        language: state?.language,
        wishlist : state?.wishlist,
        cartlist : state?.cartlist,
        cartAmountDetails : state?.cartAmountDetails,
        userInfo:state?.userInfo
      }),
      migrate: (persistedState:any, version) => {
        // Rehydrate tokens from cookies on app load
        return {
          ...persistedState,
          accessToken: Cookies.get('accessToken') || '',
          refreshToken: Cookies.get('refreshToken') || '',
        };
      },
    }
  )
);

export default useZustandStore;
