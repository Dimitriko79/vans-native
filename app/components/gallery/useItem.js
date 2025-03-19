import { useMemo, useCallback } from "react";
import { router } from "expo-router";
import useUserContext from "../../context/user/userProvider";

const useItem = (item = {}) => {

    const { wishlist, isSignedIn} = useUserContext();

    const price = useMemo(() => {
        return item?.price_range?.maximum_price?.regular_price || { value: 0, currency: "ILS" };
    }, [item]);

    const handlePress = useCallback((url_key) => {
        if (url_key) {
            router.push({ pathname: "/product", params: { urlKey: url_key } });
        }
    }, []);

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
        isAddedToWishlist
    };
};

export default useItem;
