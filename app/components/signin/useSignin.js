import {Alert} from "react-native";
import {useState} from "react";

const useSignin = () => {
    const [errorMessage, setErrorMessage] = useState([]);
    const initialValuesPhone = {
        telephone: ''
    }

    const initialValuesMail = {
        telephone: '',
        password: ''
    }

    const onSubmit = values => {
        Alert.alert(JSON.stringify(values));
    }

    return {
        errorMessage,
        onErrorMessage: setErrorMessage,
        initialValuesPhone,
        initialValuesMail,
        onSubmit
    }
}

export default useSignin