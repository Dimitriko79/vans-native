import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {useLazyQuery, useMutation} from "@apollo/client";
import { CREATE_CART_MUTATION, GET_CART_DETAILS } from "../../components/cart/cart.gql";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cartReducer, initialState } from "./reducer/cartReducer";

const CartContext = createContext(null);
const useCartProvider = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const {isFetchingCart} = state;
    const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
    const [getCartDetailsQuery] = useLazyQuery(GET_CART_DETAILS);

    const saveCartId = async (id) => {
        if (!id) return;
        try {
            await AsyncStorage.setItem("cartId", id);
        } catch (error) {
            console.error("Error saving cartId:", error);
        }
    };

    const getCartId = async () => {
        try {
            const data = await AsyncStorage.getItem("cartId");
            return data || null;
        } catch (error) {
            console.error("Error getting cartId:", error);
            return null;
        }
    };

    const removeCartId = async () => {
        try {
            await AsyncStorage.removeItem("cartId");
            dispatch({ type: 'REMOVE_CART_ID' });
        } catch (error) {
            console.error("Error removing cartId:", error);
        }
    };

    const getCartDetails = async (cartId) => {
        if (!cartId) return;
        await startFetchCart(true);
        try {
            const response = await getCartDetailsQuery({ variables: { cartId }, fetchPolicy: "no-cache" });

            if (response?.data?.cart) {
                dispatch({ type: 'GET_CART_DETAILS_SUCCESS', payload: response.data.cart });

            }
        } catch (error) {
            dispatch({ type: 'FETCH_CART_ERROR', payload: error.message });
        } finally {
            await startFetchCart(false);
        }
    };

    const fetchDetails = async () => {
        try {
            const storedCartId = await getCartId();

            if (storedCartId) {
                dispatch({ type: 'FETCH_CART_SUCCESS', payload: storedCartId });
                await getCartDetails(storedCartId);
            } else {
                const res = await fetchCartId();

                if (res?.data) {
                    const newCartId = res.data.cartId;
                    await saveCartId(newCartId);
                    dispatch({ type: 'FETCH_CART_SUCCESS', payload: newCartId });
                    await getCartDetails(newCartId);
                }
            }
        } catch (error) {
            dispatch({ type: 'FETCH_CART_ERROR', payload: error.message });
        }
    };

    const startFetchCart = async payload => {
        dispatch({ type: 'FETCH_IS_FETCHING_CART', payload: payload});
    }

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        async function fetchDetails () {
            const storedCartId = await getCartId();
            if(isFetchingCart && storedCartId) {
                await getCartDetails(storedCartId);
            }
        }
        fetchDetails();
    },[isFetchingCart]);


    return (
        <CartContext.Provider value={{ ...state, dispatch, removeCartId, getCartDetails, startFetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default useCartProvider;