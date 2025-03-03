import {gql} from "@apollo/client";
import { MiniCartFragment } from './miniCartFragments.gql';
import {CartPageFragment} from "../cart/cartPageFragments.gql";

export const MINI_CART_QUERY = gql`
  query MiniCartQuery($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      ...MiniCartFragment
    }
  }
   ${MiniCartFragment}
`;

export const REMOVE_ITEM_MUTATION = gql`
    mutation RemoveItemForMiniCart($cartId: String!, $itemId: ID!) {
        removeItemFromCart(
            input: { cart_id: $cartId, cart_item_uid: $itemId }
        ) {
            cart {
                id
                ...MiniCartFragment
                ...CartPageFragment
            }
        }
    }
    ${MiniCartFragment}
    ${CartPageFragment}
`;