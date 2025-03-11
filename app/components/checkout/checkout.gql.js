import {gql} from "@apollo/client";
import {OrderConfirmationPageFragment} from "./orderConfirmationPageFragments.gql";
import {CheckoutPageFragment} from "./checkoutPageFragments.gql";
import {ItemsReviewFragment} from "./itemsReview/itemsReviewFragments.gql";

export const SET_CUSTOMER_SHIPPING_ADDRESSES_ON_CART = gql`
    mutation SetShippingAddressForEstimate(
        $cartId: String!
        $address: CartAddressInput!
    ) {
        setShippingAddressesOnCart(
            input: {
                cart_id: $cartId
                shipping_addresses: [{ address: $address }]
            }
        ) {
            cart {
                id
                total_quantity
                email
            }
        }
    }
`;

export const SET_CUSTOMER_SHIPPING_METHOD_ON_CART = gql`
    mutation($cartId: String!,  $carrierCode: String!, $methodCode: String!) {
        setShippingMethodsOnCart(
            input: {
                cart_id: $cartId
                shipping_methods: [
                    {carrier_code: $carrierCode, method_code: $methodCode }
                ]
            }
        ) {
            cart {
                id
            }
        }
    }
`;

export const SET_CUSTOMER_BILLING_ADDRESSES_ON_CART = gql`
    mutation($cartId: String!, $address: CartAddressInput!) {
        setBillingAddressOnCart(
            input: { cart_id: $cartId, billing_address: { address: $address } }
        ) {
            cart {
                id
                total_quantity
                email
            }
        }
    }
`;

export const SET_CUSTOMER_PAYMENT_METHOD_ON_CART = gql`
    mutation($cartId: String!, $code: String!) {
        setPaymentMethodOnCart(
            input: { cart_id: $cartId, payment_method: { code: $code } }
        ) {
            cart {
                id
            }
        }
    }
`;

export const IS_EMAIL_AVAILABLE = gql`
    query ($email: String!){
        isEmailAvailable(email: $email){
            is_email_available
        }
    }
`;

export const SET_GUEST_EMAIL_ON_CART = gql`
    mutation($cartId: String! $email: String!){
        setGuestEmailOnCart(input: {cart_id: $cartId email: $email}){
            cart{
                id
            }
        }
    }
`;
export const PLACE_ORDER = gql`
    mutation ($cartId: String!){
        placeOrder(input: {cart_id: $cartId}){
            order{
                order_number
            }
        }
    }
`;

export const GET_ORDER_DETAILS = gql`
    query getOrderDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...OrderConfirmationPageFragment
        }
    }
    ${OrderConfirmationPageFragment}
`;

export const GET_CHECKOUT_DETAILS = gql`
    query getCheckoutDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...CheckoutPageFragment
            ...ItemsReviewFragment
        }
    }
    ${CheckoutPageFragment}
    ${ItemsReviewFragment}
`;

