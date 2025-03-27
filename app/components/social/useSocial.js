import {useMutation} from "@apollo/client";
import {ADD_PRODUCT_TO_WISHLIST} from "../wishlist/wishlist.gql";
import {useCallback, useState} from "react";
import {Alert, Linking} from "react-native";
import useUserContext from "../../context/user/userProvider";
import useStoreContext from "../../context/store/storeProvider";
import {router} from "expo-router";

const useSocial = ({product = null}) => {
    const {getUserData} = useUserContext();
    const [errorMessage, setErrorMessage] = useState([]);
    const [fetchAddProductToWishlist, {loading}] = useMutation(ADD_PRODUCT_TO_WISHLIST);

    const handleWishlistItem = useCallback(async () => {
        setErrorMessage([]);
        try {
            await fetchAddProductToWishlist({variables: {sku: product.sku}});
            await getUserData();
            router.navigate('/wishlist');
        } catch (error) {
            console.error(error);
            // Alert.alert(error.message)
            setErrorMessage([error.message])
        }
    }, [fetchAddProductToWishlist, product]);

    const {storeConfig} = useStoreContext();
    const {base_url} = storeConfig;

    const onShare = async () => {
        const shareMessage = `${base_url}${product.url_key}${product.url_suffix}`
        const url = `https://api.whatsapp.com/send?text=${shareMessage}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Error', 'WhatsApp is not installed on the device');
        }
    };

    return {
        handleWishlistItem,
        loading,
        onShare,
        errorMessage, onErrorMessage: setErrorMessage
    }
}

export default useSocial;