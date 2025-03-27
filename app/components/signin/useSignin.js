import {useCallback, useState, useMemo} from "react";
import useUserContext from "../../context/user/userProvider";
import useCartProvider from "../../context/cart/cartProvider";
import { router } from "expo-router";

export const JOIN_REWARDS = [
    'בקרוב באתר הרשמה, מימוש וצבירת נקודות כחברי מועדון VANS',
    'תדעו על שיתופי פעולה, השקות ומבצעים לפני כולם'
]

const useSignin = () => {
    const { cartId, retrieveCartId, mergeCarts, startFetchCart } = useCartProvider();
    const { signIn, setView} = useUserContext();

    const [errorMessage, setErrorMessage] = useState([]);
    const [loading, setLoading] = useState(false);

    const initialValues = useMemo(() => ({
        email: '',
        password: '',
        telephone: ''
    }), []);

    const onSubmit = useCallback(async (values, type, resetForm) => {
        setLoading(true);
        setErrorMessage([]);

        try {
            const sourceCartId = cartId;
            const res = await signIn(values);

            if (res) {
                let destinationCartId;
                try {
                    destinationCartId = await retrieveCartId();
                } catch (cartError) {
                    setErrorMessage([cartError.message]);
                }

                if (sourceCartId && destinationCartId) {
                    try {
                        await mergeCarts({
                            variables: {
                                destinationCartId,
                                sourceCartId
                            }
                        });
                    } catch (e) {
                        console.error(e);
                        setErrorMessage([e.message]);
                    }
                }
                resetForm();
                setLoading(false);
                startFetchCart(true);
                router.push({ pathname: "/account" });
            }
        } catch (e) {
            setLoading(false);
            console.error(e);
            setErrorMessage([e.message]);
        }
    }, [loading, cartId, signIn, retrieveCartId, mergeCarts]);

    return {
        loading,
        errorMessage,
        onErrorMessage: setErrorMessage,
        initialValues,
        onSubmit
    };
};

export default useSignin;
