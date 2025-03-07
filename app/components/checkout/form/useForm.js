import {useMutation} from "@apollo/client";
import {
    SET_CUSTOMER_BILLING_ADDRESSES_ON_CART,
    SET_CUSTOMER_SHIPPING_ADDRESSES_ON_CART,
    SET_CUSTOMER_SHIPPING_METHOD_ON_CART
} from "../checkout.gql";
import {useCallback} from "react";
import useCartProvider from "../../../context/cart/cartProvider";
import {Alert} from "react-native";

const useForm = ({handleStep, handleCustomerDetails}) => {
    const {cartId} = useCartProvider();
    const initialValues = {
        email: '',
        firstname: '',
        lastname: '',
        city: '',
        street: '',
        house: '',
        apartment: '',
        telephone: '',
        joining_club: false,
        confirm_terms: false,
        receive_announcements: false,
        delivery: ''
    }

    const [
        customerShippingAddresses,
        {
            error: customerShippingAddressesError,
            loading: customerShippingAddressesLoading
        }
    ] = useMutation(SET_CUSTOMER_SHIPPING_ADDRESSES_ON_CART);

    const [
        customerShippingMethod,
        {
            error: customerShippingMethodError,
            loading: customerShippingMethodLoading
        }
    ] = useMutation(SET_CUSTOMER_SHIPPING_METHOD_ON_CART);

    const [
        customerBillingAddresses,
        {
            error: customerBillingAddressesError,
            loading: customerBillingAddressesLoading
        }
    ] = useMutation(SET_CUSTOMER_BILLING_ADDRESSES_ON_CART);

    const onSubmit = useCallback(async values => {
        if(!values) return;
        try {
            const address = {
                city: values.city,
                country_code: "IL",
                firstname: values.firstname,
                lastname: values.lastname,
                street: values.street,
                telephone: values.telephone,
            }
            await customerBillingAddresses({variables: {cartId, address: address}});
            await customerShippingAddresses({variables: {cartId, address: address}});
            await customerShippingMethod({
                variables:
                    {
                        cartId,
                        carrierCode: "fisha_pickup",
                        methodCode: "fisha_pickup"
                    }
            });
            await handleCustomerDetails({...values});
            await handleStep("SENDING");
        } catch (e) {
            Alert.alert(e.message)
        }

    }, [customerBillingAddresses, customerShippingAddresses, customerShippingMethod]);

    return {
        initialValues,
        onSubmit
    }
}

export default useForm