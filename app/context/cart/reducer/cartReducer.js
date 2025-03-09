export const initialState = {
    cartId: null,
    details: null,
    isFetchingCart: true,
    shippingCustomerDetails: null,
    error: null
};

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART_ID':
            return { ...state, cartId: action.payload };
        case 'FETCH_IS_FETCHING_CART':
            return { ...state, isFetchingCart: action.payload, error: null };
        case 'SET_SHIPPING_CUSTOMER_DETAILS':
            return { ...state, shippingCustomerDetails: action.payload };
        case 'FETCH_CART_SUCCESS':
            return { ...state, cartId: action.payload };
        case 'FETCH_CART_ERROR':
            return { ...state, error: action.payload };
        case 'REMOVE_CART_ID':
            return { ...state, cartId: null, details: null };
        case 'SET_CART_DETAILS_SUCCESS':
            return { ...state, details: action.payload, isFetchingCart: false };
        default:
            return state;
    }
};