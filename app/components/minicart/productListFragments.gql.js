import { gql } from '@apollo/client';

export const ProductListFragment = gql`
    fragment ProductListFragment on Cart {
        id
        items {
            id
            product {
                id
                name
                sku
                url_key
                image {
                    url
                }
                thumbnail {
                    label
                    url
                }
                stock_status
                ... on ConfigurableProduct {
                    variants {
                        attributes {
                            code
                            label
                            value_index
                        }
                        product {
                            id
                            thumbnail {
                                label
                                url
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
                total_item_discount {
                    currency
                    value
                }
            }
            quantity
            ... on ConfigurableCartItem {
                configurable_options {
                    id
                    option_label
                    value_id
                    value_label
                }
            }
        }
    }
`;
