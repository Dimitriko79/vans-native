import {useCallback, useEffect, useState} from "react";
import useUserContext from "../../context/user/userProvider";
import {useMutation} from "@apollo/client";
import {CHANGE_CUSTOMER_PASSWORD, UPDATE_CUSTOMER_ADDRESS, UPDATE_CUSTOMER_QUERY} from "./customer.gql";
import {router} from "expo-router";

const useCustomer = () => {
    const {user, getUserData, setUserUpdate} = useUserContext();
    const [errorMessage, setErrorMessage] = useState([]);

    const defaultValues = {
        email: '',
        current_password: '',
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
    const [isUpdateEmail, setUpdateEmail] = useState(false);
    const [isUpdatePassword, setUpdatePassword] = useState(false);

    const [updateCustomer] = useMutation(UPDATE_CUSTOMER_QUERY);
    const [changeCustomerPassword, {error}] = useMutation(CHANGE_CUSTOMER_PASSWORD);
    const [updateCustomerAddress] = useMutation(UPDATE_CUSTOMER_ADDRESS);

    const onSubmit = useCallback(async (values, resetForm) => {
        try {
            setLoading(true);
            let payload = {
                firstname: values.firstname,
                lastname: values.lastname,
                date_of_birth: values.date_birth
            }
            if (values.update_email) {
                payload.email = values.email;
            } else {
                delete payload.email;
            }

            if (isUpdatePassword) {
                payload.password = values.password;
            } else {
                delete payload.password;
            }
            await updateCustomer({variables: {input: payload}});

            if(user.addresses && user.addresses.length && values.telephone && values.telephone !== ''){
                payload = {
                    id: user.addresses[0].id,
                    input: {telephone: values.telephone}
                }
                await updateCustomerAddress({variables: payload})
            }
            if (values.update_password) {
                payload = {
                    currentPassword: values.current_password,
                    newPassword: values.password
                }
                await changeCustomerPassword({variables: {currentPassword: payload.currentPassword, newPassword: payload.newPassword}});
            } else {
                delete payload.currentPassword;
                delete payload.newPassword;
            }
            await getUserData();
            setLoading(false);
            setUserUpdate(true);
            router.push({ pathname: "/account" });
        } catch (e) {
            console.log(e);
            setErrorMessage([e.message]);
            setLoading(false);
        }
    }, [updateCustomer, getUserData, changeCustomerPassword]);

    useEffect(() => {
        setInitialValues(prevState => ({
            ...prevState,
            firstname: user?.firstname || '',
            lastname: user?.lastname || '',
            date_birth: user?.date_of_birth || '',
            email: user?.email || ''
        }));
    }, [user]);

    return {
        user,
        initialValues,
        onSubmit,
        loading,
        isUpdateEmail, setUpdateEmail,
        isUpdatePassword, setUpdatePassword,
        errorMessage,
        onErrorMessage: setErrorMessage
    }
}

export default useCustomer;