import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation } from "@apollo/client";
import { useAwaitQuery } from "../helpers/useAwaitQuery";
import { CART_DETAILS_QUERY, CREATE_CART_MUTATION } from "../components/cart/cart.gql";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext('');
export const useCartProvider = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
    const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
    const fetchCartDetails = useAwaitQuery(CART_DETAILS_QUERY);

    const [cartId, setCartId] = useState(null);
    const [isFetchingCart, setIsFetchingCart] = useState(false);

    const TTL = 3600000;

    const saveCartIdWithTTL = async (id) => {
        const expires = Date.now() + TTL;
        const data = { id, expires };

        try {
            await AsyncStorage.setItem("cartId", JSON.stringify(data));
        } catch (error) {
            console.error("Error saving cartId:", error);
        }
    };

    const getCartIdWithTTL = async () => {
        try {
            const jsonData = await AsyncStorage.getItem("cartId");
            if (!jsonData) return null;

            const data = JSON.parse(jsonData);

            if (Date.now() > data.expires) {
                await AsyncStorage.removeItem("cartId");
                return null;
            }

            return data.id;
        } catch (error) {
            console.error("Error getting cartId:", error);
            return null;
        }
    };

    const fetchDetails = async () => {
        setIsFetchingCart(true);

        try {
            const storedCartId = await getCartIdWithTTL();

            if (storedCartId) {
                setCartId(storedCartId);
            } else {
                const res = await fetchCartId();

                if (res && res.data) {
                    const result = await fetchCartDetails({ variables: { cartId: res.data.cartId } });
                    const newCartId = result?.data?.cart?.id;

                    if (newCartId) {
                        setCartId(newCartId);
                        await saveCartIdWithTTL(newCartId);
                    }
                }
            }
        } catch (error) {
            console.error("Error getting cartId:", error);
        } finally {
            setIsFetchingCart(false);
        }
    };

    useEffect(() => {
        fetchDetails();

        const interval = setInterval(() => {
            fetchDetails();
        }, TTL);

        return () => clearInterval(interval);
    }, []);

    return (
        <CartContext.Provider value={{ cartId, isFetchingCart, setIsFetchingCart }}>
            {children}
        </CartContext.Provider>
    );
};