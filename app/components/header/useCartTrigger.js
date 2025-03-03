import {useLazyQuery, useQuery} from '@apollo/client';
import useCartProvider from "../../context/cart/cartProvider";
import {useEffect, useState} from "react";

const useCartTrigger = props => {
    const {
        queries: { getItemCountQuery }
    } = props;

    const [miniCartIsOpen, setMiniCartIsOpen] = useState(false);
    const [isFirstFetching, setIsFirstFetching] = useState(true);

    const { cartId, isFetchingCart,  } = useCartProvider();
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
            if(!isFirstFetching) {
                setMiniCartIsOpen(true);
            }
        } catch (e) {
            console.log(e);
            setMiniCartIsOpen(false);
        } finally {
            setIsFirstFetching(false);
        }
    }

    useEffect(() => {
        if(isFetchingCart){
            fetchData()
        }
    }, [isFetchingCart]);

    return {
        itemCount,
        miniCartIsOpen,
        setMiniCartIsOpen
    };
};

export default useCartTrigger;