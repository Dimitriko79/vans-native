import { useMemo, useCallback } from "react";
import { router } from "expo-router";
import {useMutation} from "@apollo/client";
import {ADD_PRODUCT_TO_WISHLIST} from "../wishlist/wishlist.gql";
import {Alert} from "react-native";
import useUserContext from "../../context/user/userProvider";

const useItem = (item = {}) => {

    const {getUserData, wishlist, isSignedIn} = useUserContext();
    const [fetchAddProductToWishlist] = useMutation(ADD_PRODUCT_TO_WISHLIST);

    const price = useMemo(() => {
        return item?.price_range?.maximum_price?.regular_price || { value: 0, currency: "ILS" };
    }, [item]);

    const handlePress = useCallback((url_key) => {
        if (url_key) {
            router.push({ pathname: "/product", params: { urlKey: url_key } });
        }
    }, []);

    const handleWishlist = useCallback(async item => {
        try {
            await fetchAddProductToWishlist({variables: {sku: item.sku}});
            await getUserData();
        } catch (error) {
            console.error(error);
            Alert.alert(error.message)
        }
    }, [fetchAddProductToWishlist]);

    const isAddedToWishlist = useMemo(() => {
        if(wishlist && wishlist.items && wishlist.items.length) {
            return !!wishlist.items.find(value => value.product.sku === item.sku);
        }
        return false;
    }, [wishlist]);

    return {
        price,
        isSignedIn,
        handlePress,
        handleWishlist,
        isAddedToWishlist
    };
};

export default useItem;
