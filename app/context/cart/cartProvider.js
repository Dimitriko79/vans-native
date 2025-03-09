import React, {createContext, useCallback, useContext, useEffect, useReducer, useState} from 'react';
import {useLazyQuery, useMutation} from "@apollo/client";
import {CREATE_CART_MUTATION, GET_CART_DETAILS, GET_CUSTOMER_CART, MERGE_CARTS} from "../../components/cart/cart.gql";
import { cartReducer, initialState } from "./reducer/cartReducer";
import useUserContext from "../user/userProvider";

const CartContext = createContext(null);
const useCartProvider = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [miniCartIsOpen, setMiniCartIsOpen] = useState(false);
    const { cartId, isFetchingCart, shippingCustomerDetails } = state;
    const {isSignedIn} = useUserContext();


    const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
    const [mergeCarts] = useMutation(MERGE_CARTS);
    const [getCartDetailsQuery] = useLazyQuery(GET_CART_DETAILS);
    const [getCustomerCart] = useLazyQuery(GET_CUSTOMER_CART);

    const saveCartId = (id) => {
        if (!id) return;
        dispatch({ type: "SET_CART_ID", payload: id });
    };

    const getCartDetails = useCallback(async (cartId) => {
        if (!cartId) return;
        startFetchCart(true);

        try {
            const { data, error } = await getCartDetailsQuery({
                variables: { cartId },
                fetchPolicy: "no-cache",
                errorPolicy: "all"
            });
            if (data?.cart) {
                dispatch({ type: "SET_CART_DETAILS_SUCCESS", payload: data.cart });
                dispatch({ type: "SET_SHIPPING_CUSTOMER_DETAILS", payload: data.cart.shipping_addresses[0]});
            }
        } catch (error) {
            dispatch({ type: "FETCH_CART_ERROR", payload: error.message });
        } finally {
            startFetchCart(false);
        }
    }, [isFetchingCart, cartId, getCartDetailsQuery]);

    const createCart = async () => {
        try {
            const res = await fetchCartId();
            if (res?.data?.cartId) {
                saveCartId(res.data.cartId);
                await getCartDetails(res.data.cartId);
            }
        } catch (error) {
            dispatch({ type: "FETCH_CART_ERROR", payload: error.message });
        }
    };

    const startFetchCart = (payload) => {
        dispatch({ type: "FETCH_IS_FETCHING_CART", payload });
    };

    const retrieveCartId = async () => {
        const res = await getCustomerCart();

        return res?.data?.customerCart?.id;
    }

    useEffect(() => {
        createCart();
    }, [isSignedIn]);

    useEffect(() => {
        if (isFetchingCart && cartId) {
            getCartDetails(cartId);
        }
    }, [isFetchingCart, cartId]);

    return (
        <CartContext.Provider value={{ ...state, dispatch, getCartDetails, createCart, startFetchCart, retrieveCartId, mergeCarts, miniCartIsOpen, setMiniCartIsOpen, shippingCustomerDetails }}>
            {children}
        </CartContext.Provider>
    );
};

export default useCartProvider;