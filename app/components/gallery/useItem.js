import {router} from "expo-router";

export const useItem = item => {
    const { price_range } = item;
    const { maximum_price } = price_range;
    const {regular_price} = maximum_price;
    const handlePress = url_key => {
        return  router.push({ pathname: "/product", params: { urlKey: url_key } })
    }
    return {
        price: regular_price,
        handlePress
    }
}