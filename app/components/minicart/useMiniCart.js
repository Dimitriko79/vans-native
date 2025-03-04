import useCartProvider from "../../context/cart/cartProvider";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {MINI_CART_QUERY, REMOVE_ITEM_MUTATION} from "./miniCartQuery.gql";
import {useCallback, useEffect, useMemo} from "react";
import {Alert} from "react-native";
import {router} from "expo-router";

const useMiniCart = props => {
    const {isOpen, setIsOpen} = props;
    const { cartId, isFetchingCart } = useCartProvider();
    const [fetchMiniCart, { data: miniCartData, loading: miniCartLoading }] = useLazyQuery(
        MINI_CART_QUERY,
        {
            fetchPolicy: 'no-cache',
            // nextFetchPolicy: 'cache-first',
            variables: { cartId }
        }
    );

    const totalQuantity = useMemo(() => {
        if (miniCartData) {
            return miniCartData?.cart?.total_quantity;
        }
        return 0;
    }, [miniCartData]);

    const subTotal = useMemo(() => {
        if (miniCartData) {
            return miniCartData?.cart?.prices?.subtotal_excluding_tax;
        }
        return {
            currency: "ILS",
            value: 0
        }
    }, [miniCartData]);

    const productList = useMemo(() => {
        if (miniCartData) {
            return miniCartData?.cart?.items;
        }
    }, [miniCartData]);

    const closeMiniCart = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const handleProceedToCheckout = useCallback(() => {
        closeMiniCart();
        router.push({ pathname: '/checkout'});
    }, [setIsOpen]);

    const handleEditCart = useCallback(() => {
        closeMiniCart();
        router.push({ pathname: "/cart"});
    }, [setIsOpen]);

    const handlePress = url_key => {
        router.push({ pathname: "/product", params: { urlKey: url_key } });
        closeMiniCart();
    }

    useEffect(() => {
        fetchMiniCart();
    }, [isFetchingCart])

    return {
        closeMiniCart,
        handleEditCart,

        loading: miniCartLoading,
        productList,
        subTotal,
        totalQuantity,
        handlePress
    }
}

export default useMiniCart;