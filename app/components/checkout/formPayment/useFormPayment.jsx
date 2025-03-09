import {useEffect, useState} from "react";
import {Alert} from "react-native";
import {useMutation} from "@apollo/client";
import {PLACE_ORDER, SET_CUSTOMER_PAYMENT_METHOD_ON_CART} from "../checkout.gql";
import useCartProvider from "../../../context/cart/cartProvider";

const useFormPayment = ({handleStep}) => {
    const {cartId, createCart} = useCartProvider();
    const [selectedPayment, setSelectedPayment] = useState('');

    const [fetchCustomerPaymentMethod] = useMutation(SET_CUSTOMER_PAYMENT_METHOD_ON_CART);
    const [fetchPlaceOrder] = useMutation(PLACE_ORDER);
    const handleSubmit = async () => {
        try {
            const res = await fetchPlaceOrder({variables: {cartId}});
            await createCart();
            await handleStep("PAYMENT");
        } catch (e) {
            console.log(e);
            Alert.alert(e.message);
        }
    }

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
            Alert.alert(e.message);
        }
    }

    useEffect(() => {
        if (selectedPayment !== '') {
           fetchPaymentMethod();
        }
    }, [selectedPayment]);

    return {
        selectedPayment,
        setSelectedPayment,
        handleSubmit
    }
}

export default useFormPayment;