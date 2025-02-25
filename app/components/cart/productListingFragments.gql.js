import { gql } from '@apollo/client';

export const ProductListingFragment = gql`
    fragment ProductListingFragment on Cart {
        id
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        items {
            id
            product {
                id
                name
                sku
                url_key
                thumbnail {
                    url
                    label
                }
                small_image {
                    url
                    label
                }
                stock_status
                ... on ConfigurableProduct {
                    variants {
                        attributes {
                            label
                            code
                            value_index
                        }
                        product {
                            id
                            stock_status
                            small_image {
                                url
                                label
                            }
                        }
                    }
                }
            }
            prices {
                price {
                    currency
                    value
                }
                row_total {
                    value
                }
                total_item_discount {
                    value
                }
            }
            quantity
        }
    }
`;
