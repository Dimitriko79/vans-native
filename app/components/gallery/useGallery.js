import {useCallback} from "react";
import {Alert} from "react-native";
import {useMutation} from "@apollo/client";
import {ADD_PRODUCT_TO_WISHLIST} from "../wishlist/wishlist.gql";
import useUserContext from "../../context/user/userProvider";

const useGallery = () => {

    const {getUserData} = useUserContext();
    const [fetchAddProductToWishlist, {loading}] = useMutation(ADD_PRODUCT_TO_WISHLIST);

    const handleWishlistItem = useCallback(async item => {
        try {
            await fetchAddProductToWishlist({variables: {sku: item.sku}});
            await getUserData();
        } catch (error) {
            console.error(error);
            Alert.alert(error.message)
        }
    }, [fetchAddProductToWishlist]);

    return {
        handleWishlistItem,
        loading
    }
}

export default useGallery;