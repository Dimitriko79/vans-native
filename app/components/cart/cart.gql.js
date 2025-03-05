import {gql} from "@apollo/client";
import {CartTriggerFragment} from "./cartTriggerFragments.gql";
import {CheckoutPageFragment} from "../checkout/checkoutPageFragments.gql";
import {ItemsReviewFragment} from "../checkout/itemsReview/itemsReviewFragments.gql";
import {ProductListFragment} from "../minicart/productListFragments.gql";

export const CREATE_CART_MUTATION = gql`
    mutation createCart {
        cartId: createEmptyCart
    }
`;

export const GET_CART_DETAILS = gql`
    query GetCartDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...CheckoutPageFragment
            ...ItemsReviewFragment
            ...ProductListFragment
        }
    }
    ${CheckoutPageFragment}
    ${ItemsReviewFragment}
    ${ProductListFragment}
`;

export const GET_ITEM_COUNT_QUERY = gql`
    query getItemCount($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...CartTriggerFragment
        }
    }
    ${CartTriggerFragment}
`;