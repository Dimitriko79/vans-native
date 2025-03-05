import {gql} from "@apollo/client";

export const REMOVE_ITEM_MUTATION = gql`
    mutation RemoveItemForMiniCart($cartId: String!, $itemId: Int!) {
        removeItemFromCart(
            input: { cart_id: $cartId, cart_item_id: $itemId }
        ) {
            cart {
                id
            }
        }
    }
`;