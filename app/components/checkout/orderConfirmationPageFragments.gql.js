import { gql } from '@apollo/client';
import {ItemsReviewFragment} from "./itemsReview/itemsReviewFragments.gql";

export const OrderConfirmationPageFragment = gql`
    fragment OrderConfirmationPageFragment on Cart {
        id
        email
        total_quantity
        shipping_addresses {
            firstname
            lastname
            street
            city
            postcode
            country {
                label
            }
            selected_shipping_method {
                amount {
                    value
                    currency
                }
                carrier_title
                method_title
            }
        }
        billing_address {
            firstname
            lastname
            street
            city
            postcode
            country {
                label
            }
        }
        selected_payment_method {
            purchase_order_number
            title
        }
        prices {
            grand_total {
                value
                currency
            }
            discounts {
                amount {
                    currency
                    value
                }
                label
            }
        }
        ...ItemsReviewFragment
    }
    ${ItemsReviewFragment}
`;
