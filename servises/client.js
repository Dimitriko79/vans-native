import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authLink = new ApolloLink((operation, forward) => {
    return new Promise(async (resolve) => {
        const token = await AsyncStorage.getItem("sign-token");
        console.log('token', token)
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token}` : "",
                'Store': operation.getContext().storeCode || "he"
            }
        }));

        resolve(forward(operation));
    });
});

const createApolloClient = (storeCode = "he") => {
    const httpLink = new HttpLink({
        uri: "https://vans-react.fisha.co.il/graphql",
    });

    return new ApolloClient({
        link: ApolloLink.from([authLink, httpLink]),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "cache-and-network",
            },
        },
        connectToDevTools: true,
    });
};

export let apolloClient = createApolloClient();