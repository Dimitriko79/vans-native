export const initialState = {
    cartId: null,
    details: null, // Детали корзины
    isFetchingCart: false,
    error: null
};

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART_ID':
            return { ...state, cartId: action.payload };
        case 'FETCH_CART_START':
            return { ...state, isFetchingCart: true, error: null };
        case 'FETCH_CART_SUCCESS':
            return { ...state, cartId: action.payload, isFetchingCart: false };
        case 'FETCH_CART_ERROR':
            return { ...state, error: action.payload, isFetchingCart: false };
        case 'REMOVE_CART_ID':
            return { ...state, cartId: null, details: null };
        case 'GET_CART_DETAILS_SUCCESS':
            return { ...state, details: action.payload };
        default:
            return state;
    }
};