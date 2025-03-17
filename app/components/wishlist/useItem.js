import { useMemo, useCallback } from "react";
import { router } from "expo-router";

const useItem = (item = {}) => {
    const price = useMemo(() => {
        return item?.price_range?.maximum_price?.regular_price || { value: 0, currency: "ILS" };
    }, [item]);

    const handlePress = useCallback((url_key) => {
        if (url_key) {
            router.push({ pathname: "/product", params: { urlKey: url_key } });
        }
    }, []);

    return {
        price,
        handlePress
    };
};

export default useItem;
