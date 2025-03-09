import {useQuery} from "@apollo/client";
import {GET_CMS_BLOCK} from "../header/header.gql";
import {useMemo, useState} from "react";
import useCartProvider from "../../context/cart/cartProvider";
import useUserContext from "../../context/user/userProvider";

export const CHECKOUT_STEP = {
    WELCOME: {id:1, title: 'עמוד תשלום'},
    SENDING: {id: 2, title: 'בחירת שיטת משלוח'},
    PAYMENT: {id: 3, title: null}
};

const DEFAULT_PRICE = {
    value: 0.00,
    currency: 'ILS'
}

const useCheckout = () => {
    const { details } = useCartProvider();
    const {user} = useUserContext();

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
        if(details){
            return details.prices.grand_total;
        }
        return DEFAULT_PRICE;
    }, [details]);

    const productList = useMemo(() => {
        if(details){
            return details.items;
        }
        return [];
    }, [details]);

    return {
        user,
        step,
        productList,
        totalPrice,
        cmsBlockData,
        handleCustomerDetails: setCustomerDetails,
        handleStep: setStep,
        errorMessage,
        onErrorMessage: setErrorMessage
    }
}

export default useCheckout;