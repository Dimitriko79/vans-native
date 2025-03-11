import {useQuery} from "@apollo/client";
import {GET_CMS_BLOCK} from "../header/header.gql";
import {useMemo, useState} from "react";
import useCartProvider from "../../context/cart/cartProvider";

export const CHECKOUT_STEP = {
    WELCOME: {id:1, title: 'בחירת שיטת משלוח'},
    SENDING: {id: 2, title: 'בחרו את סוג התשלום'},
    PAYMENT: {id: 3, title: null}
};

const DEFAULT_PRICE = {
    value: 0.00,
    currency: 'ILS'
}

const useCheckout = () => {
    const { cart } = useCartProvider();
   const [isStepOneDone, setStepOneDone] = useState(false);
    const [step, setStep] = useState("WELCOME");
    const [errorMessage, setErrorMessage] = useState([]);
    const [customerDetails, setCustomerDetails] = useState(null);

    const {data, loading, error} = useQuery(
        GET_CMS_BLOCK,
        {
            fetchPolicy: "cache-and-network",
            variables:
                {identifiers: ["checkout_top_block"]}
        }
    );

    const cmsBlockData = data?.cmsBlocks?.items || [];

    const totalPrice = useMemo(() => {
        if(cart){
            return cart.prices.grand_total;
        }
        return DEFAULT_PRICE;
    }, [cart]);

    const productList = useMemo(() => {
        if(cart){
            return cart.items;
        }
        return [];
    }, [cart]);

    const shippingMethods = useMemo(() => {
        if(cart && cart.shipping_addresses && cart.shipping_addresses.length > 0) {
            return cart.shipping_addresses[0].available_shipping_methods;
        }
        return [{
            carrier_code: "fisha_pickup",
            carrier_title: "איסוף מסניף",
            method_code: "fisha_pickup",
            method_title: "איסוף מסניף"
        }]
    }, [cart]);

    const paymentMethods = useMemo(() => {
        if(cart && cart.available_payment_methods.length > 0) {
            return cart.available_payment_methods;
        }
        return [];
    }, [cart]);

    return {
        step,
        isStepOneDone, setStepOneDone,
        productList,
        totalPrice,
        paymentMethods,
        shippingMethods,
        cmsBlockData,
        handleCustomerDetails: setCustomerDetails,
        handleStep: setStep,
        errorMessage,
        onErrorMessage: setErrorMessage
    }
}

export default useCheckout;