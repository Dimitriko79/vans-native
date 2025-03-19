export const initialState = {
    isSignedIn: false,
    user: null,
    isFetchingUser: false,
    error: null,
    orders: [],
    wishlist: []
};

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER_DETAILS_SUCCESS':
            return { ...state, user: action.payload, isFetchingUser: false };
        case 'IS_FETCHING_USER':
            return { ...state, isFetchingUser: action.payload, error: null };
        case 'SET_IS_SIGNED_IN':
            return { ...state, isSignedIn: action.payload};
        case 'SET_CUSTOMER_ORDERS':
            return { ...state, orders: action.payload};
        case 'SET_WISHLIST_ITEMS':
            return { ...state, wishlist: action.payload};
        case 'USER_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};