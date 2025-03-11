export const initialState = {
    cartId: null,
    cart: null,
    isFetchingCart: true,
    error: null
};

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART_ID':
            return { ...state, cartId: action.payload };
        case 'IS_FETCHING_CART':
            return { ...state, isFetchingCart: action.payload, error: null };
        case 'CART_ERROR':
            return { ...state, error: action.payload };
        case 'REMOVE_CART_ID':
            return { ...state, cartId: null, cart: null };
        case 'SET_CART_DETAILS':
            return { ...state, cart: action.payload, isFetchingCart: false };
        default:
            return state;
    }
};