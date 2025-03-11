import {Alert} from "react-native";
import {useState} from "react";
import useUserContext from "../../context/user/userProvider";
import useCartProvider from "../../context/cart/cartProvider";
import {router} from "expo-router";

const useSignin = () => {

    const {cartId, retrieveCartId, mergeCarts, startFetchCart} = useCartProvider();
    const {signIn} = useUserContext();

    const [errorMessage, setErrorMessage] = useState([]);
    const [loading, setLoading] = useState(false);

    const initialValues = {
        email: '',
        password: '',
        telephone: ''
    }

    const onSubmit = async (values, type, resetForm) => {
        setLoading(true);
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
                resetForm();
                setLoading(false);
                if (router.pathname !== "/homepage") {
                    router.push({ pathname: "/homepage"});
                }
            }
        } catch (e) {
            console.log(e);
            Alert.alert(e.message);
            setLoading(false);
        }
    }

    return {
        loading,
        errorMessage,
        onErrorMessage: setErrorMessage,
        initialValues,
        onSubmit
    }
}

export default useSignin