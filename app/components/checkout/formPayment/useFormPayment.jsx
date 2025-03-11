import {useCallback, useEffect, useMemo, useState} from "react";
import {Alert} from "react-native";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {
    GET_CHECKOUT_DETAILS,
    GET_ORDER_DETAILS,
    PLACE_ORDER,
    SET_CUSTOMER_PAYMENT_METHOD_ON_CART
} from "../checkout.gql";
import useCartProvider from "../../../context/cart/cartProvider";
import useCheckoutContext from "../../../context/checkout/checkoutProvider";


const useFormPayment = ({handleStep, step}) => {
    const {cartId, createCart} = useCartProvider();
    const {dispatch} = useCheckoutContext();
    const [selectedPayment, setSelectedPayment] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [placeOrderButtonClicked, setPlaceOrderButtonClicked] = useState(
        false
    );

    const [fetchCustomerPaymentMethod] = useMutation(SET_CUSTOMER_PAYMENT_METHOD_ON_CART);

    const [
        getOrderDetails,
        { data: orderDetails, loading: orderDetailsLoading }
    ] = useLazyQuery(GET_ORDER_DETAILS, {
        fetchPolicy: 'no-cache'
    });

    const {
        data: checkoutData,
        error: checkoutDataError,
        networkStatus: checkoutQueryNetworkStatus
    } = useQuery(GET_CHECKOUT_DETAILS, {
        skip: !cartId,
        notifyOnNetworkStatusChange: true,
        variables: {
            cartId
        }
    });

    const cartItems = useMemo(() => {
        return (checkoutData && checkoutData?.cart?.items) || [];
    }, [checkoutData]);

    const [placeOrder,
        {
            data: placeOrderData,
            error: placeOrderError,
            loading: placeOrderLoading
        }
    ] = useMutation(PLACE_ORDER);

    const handlePlaceOrder = useCallback(async () => {
       await getOrderDetails({
            variables: {
                cartId
            }
        });
       setPlaceOrderButtonClicked(true);
        setIsPlacingOrder(true);
    }, [cartId, getOrderDetails]);

    const fetchPaymentMethod = async () => {
        try {
            await fetchCustomerPaymentMethod({
                variables: {
                    cartId,
                    code: selectedPayment
                }
            })
            console.log('succsess payment')
        } catch (e) {
            console.log(e);
            Alert.alert(`111, ${e.message}`);
        }
    }

    useEffect(() => {
        if (selectedPayment !== '') {
           fetchPaymentMethod();
        }
    }, [selectedPayment]);

    useEffect(() => {
        async function placeOrderAndCleanup() {
            try {

                await placeOrder({
                    variables: {
                        cartId
                    }
                });
                await createCart();
            } catch (err) {
                console.log(err);
                Alert.alert(`222, ${e.message}`);
                setPlaceOrderButtonClicked(false);
            }
        }

        if (orderDetails && isPlacingOrder) {
            setIsPlacingOrder(false);
            placeOrderAndCleanup();
        }
    }, [
        cartId,
        createCart,
        orderDetails,
        placeOrder,
        isPlacingOrder
    ]);

    useEffect(() => {
        if (
            placeOrderButtonClicked &&
            orderDetails &&
            orderDetails.cart
        ) {
            const shipping =
                orderDetails.cart?.shipping_addresses &&
                orderDetails.cart.shipping_addresses.reduce(
                    (result, item) => {
                        return [
                            ...result,
                            {
                                ...item.selected_shipping_method
                            }
                        ];
                    },
                    []
                );
            const eventPayload = {
                cart_id: cartId,
                shippingDetails: shipping,
                amount: orderDetails.cart.prices,
                payment: orderDetails.cart.selected_payment_method,
                products: orderDetails.cart.items
            };
            if (isPlacingOrder) {
                dispatch({
                    type: 'CHECKOUT_PLACE_ORDER_BUTTON_CLICKED',
                    payload: eventPayload
                });
            } else if (placeOrderData && orderDetails?.cart.id === cartId) {
                dispatch({
                    type: 'ORDER_CONFIRMATION_PAGE_VIEW',
                    payload: {
                        order_number:
                        placeOrderData.placeOrder.order.order_number,
                        ...eventPayload
                    }
                });
                handleStep('PAYMENT')
            }
        }
    }, [
        cartId,
        orderDetails,
        step,
        cartItems,
        dispatch,
        placeOrderData,
        isPlacingOrder,
    ]);

    return {
        selectedPayment,
        setSelectedPayment,
        handlePlaceOrder,
        loading: orderDetailsLoading || placeOrderLoading || placeOrderButtonClicked
    }
}

export default useFormPayment;