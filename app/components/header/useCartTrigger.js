import {useLazyQuery, useQuery} from '@apollo/client';
import useCartProvider from "../../context/cart/cartProvider";
import {useEffect, useState} from "react";

const useCartTrigger = props => {
    const {
        queries: { getItemCountQuery }
    } = props;

    const { cartId, isFetchingCart, miniCartIsOpen, setMiniCartIsOpen } = useCartProvider();

    const [fetchCart, { data }] = useLazyQuery(getItemCountQuery, {
        fetchPolicy: "no-cache",
        variables: {
            cartId
        },
    });

    const itemCount = data?.cart?.total_quantity || 0;

    const fetchData = async () => {
        try {
            await fetchCart();
        } catch (e) {
            console.log(e);
            setMiniCartIsOpen(false);
        }
    }

    useEffect(() => {
        if(isFetchingCart){
            fetchData()
        }
    }, [isFetchingCart, cartId]);
    console.log('cartId', cartId)
    return {
        itemCount,
        miniCartIsOpen,
        setMiniCartIsOpen
    };
};

export default useCartTrigger;