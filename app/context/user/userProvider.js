import React, {createContext, useCallback, useContext, useEffect, useReducer} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {initialState, userReducer} from "./reducer/userReducer";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_CUSTOMER_DETAILS, REVOKE_CUSTOMER_TOKEN, SIGN_IN} from "./user.gql.js";
import {Alert} from "react-native";
import {router} from "expo-router";

const UserContext = createContext(null);
const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const [fetchCustomerDetails] = useLazyQuery(GET_CUSTOMER_DETAILS, {fetchPolicy: "network-only"});
    const [revokeToken] = useMutation(REVOKE_CUSTOMER_TOKEN);
    const [SignInCustomer] = useMutation(SIGN_IN);

    const setToken = async token => {
        console.log('setToken', token);
        await AsyncStorage.setItem("sign-token", token);
    }

    const loadUser = useCallback(async () => {
        dispatch({type: 'FETCH_IS_FETCHING_USER', payload: true})
        try {
             const token = AsyncStorage.getItem("sign-token");

            if (!token) {
                await AsyncStorage.removeItem("sign-token");
                dispatch({type: 'USER_DETAILS_SUCCESS', payload: null})
                dispatch({type: 'SET_IS_SIGNED_IN', payload: false});
                Alert.alert('Signin false')
                return;
            }
            const response = await fetchCustomerDetails();

            if (response?.data?.customer) {
                const userData = response.data.customer;
                dispatch({type: 'USER_DETAILS_SUCCESS', payload: userData})
                dispatch({type: 'SET_IS_SIGNED_IN', payload: true});
            } else {
                await AsyncStorage.removeItem('sign-token');
                dispatch({type: 'USER_DETAILS_SUCCESS', payload: null})
                dispatch({type: 'SET_IS_SIGNED_IN', payload: false});
            }
        } catch (error) {
            dispatch({type: 'SET_IS_SIGNED_IN', payload: false});
            dispatch({type: 'FETCH_USER_ERROR', payload: error});
        }
    }, []);

    const signOut = async () => {
        try {
            const res = await revokeToken();
            if(res?.data?.revokeCustomerToken?.result){
                await AsyncStorage.removeItem("sign-token");
                dispatch({type: 'USER_DETAILS_SUCCESS', payload: null})
                dispatch({type: 'SET_IS_SIGNED_IN', payload: false});
                if (router.pathname !== "/homepage") {
                    router.push({ pathname: "/homepage"});
                }
            }
        } catch (e) {
            console.log(e)
            Alert.alert(e.message);
        }
    };

    const signIn = async credentinals => {
        try {
            return await SignInCustomer({
                variables: {
                    email: credentinals.email,
                    password: credentinals.password,
                }
            });
        } catch (e) {
            console.log(e);
            Alert.alert(e.message);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{...state, signIn, signOut, setToken, loadUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default useUserContext;
