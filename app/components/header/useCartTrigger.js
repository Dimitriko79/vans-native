import {useLazyQuery, useQuery} from '@apollo/client';
import {useCartProvider} from "../../context/cartProvider";
import {useEffect} from "react";

export const useCartTrigger = props => {
    const {
        queries: { getItemCountQuery }
    } = props;

    const { cartId, isFetchingCart, setIsFetchingCart } = useCartProvider();

    const [fetchCart, { data }] = useLazyQuery(getItemCountQuery, {
        fetchPolicy: 'cache-and-network',
        variables: {
            cartId
        },
        skip: !cartId,
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
        } finally {
            setIsFetchingCart(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [isFetchingCart, fetchCart]);

    return {
        itemCount
    };
};
