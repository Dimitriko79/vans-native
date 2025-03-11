export const initialState = {
    shippingDetails: null,
    cart_id: null,
    amount: 0.00,
    payment: null,
    products: [],
    order_number: ''
};

export const checkoutReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SHIPPING_DETAILS':
            return { ...state, shippingDetails: action.payload };
        case 'CHECKOUT_PLACE_ORDER_BUTTON_CLICKED':
            return {
                ...state,
                cart_id: action.payload.cart_id,
                amount: action.payload.amount,
                shipping: action.payload.shipping,
                payment: action.payload.payment,
                products: action.payload.products
            };
            case 'ORDER_CONFIRMATION_PAGE_VIEW':
                return {
                    ...state,
                    order_number: action.payload
                };
        default:
            return state;
    }
};