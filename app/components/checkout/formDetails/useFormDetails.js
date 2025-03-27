import { useLazyQuery, useMutation } from "@apollo/client";
import {
    IS_EMAIL_AVAILABLE,
    SET_CUSTOMER_BILLING_ADDRESSES_ON_CART,
    SET_CUSTOMER_SHIPPING_ADDRESSES_ON_CART,
    SET_CUSTOMER_SHIPPING_METHOD_ON_CART,
    SET_GUEST_EMAIL_ON_CART
} from "../checkout.gql";
import { useCallback, useEffect, useState } from "react";
import useCartProvider from "../../../context/cart/cartProvider";
import { Alert } from "react-native";
import useUserContext from "../../../context/user/userProvider";
import useCheckoutProvider from "../../../context/checkout/checkoutProvider";

const useFormDetails = ({
                            handleStep = () => {},
                            handleCustomerDetails = () => {},
                            setStepOneDone = () => {},
                            isStepOneDone = false
                        }) => {
    const { cartId, retrieveCartId, mergeCarts, createCart } = useCartProvider();
    const { signIn, isSignedIn } = useUserContext();
    const { dispatch, shippingDetails } = useCheckoutProvider();

    const [loadingLogin, setLoadingLogin] = useState(false);
    const [isEmailAvailable, setEmailAvailable] = useState(true);
    const [errorMessage, setErrorMessage] = useState([]);

    const defaultValues = {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        city: '',
        street: '',
        building: '',
        apartment: '',
        telephone: '',
        joining_club: false,
        confirm_terms: false,
        receive_announcements: false,
        delivery: '',
    };

    const [initialValues, setInitialValues] = useState(defaultValues);

    const [customerShippingAddresses, { loading: customerShippingAddressesLoading }] = useMutation(SET_CUSTOMER_SHIPPING_ADDRESSES_ON_CART);
    const [customerShippingMethod, { loading: customerShippingMethodLoading }] = useMutation(SET_CUSTOMER_SHIPPING_METHOD_ON_CART);
    const [customerBillingAddresses, { loading: customerBillingAddressesLoading }] = useMutation(SET_CUSTOMER_BILLING_ADDRESSES_ON_CART);
    const [setGuestEmailOnCart, { loading: guestEmailOnCartLoading }] = useMutation(SET_GUEST_EMAIL_ON_CART);
    const [checkEmailAvailable, {loading: checkEmailAvailableLoading}] = useLazyQuery(IS_EMAIL_AVAILABLE);

    const onSubmit = useCallback(async (values, resetForm) => {
        if (!values) return;
        setErrorMessage([])
        try {
            const address = {
                city: values.city,
                country_code: 'IL',
                firstname: values.firstname,
                lastname: values.lastname,
                street: values.street,
                telephone: values.telephone,
            };

            if (!isSignedIn) {
                await setGuestEmailOnCart({ variables: { cartId, email: values.email } });
            }

            await customerBillingAddresses({ variables: { cartId, address } });
            await customerShippingAddresses({ variables: { cartId, address } });
            await customerShippingMethod({ variables: { cartId, carrierCode: values.delivery, methodCode: values.delivery } });

            dispatch({
                type: "SET_SHIPPING_DETAILS",
                payload: { ...shippingDetails, ...values },
            });

            handleCustomerDetails(values);
            resetForm();
            handleStep("SENDING");
            setStepOneDone(true);
        } catch (e) {
            console.log(e);
            setErrorMessage([e.message]);
            // Alert.alert(e.message);
        }
    }, [cartId, isSignedIn, setGuestEmailOnCart, customerBillingAddresses, customerShippingAddresses, customerShippingMethod, dispatch, shippingDetails, handleCustomerDetails, handleStep, setStepOneDone]);

    const handleEmailAvailable = useCallback(async (value) => {
        try {
            const res = await checkEmailAvailable({ variables: { email: value } });
            if (res?.data?.isEmailAvailable) {
                setEmailAvailable(res.data.isEmailAvailable.is_email_available);
            }
        } catch (e) {
            console.log(e);
            Alert.alert(e.message);
        }
    }, [checkEmailAvailable]);

    const onLogin = useCallback(async (values) => {
        setLoadingLogin(true);
        try {
            const sourceCartId = cartId;
            const res = await signIn(values);

            if (res) {
                const destinationCartId = await retrieveCartId();
                await mergeCarts({ variables: { destinationCartId, sourceCartId } });
                await createCart();
            }
        } catch (e) {
            console.log(e);
            Alert.alert(e.message);
        } finally {
            setLoadingLogin(false);
        }
    }, [cartId, signIn, retrieveCartId, mergeCarts, createCart]);

    useEffect(() => {
        setInitialValues(prevValues => ({
            ...prevValues,
            ...shippingDetails,
        }));
    }, [shippingDetails]);

    return {
        loadingLogin,
        isSignedIn,
        isEmailAvailable,
        initialValues,
        setStepOneDone,
        customerDetails: shippingDetails,
        handleEmailAvailable,
        onSubmit,
        onLogin,
        loading: customerBillingAddressesLoading || customerShippingAddressesLoading || customerShippingMethodLoading || guestEmailOnCartLoading || checkEmailAvailableLoading,
        errorMessage, onErrorMessage: setErrorMessage
    };
};

export default useFormDetails;
