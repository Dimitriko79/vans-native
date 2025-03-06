import {gql} from "@apollo/client";

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

