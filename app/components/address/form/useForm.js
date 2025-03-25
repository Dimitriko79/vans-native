import useUserContext from "../../../context/user/userProvider";
import {useCallback, useEffect, useState} from "react";
import {router} from "expo-router";
import {useMutation} from "@apollo/client";
import {CREATE_CUSTOMER_ADDRESS, UPDATE_CUSTOMER_ADDRESS} from "../address.gql";

const useForm = ({ onErrorMessage = [], setIsAddingAddress = () => {}, address = null, setUpdateAddress = () => {}}) => {
    const {user, getUserData, setUserUpdate} = useUserContext();

    const [fetchCustomerAddress] = useMutation(CREATE_CUSTOMER_ADDRESS);
    const [fetchUpdateCustomerAddress] = useMutation(UPDATE_CUSTOMER_ADDRESS);

    const defaultValues = {
        firstname: '',
        lastname: '',
        company: '',
        telephone: '',
        city: '',
        street: '',
        default_billing: false,
        default_shipping: false,
    };

    const [initialValues, setInitialValues] = useState(defaultValues);
    const [loading, setLoading] = useState(false);
    const isUpdateAddress = Object.keys(address).length !== 0;
    const isDefaultBillingAddress = address?.default_billing;
    const isDefaultShippingAddress = address?.default_shipping;

    const onSubmit = useCallback(async values => {
        try {
            setLoading(true);
            onErrorMessage([]);
            const payload = {
                firstname: values.firstname,
                lastname: values.lastname,
                company: values.company,
                telephone: values.telephone,
                city: values.city,
                street: [values.street],
                default_billing: values.default_billing,
                default_shipping: values.default_shipping,
                country_code: 'IL',
            }
            const res = await fetchCustomerAddress({ variables: { input: payload } });
            if(res?.data){
                await getUserData();
                setLoading(false);
                setIsAddingAddress(false);
                setUserUpdate(true);
                router.push({ pathname: "/account" });
            }
        } catch (e) {
            console.log(e);
            onErrorMessage([e.message]);
            setLoading(false);
        }
    }, [getUserData,]);

    const onUpdate = useCallback(async values => {
        try {
            setLoading(true);
            onErrorMessage([]);
            const payload = {
                firstname: values.firstname,
                lastname: values.lastname,
                company: values.company,
                telephone: values.telephone,
                city: values.city,
                street: [values.street],
                country_code: 'IL',
            }
            const res = await fetchUpdateCustomerAddress({ variables: {id: address.id, input: payload } });
            if(res?.data){
                await getUserData();
                setLoading(false);
                setUpdateAddress(null);
                setUserUpdate(true);
                router.push({ pathname: "/account" });
            }
        } catch (e) {
            console.log(e);
            onErrorMessage([e.message]);
            setLoading(false);
        }
    }, [getUserData,]);

    useEffect(() => {
        if(isUpdateAddress){
            setInitialValues(prevState => ({
                ...prevState,
                firstname: address?.firstname || '',
                lastname: address?.lastname || '',
                company: address?.company,
                telephone: address?.telephone || '',
                city: address?.city || '',
                street: address?.street[0] || '',
            }));
        } else {
            setInitialValues(prevState => ({
                ...prevState,
                firstname: user?.firstname || '',
                lastname: user?.lastname || '',
            }));
        }
    }, [user, isUpdateAddress]);

    return {
        user,
        initialValues,
        onSubmit,
        onUpdate,
        loading,
        isUpdateAddress,
        isDefaultBillingAddress,
        isDefaultShippingAddress,
        setIsAddingAddress,
        setUpdateAddress
    }
}

export default useForm;