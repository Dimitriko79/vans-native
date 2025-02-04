import React, { createContext, useContext, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import {apolloClient, updateApolloClient} from "../../servises/client";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [storeCode, setStoreCode] = useState('default');

    const changeStore = (newStore) => {
        setStoreCode(newStore);
        updateApolloClient(newStore);
    };

    return (
        <StoreContext.Provider value={{ storeCode, changeStore }}>
            <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);