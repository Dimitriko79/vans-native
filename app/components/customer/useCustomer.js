import {useCallback, useEffect, useState} from "react";
import useUserContext from "../../context/user/userProvider";
import {Alert} from "react-native";
import {useMutation} from "@apollo/client";
import {UPDATE_CUSTOMER_ADDRESS, UPDATE_CUSTOMER_QUERY} from "./customer.gql";

const useCustomer = () => {
    const {user} = useUserContext();
    const defaultValues = {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        telephone: '',
        date_birth: '',
        approve_password: '',
        update_email: false,
        update_password: false,
    };
    const [initialValues, setInitialValues] = useState(defaultValues);
    const [loading, setLoading] = useState(false);

    const [updateCustomer, {error}] = useMutation(UPDATE_CUSTOMER_QUERY);
    const [updateCustomerAddress] = useMutation(UPDATE_CUSTOMER_ADDRESS);
    console.log(333, error)
    const onSubmit = async (values, resetForm) => {
        Alert.alert(JSON.stringify(values));
        try {
            setLoading(true);
            let payload = {
                firstname: values.firstname,
                lastname: values.lastname,
                date_birth: values.date_birth
            }
            if (values.update_email) {
                payload.email = values.update_email;
            }
            if (values.update_password) {
                payload.password = values.password;
            }
            console.log(777, payload)
            // const res = await updateCustomer({variables: {customerInput: payload}});
            // console.log(111, res.data)
        } catch (e) {

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInitialValues(prevState => ({
            ...prevState,
            firstname: user?.firstname || '',
            lastname: user?.lastname || '',
            date_birth: user?.date_of_birth || '',
            email: user?.email || '',
        }));
    }, [user]);

    return {
        initialValues,
        onSubmit,
        loading
    }
}

export default useCustomer;