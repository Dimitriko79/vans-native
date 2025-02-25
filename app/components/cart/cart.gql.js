import {gql} from "@apollo/client";
import {CartPageFragment} from "./cartPageFragments.gql";

export const CREATE_CART_MUTATION = gql`
    mutation createCart {
        cartId: createEmptyCart
    }
`;

export const CART_DETAILS_QUERY = gql`
    query checkUserIsAuthed($cartId: String!) {
        cart(cart_id: $cartId) {
            # The purpose of this query is to check that the user is authorized
            # to query on the current cart. Just fetch "id" to keep it small.
            id
        }
    }
`;

export const GET_CART_DETAILS = gql`
    query GetCartDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...CartPageFragment
        }
    }
    ${CartPageFragment}
`;