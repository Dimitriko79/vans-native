import {useCallback, useState} from "react";
import {Alert} from "react-native";
import {useMutation} from "@apollo/client";
import {CREATE_ACCOUNT} from "./createAccaunt.gql";

const useCreateAccount = () => {

    const [errorMessage, setErrorMessage] = useState([]);
    const [isOpenCalendar, setOpenCalendar] = useState(false);

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

    const [createAccount, { loading: createAccountLoading,error: createAccountError }] = useMutation(
        CREATE_ACCOUNT,
        {
            fetchPolicy: 'no-cache'
        }
    );

    const onSubmit = useCallback(async (values, resetForm) => {
        Alert.alert(JSON.stringify(values));
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
            //TODO
        } catch (e) {
            console.error(e);
            Alert.alert(e.message);
            setErrorMessage([e.message]);
        }
    }, []);


    return {
        isOpenCalendar,
        setOpenCalendar,
        onSubmit,
        errorMessage,
        onErrorMessage: setErrorMessage,
        loading: createAccountLoading,
        initialValues
    }
}

export default useCreateAccount;