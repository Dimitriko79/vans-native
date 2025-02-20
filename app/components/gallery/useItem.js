export const useItem = item => {
    const { price_range } = item;
    const { maximum_price } = price_range;
    const {regular_price} = maximum_price;

    return {
        price: regular_price
    }
}