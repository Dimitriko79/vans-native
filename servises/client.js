import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

const createApolloClient = (storeCode = 'en') => {
    console.log(2222, storeCode)
    return new ApolloClient({
        link: new HttpLink({
            uri: 'https://www.dutyfree.co.il/graphql',
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