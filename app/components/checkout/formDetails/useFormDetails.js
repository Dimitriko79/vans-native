import {useLazyQuery, useMutation} from "@apollo/client";
import {
    IS_EMAIL_AVAILABLE,
    SET_CUSTOMER_BILLING_ADDRESSES_ON_CART,
    SET_CUSTOMER_SHIPPING_ADDRESSES_ON_CART,
    SET_CUSTOMER_SHIPPING_METHOD_ON_CART, SET_GUEST_EMAIL_ON_CART
} from "../checkout.gql";
import {useCallback, useEffect, useState} from "react";
import useCartProvider from "../../../context/cart/cartProvider";
import {Alert} from "react-native";
import useUserContext from "../../../context/user/userProvider";
import useCheckoutProvider from "../../../context/checkout/checkoutProvider";

const useFormDetails = ({handleStep, handleCustomerDetails, setStepOneDone}) => {
    const {cartId, retrieveCartId, mergeCarts, createCart} = useCartProvider();
    const {signIn} = useUserContext();
    const {dispatch, shippingDetails} = useCheckoutProvider();

    const {isSignedIn} = useUserContext();
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [isEmailAvailable, setEmailAvailable] = useState(true);

    const [initialValues, setInitialValues] = useState({
        email: '',
        password: '',
        firstname:'',
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
    })

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

    const [setGuestEmailOnCart,
        {
            error: guestEmailOnCartError,
            loading: guestEmailOnCartLoading
        }
    ] = useMutation(SET_GUEST_EMAIL_ON_CART);

    const [checkEmailAvailable, {error}] = useLazyQuery(IS_EMAIL_AVAILABLE);

    const onSubmit = useCallback(async (values, resetForm) => {
        if(!values) return;

        try {
            const address = {
                city: values.city,
                country_code: 'IL',
                firstname: values.firstname,
                lastname: values.lastname,
                street: values.street,
                telephone: values.telephone,
            }

            if(!isSignedIn){
                await setGuestEmailOnCart({variables: {cartId, email: values.email}})
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
                type: "SET_SHIPPING_DETAILS",
                payload: {
                    ...shippingDetails,
                    email: values.email,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    city: values.city,
                    street: values.street,
                    building: values.building,
                    apartment: values.apartment,
                    telephone: values.telephone,
                    joining_club: values.joining_club,
                    confirm_terms: values.confirm_terms,
                    receive_announcements: values.receive_announcements,
                    delivery: values.delivery,
                }});
            await handleCustomerDetails({...values});
            await resetForm();
            await handleStep("SENDING");
            setStepOneDone(true);
        } catch (e) {
            Alert.alert(e.message)
        }

    }, [customerBillingAddresses, customerShippingAddresses, customerShippingMethod, cartId, isSignedIn]);

    const handleEmailAvailable = async value => {
        try {
            const res = await checkEmailAvailable({
                variables: {
                    email: value
                }
            });
            if(res && res.data && res.data.isEmailAvailable){
                setEmailAvailable(res.data.isEmailAvailable.is_email_available);
            }
        } catch (e) {
            console.log(e);
            Alert.alert(JSON.stringify(e.message))
        }
    }

    const onLogin = async values => {
        setLoadingLogin(true);
        try {
            const sourceCartId = cartId;
            const res = await signIn(values);

            if (res){
                const destinationCartId = await retrieveCartId();
                await mergeCarts({
                    variables: {
                        destinationCartId,
                        sourceCartId
                    }
                });
                await createCart();
                setLoadingLogin(false);
            }
        } catch (e) {
            console.log(e);
            Alert.alert(e.message);
            setLoadingLogin(false);
        }
    }

    useEffect(() => {
        setInitialValues({
            ...initialValues,
            email: shippingDetails?.email || '',
            firstname: shippingDetails?.firstname || '',
            lastname: shippingDetails?.lastname || '',
            city: shippingDetails?.city || '',
            street: shippingDetails?.street || '',
            building: shippingDetails?.building || '',
            apartment: shippingDetails?.apartment || '',
            telephone: shippingDetails?.telephone || ''
        })
    }, [shippingDetails, loadingLogin]);

    return {
        loadingLogin,
        isSignedIn,
        isEmailAvailable,
        initialValues,
        customerDetails: shippingDetails,
        handleEmailAvailable,
        onSubmit,
        onLogin,
        loading: customerBillingAddressesLoading || customerShippingAddressesLoading || customerShippingMethodLoading || guestEmailOnCartLoading,
    }
}

export default useFormDetails