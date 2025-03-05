import React, {createContext, useCallback, useContext, useEffect, useReducer} from 'react';
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_CART_MUTATION, GET_CART_DETAILS } from "../../components/cart/cart.gql";
import { cartReducer, initialState } from "./reducer/cartReducer";

const CartContext = createContext(null);
const useCartProvider = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const { cartId, isFetchingCart } = state;
    const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
    const [getCartDetailsQuery, {data, error}] = useLazyQuery(GET_CART_DETAILS);

    // Сохранение cartId в store
    const saveCartId = (id) => {
        if (!id) return;
        dispatch({ type: "SET_CART_ID", payload: id });
    };

    // Получение деталей корзины
    const getCartDetails = useCallback(async (cartId) => {
        if (!cartId) return;
        startFetchCart(true);

        try {
            const { data, error } = await getCartDetailsQuery({
                variables: { cartId },
                fetchPolicy: "no-cache",
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

    // Создание новой корзины
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

    // Функция управления состоянием загрузки
    const startFetchCart = (payload) => {
        dispatch({ type: "FETCH_IS_FETCHING_CART", payload });
    };

    // При загрузке приложения создаем новую корзину
    useEffect(() => {
        createNewCart();
    }, []);

    // Если isFetchingCart изменился, запрашиваем детали корзины
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