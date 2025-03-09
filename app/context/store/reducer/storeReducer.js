export const initialState = {
    storeConfig: null
};

export const storeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_STORE_CONFIG':
            return { ...state, storeConfig: action.payload };
        default:
            return state;
    }
};