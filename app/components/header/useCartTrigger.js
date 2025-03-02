import {useLazyQuery, useQuery} from '@apollo/client';
import {useCartProvider} from "../../context/cart/cartProvider";
import {useEffect} from "react";

export const useCartTrigger = props => {
    const {
        queries: { getItemCountQuery }
    } = props;

    const { cartId, isFetchingCart,  } = useCartProvider()

    const [fetchCart, { data }] = useLazyQuery(getItemCountQuery, {
        fetchPolicy: "no-cache",
        variables: {
            cartId
        },
    });

    const itemCount = data?.cart?.total_quantity || 0;

    const fetchData = async () => {
        try {
            await fetchCart()
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if(isFetchingCart){
            fetchData()
        }
    }, [isFetchingCart]);

    return {
        itemCount
    };
};
