import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {checkoutReducer, initialState} from "./reducer/checkoutReducer";
import useUserContext from "../user/userProvider";


const CheckoutContext = createContext(null);
const useCheckoutContext = () => useContext(CheckoutContext);

export const CheckoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(checkoutReducer, initialState);
    const { user } = useUserContext();
    const {shippingDetails} = state;

   useEffect(() => {
       if(user && user.addresses && user.addresses.length > 0) {
           let address = user.addresses
               .find(address => address.id === +user.default_shipping);

           if (address) {
               function parseStreet(pattern) {
                   if (!Array.isArray(pattern) || pattern.length === 0) {
                       return { street: '', building: '', apartment: '' };
                   }

                   const [street = '', building = '', apartment = ''] = pattern;

                   return { street, building, apartment };
               }

               const payload = {
                   email: user?.email,
                   firstname: user?.firstname,
                   lastname: user?.lastname,
                   city: address.city,
                   street: parseStreet(address.street).street,
                   building: parseStreet(address.street).building,
                   apartment: parseStreet(address.street).apartment,
                   telephone: address.telephone
               };
               dispatch({type: 'SET_SHIPPING_DETAILS', payload: payload})
           }
       } else {
           dispatch({type: 'SET_SHIPPING_DETAILS', payload: null})
       }
   }, [user]);

    return (
        <CheckoutContext.Provider value={{ ...state, shippingDetails, dispatch}}>
            {children}
        </CheckoutContext.Provider>
    );
};

export default useCheckoutContext;