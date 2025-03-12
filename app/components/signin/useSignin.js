import { useCallback, useState, useMemo } from "react";
import useUserContext from "../../context/user/userProvider";
import useCartProvider from "../../context/cart/cartProvider";
import { router } from "expo-router";

const useSignin = () => {
    const { cartId, retrieveCartId, mergeCarts, startFetchCart } = useCartProvider();
    const { signIn } = useUserContext();

    const [errorMessage, setErrorMessage] = useState([]);
    const [loading, setLoading] = useState(false);

    const initialValues = useMemo(() => ({
        email: '',
        password: '',
        telephone: ''
    }), []);

    const onSubmit = useCallback(async (values, type, resetForm) => {
        if (loading) return;

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
                    } catch (mergeError) {
                        console.error(mergeError);
                        setErrorMessage([mergeError.message]);
                    }
                }

                resetForm();
                setLoading(false);

                if (router.pathname !== "/homepage") {
                    router.push({ pathname: "/homepage" });
                }
            }
        } catch (e) {
            console.error(e);
            setErrorMessage([e.message]);
            setLoading(false);
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
