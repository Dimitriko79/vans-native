import React, {createContext, useContext, useEffect, useReducer, useState} from 'react';
import {initialState, storeReducer} from "./reducer/storeReducer";
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_COUNTRIES, GET_COUNTRY_BY_ID, GET_STORE_CONFIG} from "../../components/store/store.gql";

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

    const { data: dataCountries } = useQuery(GET_COUNTRIES, { fetchPolicy: 'network-only' });
    const [getCountryByID, {}] = useLazyQuery(GET_COUNTRY_BY_ID, {fetchPolicy: 'network-only'});

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

    useEffect(() => {
        if (dataCountries && dataCountries.countries && dataCountries.countries.length > 0) {
            getCountryByID({variables: {id: dataCountries.countries[0].id}})
                .then((response) => {
                    if(response && response.data) {
                        dispatch({type: "SET_COUNTRY", payload: response.data.country})
                    }
                })
                .catch((e) => {
                    console.log(e.message);
                })
        }
    }, [dataCountries])

    return (
        <StoreContext.Provider value={{ ...state}}>
            {children}
        </StoreContext.Provider>
    );
};

export default useStoreContext;

