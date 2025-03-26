import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
    const tokenData = await AsyncStorage.getItem('sign-token');
    console.log('tokenData', tokenData)
    if (!tokenData) return null;

    const { token } = JSON.parse(tokenData);
    return token;
};
const authLink = new ApolloLink((operation, forward) => {
    return new Promise(async (resolve) => {
        const token = await getToken();
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