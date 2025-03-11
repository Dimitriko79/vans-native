import useCartProvider from "../../context/cart/cartProvider";
import {useCallback, useMemo} from "react";
import {router} from "expo-router";

const useMiniCart = props => {
    const {setIsOpen} = props;
    const { cart } = useCartProvider();

    const totalQuantity = useMemo(() => {
        if (cart) {
            return cart.total_quantity;
        }
        return 0;
    }, [cart]);

    const subTotal = useMemo(() => {
        if (cart) {
            return cart.prices?.subtotal_excluding_tax;
        }
        return {
            currency: "ILS",
            value: 0
        }
    }, [cart]);

    const productList = useMemo(() => {
        if (cart) {
            return cart.items;
        }
    }, [cart]);

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
        loading: !!cart,
        productList,
        subTotal,
        totalQuantity,
        handlePress
    }
}

export default useMiniCart;