import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {useMutation} from "@apollo/client";
import {useAwaitQuery} from "./useAwaitQuery";
import {CART_DETAILS_QUERY, CREATE_CART_MUTATION} from "../components/cart/cart.gql";


const CartContext = createContext('');
export const useCartProvider = () => useContext(CartContext)

export const CartContextProvider = props => {
    const {children } = props;
    const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
    const fetchCartDetails = useAwaitQuery(CART_DETAILS_QUERY);

    const [cartId, setCartId] = useState(null);


    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetchCartId();

                if(res && res.data){
                    const result = await fetchCartDetails({variables: {cartId: res.data.cartId}});
                    setCartId(result?.data?.cart?.id)
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchDetails();

    }, [ fetchCartDetails, fetchCartId]);


    return (
        <CartContext.Provider value={{ cartId }}>
            {children}
        </CartContext.Provider>
    );
};
