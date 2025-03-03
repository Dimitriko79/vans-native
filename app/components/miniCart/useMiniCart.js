import useCartProvider from "../../context/cart/cartProvider";
import {useMutation, useQuery} from "@apollo/client";
import {MINI_CART_QUERY, REMOVE_ITEM_MUTATION} from "./miniCartQuery.gql";
import {useCallback, useMemo} from "react";
import {Alert} from "react-native";
import {router} from "expo-router";

const useMiniCart = props => {
    const {isOpen, setIsOpen} = props;

    const { cartId, startFetchCart } = useCartProvider();

    const { data: miniCartData, loading: miniCartLoading } = useQuery(
        MINI_CART_QUERY,
        {
            fetchPolicy: 'no-cache',
            // nextFetchPolicy: 'cache-first',
            variables: { cartId },
            skip: !cartId,
            errorPolicy: 'all'
        }
    );

    const [
        removeItem,
        {
            loading: removeItemLoading,
            called: removeItemCalled,
            error: removeItemError
        }
    ] = useMutation(REMOVE_ITEM_MUTATION);

    const totalQuantity = useMemo(() => {
        if (!miniCartLoading) {
            return miniCartData?.cart?.total_quantity;
        }
    }, [miniCartData, miniCartLoading]);

    const subTotal = useMemo(() => {
        if (!miniCartLoading) {
            return miniCartData?.cart?.prices?.subtotal_excluding_tax;
        }
    }, [miniCartData, miniCartLoading]);

    const productList = useMemo(() => {
        if (!miniCartLoading) {
            return miniCartData?.cart?.items;
        }
    }, [miniCartData, miniCartLoading]);

    const closeMiniCart = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const handleRemoveItem = useCallback(
        async id => {
            try {
                await removeItem({
                    variables: {
                        cartId,
                        itemId: id
                    }
                });
                await startFetchCart(true);
            } catch (e) {
                Alert.alert(e.message);
                await startFetchCart(false);
                // Error is logged by apollo link - no need to double log.
            }
        },
        [removeItem, cartId, productList]
    );

    const handleProceedToCheckout = useCallback(() => {
        closeMiniCart();
        // history.push('/checkout');
    }, [setIsOpen]);

    const handleEditCart = useCallback(() => {
        closeMiniCart();
        router.push({ pathname: "/cart"});
    }, [setIsOpen]);

    const handlePress = url_key => {
        router.push({ pathname: "/product", params: { urlKey: url_key } });
        closeMiniCart();
    }

    return {
        closeMiniCart,
        handleEditCart,
        handleProceedToCheckout,
        handleRemoveItem,
        loading: miniCartLoading || (removeItemCalled && removeItemLoading),
        productList,
        subTotal,
        totalQuantity,
        handlePress
    }
}

export default useMiniCart;