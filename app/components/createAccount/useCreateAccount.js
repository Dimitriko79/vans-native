import {useCallback, useState} from "react";
import {Alert} from "react-native";
import {useMutation} from "@apollo/client";
import {CREATE_ACCOUNT} from "./createAccaunt.gql";
import {router} from "expo-router";

const useCreateAccount = () => {

    const [errorMessage, setErrorMessage] = useState([]);
    const [isOpenCalendar, setOpenCalendar] = useState(false);
    const [loading, setLoading] = useState(false);


    const initialValues = {
        firstname: '',
        lastname: '',
        date_birth: '',
        telephone: '',
        email: '',
        password: '',
        approve_password: '',
        joining_club: '',
        receive_announcements: '',
        is_subscribed: false
    };

    const [createAccount] = useMutation(
        CREATE_ACCOUNT,
        {
            fetchPolicy: 'no-cache'
        }
    );

    const onSubmit = useCallback(async (values, resetForm) => {
        setLoading(true);
        setErrorMessage([]);
        try {
            const input = {
                date_of_birth: values.date_birth,
                email: values.email,
                firstname: values.firstname,
                lastname: values.lastname,
                password: values.password,
                is_subscribed: values.is_subscribed,
            }
            await createAccount({
                variables: {
                    input: input,
                }
            })
            setLoading(false);
            router.navigate('/homepage');
        } catch (e) {
            setLoading(false);
            console.error(e);
            setErrorMessage([e.message]);
        }
    }, [createAccount, setErrorMessage]);


    return {
        isOpenCalendar,
        setOpenCalendar,
        onSubmit,
        errorMessage,
        onErrorMessage: setErrorMessage,
        loading,
        initialValues
    }
}

export default useCreateAccount;