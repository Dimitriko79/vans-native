export const initialState = {
    storeConfig: null,
    country: null
};

export const storeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_STORE_CONFIG':
            return { ...state, storeConfig: action.payload };
        case 'SET_COUNTRY':
            return { ...state, country: action.payload };
        default:
            return state;
    }
};