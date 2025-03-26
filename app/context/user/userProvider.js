import React, {createContext, useCallback, useContext, useEffect, useReducer, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {initialState, userReducer} from "./reducer/userReducer";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_CUSTOMER_DETAILS, GET_CUSTOMER_ORDERS, REVOKE_CUSTOMER_TOKEN, SIGN_IN} from "./user.gql.js";
import {router} from "expo-router";
import * as SecureStore from 'expo-secure-store';

const UserContext = createContext(null);
const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const [view, setView] = useState("SIGNIN");
    const [isUserUpdate, setUserUpdate] = useState(false);

    const [fetchCustomerDetails] = useLazyQuery(GET_CUSTOMER_DETAILS, {fetchPolicy: "network-only"});
    const [fetchCustomerOrders, {error}] = useLazyQuery(GET_CUSTOMER_ORDERS, {fetchPolicy: "network-only"});

    const [revokeToken] = useMutation(REVOKE_CUSTOMER_TOKEN);
    const [signInCustomer] = useMutation(SIGN_IN);

    const extendToken = async () => {
        try {
            const email = await SecureStore.getItemAsync("user-email");
            const password = await SecureStore.getItemAsync("user-password");

            if (!email || !password) return;

            const res = await signInCustomer({
                variables: { email, password }
            });

            const token = res?.data?.generateCustomerToken?.token;
            if (token) {
                await setToken(token, 3600);
            }
        } catch (error) {
            console.log(error);
        }
    };



    const setToken = async (token, expiresInSeconds) => {
        const expiryTimestamp = Date.now() + expiresInSeconds * 1000;

        const tokenData = JSON.stringify({
            token,
            expiresAt: expiryTimestamp
        });

        await AsyncStorage.setItem('sign-token', tokenData);
    }

    const getToken = async () => {
        const tokenData = await AsyncStorage.getItem('sign-token');

        if (!tokenData) return null;

        const { token, expiresAt } = JSON.parse(tokenData);

        if (Date.now() > expiresAt) {
            await AsyncStorage.removeItem('sign-token');
            return null;
        }

        return token;
    };

    const getUserData = useCallback(async () => {
        dispatch({type: 'IS_FETCHING_USER', payload: true})
        try {
             const token = await getToken();

            if (!token) {
                dispatch({type: 'GET_USER_DETAILS_SUCCESS', payload: null})
                dispatch({type: 'SET_IS_SIGNED_IN', payload: false});
                dispatch({type: 'SET_CUSTOMER_ORDERS', payload: []});
                dispatch({type: 'SET_WISHLIST_ITEMS', payload: []});
                return;
            }
            const response = await fetchCustomerDetails();

            if (response?.data?.customer) {
                const userData = response.data.customer;
                dispatch({type: 'GET_USER_DETAILS_SUCCESS', payload: userData})
                dispatch({type: 'SET_IS_SIGNED_IN', payload: true});
                dispatch({type: 'SET_WISHLIST_ITEMS', payload: userData.wishlist});
            }
            await getCustomerOrders();
        } catch (error) {
            dispatch({type: 'SET_IS_SIGNED_IN', payload: false});
            dispatch({type: 'USER_ERROR', payload: error});
        } finally {
            dispatch({type: 'IS_FETCHING_USER', payload: false})
        }
    }, []);

    const getCustomerOrders = useCallback(async () => {
        try {
            const response = await fetchCustomerOrders();
            if (response?.data?.customerOrders?.items) {
                const userOrders = response.data.customerOrders.items;
                dispatch({type: 'SET_CUSTOMER_ORDERS', payload: userOrders});
            }
        } catch (error) {
            console.log(error)
        }
    }, []);

    const signIn = async credentials => {
        try {
            await AsyncStorage.removeItem('sign-token');

            const res = await signInCustomer({
                variables: {
                    email: credentials.email,
                    password: credentials.password,
                }
            });

            const token = res?.data?.generateCustomerToken.token || null;

            if (token) {
                await setToken(token, 3600);
                await SecureStore.setItemAsync("user-email", credentials.email);
                await SecureStore.setItemAsync("user-password", credentials.password);
                await getUserData();
            }

            return !!token;
        } catch (e) {
            console.log(e);
        }
    }

    const signOut = async () => {
        try {
            const res = await revokeToken();
            if(res?.data?.revokeCustomerToken?.result){
                await AsyncStorage.removeItem("sign-token");
                await SecureStore.deleteItemAsync("user-email");
                await SecureStore.deleteItemAsync("user-password");
                dispatch({type: 'GET_USER_DETAILS_SUCCESS', payload: null})
                dispatch({type: 'SET_IS_SIGNED_IN', payload: false});
                dispatch({type: 'SET_CUSTOMER_ORDERS', payload: []});
                dispatch({type: 'SET_WISHLIST_ITEMS', payload: []});
                if (router.pathname !== "/homepage") {
                    router.push({ pathname: "/homepage"});
                    setView("SIGNIN");
                }
            }
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if(isUserUpdate){
            setTimeout(() => {
                setUserUpdate(false);
            }, 10000);
        }
    },[isUserUpdate])

    return (
        <UserContext.Provider value={{
            ...state,
            signIn,
            signOut,
            getUserData,
            getCustomerOrders,
            view,
            setView,
            isUserUpdate,
            setUserUpdate,
            extendToken
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default useUserContext;
