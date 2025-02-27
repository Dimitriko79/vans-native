import {gql} from "@apollo/client";

export const ADD_SIMPLE_MUTATION = gql`
    mutation addSimpleProductToCart(
        $cartId: String!
        $quantity: Float!
        $sku: String!
    ) {
        addSimpleProductsToCart(
            input: {
                cart_id: $cartId
                cart_items: [{ data: { quantity: $quantity, sku: $sku } }]
            }
        ) {
            cart {
                id
            }
        }
    }
`;

export const ADD_CONFIGURABLE_MUTATION = gql`
    mutation addConfigurableProductToCart(
        $cartId: String!
        $quantity: Float!
        $sku: String!
        $parentSku: String!
    ) {
        addConfigurableProductsToCart(
            input: {
                cart_id: $cartId
                cart_items: [
                    {
                        data: { quantity: $quantity, sku: $sku }
                        parent_sku: $parentSku
                    }
                ]
            }
        ) {
            cart {
                id
            }
        }
    }
`;
