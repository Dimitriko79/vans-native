import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
    GET_CHECKOUT_DETAILS,
    GET_ORDER_DETAILS,
    PLACE_ORDER,
    SET_CUSTOMER_PAYMENT_METHOD_ON_CART
} from "../checkout.gql";
import useCartProvider from "../../../context/cart/cartProvider";
import useCheckoutContext from "../../../context/checkout/checkoutProvider";
import useUserContext from "../../../context/user/userProvider";

const useFormPayment = ({ handleStep = () => {}, step = 1 }) => {
    const { cartId, createCart } = useCartProvider();
    const { dispatch } = useCheckoutContext();
    const {getCustomerOrders} = useUserContext();

    const [selectedPayment, setSelectedPayment] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [placeOrderButtonClicked, setPlaceOrderButtonClicked] = useState(false);

    const [fetchCustomerPaymentMethod] = useMutation(SET_CUSTOMER_PAYMENT_METHOD_ON_CART);
    const [placeOrder, { data: placeOrderData, error: placeOrderError, loading: placeOrderLoading }] = useMutation(PLACE_ORDER);

    const [getOrderDetails, { data: orderDetails, loading: orderDetailsLoading }] = useLazyQuery(GET_ORDER_DETAILS, {
        fetchPolicy: 'no-cache'
    });

    const { data: checkoutData } = useQuery(GET_CHECKOUT_DETAILS, {
        skip: !cartId,
        variables: { cartId },
        notifyOnNetworkStatusChange: true
    });

    const cartItems = useMemo(() => checkoutData?.cart?.items || [], [checkoutData]);

    const handlePlaceOrder = useCallback(async () => {
        if (!cartId) return;
        try {
            await getOrderDetails({ variables: { cartId } });
            setPlaceOrderButtonClicked(true);
            setIsPlacingOrder(true);
        } catch (e) {
            console.log(e);
            Alert.alert(e.message);
        }
    }, [cartId, getOrderDetails]);

    const fetchPaymentMethod = useCallback(async () => {
        if (!cartId || !selectedPayment) return;
        try {
            await fetchCustomerPaymentMethod({
                variables: { cartId, code: selectedPayment }
            });
        } catch (e) {
            console.log(e);
            Alert.alert(e.message);
        }
    }, [cartId, selectedPayment, fetchCustomerPaymentMethod]);

    useEffect(() => {
        if (selectedPayment) {
            fetchPaymentMethod();
        }
    }, [selectedPayment, fetchPaymentMethod]);

    useEffect(() => {
        const placeOrderAndCleanup = async () => {
            if (!cartId) return;
            try {
                await placeOrder({ variables: { cartId } });
                await createCart();
                await getCustomerOrders();
            } catch (e) {
                console.log(e);
                Alert.alert(e.message);
                setPlaceOrderButtonClicked(false);
            }
        };

        if (orderDetails && isPlacingOrder) {
            setIsPlacingOrder(false);
            placeOrderAndCleanup();
        }
    }, [cartId, createCart, orderDetails, placeOrder, isPlacingOrder]);

    useEffect(() => {
        if (placeOrderButtonClicked && orderDetails?.cart) {
            const shipping = orderDetails.cart?.shipping_addresses?.map(item => item.selected_shipping_method) || [];

            const eventPayload = {
                cart_id: cartId,
                shipping,
                amount: orderDetails.cart.prices,
                payment: orderDetails.cart.selected_payment_method,
                products: orderDetails.cart.items
            };

            if (isPlacingOrder) {
                dispatch({ type: 'CHECKOUT_PLACE_ORDER_BUTTON_CLICKED', payload: eventPayload });
            } else if (placeOrderData && orderDetails?.cart.id === cartId) {
                dispatch({ type: 'CHECKOUT_PLACE_ORDER_BUTTON_CLICKED', payload: eventPayload });
                dispatch({ type: 'ORDER_CONFIRMATION_PAGE_VIEW', payload: { order_number: placeOrderData.placeOrder.order.order_number } });
                handleStep('PAYMENT');
            }
        }
    }, [cartId, orderDetails, step, cartItems, dispatch, placeOrderData, isPlacingOrder]);

    return {
        selectedPayment,
        setSelectedPayment,
        handlePlaceOrder,
        loading: orderDetailsLoading || placeOrderLoading || placeOrderButtonClicked
    };
};

export default useFormPayment;
