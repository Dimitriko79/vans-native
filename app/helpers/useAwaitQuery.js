import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';

const useAwaitQuery = query => {
    const apolloClient = useApolloClient();

    return useCallback(
        options => {
            return apolloClient.query({
                ...options,
                query
            });
        },
        [apolloClient, query]
    );
};

export default useAwaitQuery;