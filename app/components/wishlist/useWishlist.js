import useUserContext from "../../context/user/userProvider";
import {useCallback} from "react";
import {Alert} from "react-native";
import {useMutation} from "@apollo/client";
import {REMOVE_PRODUCT_FROM_WISHLIST} from "./wishlist.gql";

const useWishlist = () => {
    const {user, getUserData} = useUserContext();

    const [fetchRemoveProductFromWishlist, {loading}] = useMutation(REMOVE_PRODUCT_FROM_WISHLIST);

    const handleWishlist = useCallback(async id => {
        try {
            await fetchRemoveProductFromWishlist({variables: {id: id}});
            await getUserData();
        } catch (error) {
            console.error(error);
            Alert.alert(error.message)
        }
    }, [fetchRemoveProductFromWishlist]);

    const items = user?.wishlist?.items || [];

    return {
        items,
        handleWishlist,
        loading
    }

}

export default useWishlist;