import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

const createApolloClient = (storeCode = 'he') => {
    return new ApolloClient({
        link: new HttpLink({
            uri: 'https://vans.qa.fisha.co.il/graphql',
            headers: {
                'Store': storeCode
            }
        }),
        cache: new InMemoryCache()
    });
};

export let apolloClient = createApolloClient();

export const updateApolloClient = (newStoreCode) => {
    apolloClient = createApolloClient(newStoreCode);
};