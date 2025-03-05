import useCartProvider from "../../context/cart/cartProvider";
import {useCallback, useMemo} from "react";
import {router} from "expo-router";

const useMiniCart = props => {
    const {setIsOpen} = props;
    const { details } = useCartProvider();

    const totalQuantity = useMemo(() => {
        if (details) {
            return details.total_quantity;
        }
        return 0;
    }, [details]);

    const subTotal = useMemo(() => {
        if (details) {
            return details.prices?.subtotal_excluding_tax;
        }
        return {
            currency: "ILS",
            value: 0
        }
    }, [details]);

    const productList = useMemo(() => {
        if (details) {
            return details.items;
        }
    }, [details]);

    const closeMiniCart = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const handleProceedToCheckout = useCallback(() => {
        router.push({ pathname: '/checkout'});
        closeMiniCart();
    }, [setIsOpen]);

    const handleEditCart = useCallback(() => {
        router.push({ pathname: "/cart"});
        closeMiniCart();
    }, [setIsOpen]);

    const handlePress = url_key => {
        router.push({ pathname: "/product", params: { urlKey: url_key } });
        closeMiniCart();
    }

    return {
        closeMiniCart,
        handleEditCart,
        handleProceedToCheckout,
        loading: !!details,
        productList,
        subTotal,
        totalQuantity,
        handlePress
    }
}

export default useMiniCart;