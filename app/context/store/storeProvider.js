import React, {createContext, useContext, useEffect, useReducer, useState} from 'react';
import {initialState, storeReducer} from "../store/reducer/storeReducer";
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_STORE_CONFIG} from "../../components/store/store.gql";

const StoreContext = createContext(null);
const useStoreContext = () => useContext(StoreContext);
export const StoreContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);

    const [fetchStoreConfig] = useLazyQuery(GET_STORE_CONFIG,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: "cache-first",
            errorPolicy: "all"
        }
    )

    const fetchStore = async () => {
        try {
           const res =  await fetchStoreConfig();
           if(res?.data?.storeConfig){
               dispatch({type: "SET_STORE_CONFIG", payload: res.data.storeConfig});
           }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchStore();
    }, []);

    return (
        <StoreContext.Provider value={{ ...state}}>
            {children}
        </StoreContext.Provider>
    );
};

export default useStoreContext;

