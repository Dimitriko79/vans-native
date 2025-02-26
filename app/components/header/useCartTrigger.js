import {useLazyQuery, useQuery} from '@apollo/client';
import {useCartProvider} from "../../context/cart/cartProvider";
import {useEffect} from "react";

export const useCartTrigger = props => {
    const {
        queries: { getItemCountQuery }
    } = props;

    const { cartId, isFetchingCart,  } = useCartProvider()

    const [fetchCart, { data }] = useLazyQuery(getItemCountQuery, {
        fetchPolicy: 'cache-and-network',
        variables: {
            cartId
        },
        errorPolicy: 'all'
    });

    const itemCount = data?.cart?.total_quantity || 0;

    const fetchData = async () => {
        try {
            if(isFetchingCart) {
                await fetchCart()
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [isFetchingCart, cartId]);

    return {
        itemCount
    };
};
