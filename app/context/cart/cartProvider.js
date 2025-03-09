import React, {createContext, useCallback, useContext, useEffect, useReducer} from 'react';
import {gql, useLazyQuery, useMutation} from "@apollo/client";
import { CREATE_CART_MUTATION, GET_CART_DETAILS } from "../../components/cart/cart.gql";
import { cartReducer, initialState } from "./reducer/cartReducer";
import useUserContext from "../user/userProvider";

const CartContext = createContext(null);
const useCartProvider = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const { cartId, isFetchingCart } = state;
    const {isSignedIn} = useUserContext();


    const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
    const [getCartDetailsQuery] = useLazyQuery(GET_CART_DETAILS);

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
                dispatch({ type: "GET_CART_DETAILS_SUCCESS", payload: data.cart });
            }
        } catch (error) {
            dispatch({ type: "FETCH_CART_ERROR", payload: error.message });
        } finally {
            startFetchCart(false);
        }
    }, [isFetchingCart, cartId, getCartDetailsQuery]);

    const createNewCart = async () => {
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

    useEffect(() => {
        createNewCart();
    }, [isSignedIn]);


    useEffect(() => {
        if (isFetchingCart && cartId) {
            getCartDetails(cartId);
        }
    }, [isFetchingCart, cartId]);


    return (
        <CartContext.Provider value={{ ...state, dispatch, getCartDetails, startFetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default useCartProvider;