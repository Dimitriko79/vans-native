import {useMutation} from "@apollo/client";
import {
    SET_CUSTOMER_BILLING_ADDRESSES_ON_CART,
    SET_CUSTOMER_SHIPPING_ADDRESSES_ON_CART,
    SET_CUSTOMER_SHIPPING_METHOD_ON_CART
} from "../checkout.gql";
import {useCallback} from "react";
import useCartProvider from "../../../context/cart/cartProvider";
import {Alert} from "react-native";
import useUserContext from "../../../context/user/userProvider";

const useForm = ({shippingCustomerDetails, handleStep, handleCustomerDetails}) => {
    const {cartId, dispatch} = useCartProvider();
    const {isSignedIn} = useUserContext();

    const initialValues = {
        email: '',
        firstname: shippingCustomerDetails?.firstname || '',
        lastname: shippingCustomerDetails?.lastname || '',
        city: shippingCustomerDetails?.city || '',
        street: shippingCustomerDetails?.street[0] || '',
        building: shippingCustomerDetails?.building || '',
        apartment: shippingCustomerDetails?.apartment || '',
        telephone: shippingCustomerDetails?.telephone || '',
        joining_club: false,
        confirm_terms: false,
        receive_announcements: false,
        delivery: shippingCustomerDetails?.delivery || '',
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

    const onSubmit = useCallback(async (values, resetForm) => {
        if(!values) return;
        try {
            const address = {
                city: values.city,
                country_code: shippingCustomerDetails.country.code || 'IL',
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
                        carrierCode: values.delivery,
                        methodCode: values.delivery
                    }
            });
            dispatch({
                type: "SET_SHIPPING_CUSTOMER_DETAILS",
                payload: {
                    ...shippingCustomerDetails,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    city: values.city,
                    street: [
                        values.street,
                    ],
                    building: values.building,
                    apartment: values.apartment,
                    telephone: values.telephone,
                    delivery: values.delivery,
                }});
            await handleCustomerDetails({...values});
            await resetForm();
            await handleStep("SENDING");
        } catch (e) {
            Alert.alert(e.message)
        }

    }, [customerBillingAddresses, customerShippingAddresses, customerShippingMethod]);

    return {
        isSignedIn,
        initialValues,
        onSubmit,
        loading: customerBillingAddressesLoading || customerShippingAddressesLoading || customerShippingMethodLoading,
    }
}

export default useForm