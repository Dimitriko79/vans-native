import {gql} from "@apollo/client";

export const ADD_PRODUCT_TO_WISHLIST = gql`
    mutation addProductToWishlist($sku: String!) {
        addProductToWishlist(sku: $sku) {
            id
            items_count
        }
    }
`;

export const REMOVE_PRODUCT_FROM_WISHLIST = gql`
    mutation removeProductFromWishlist($id: Int!) {
        removeProductFromWishlist(itemId: $id){
            items_count
            result
        }
    }
`;