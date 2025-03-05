import { gql } from '@apollo/client';

export const CheckoutPageFragment = gql`
    fragment CheckoutPageFragment on Cart {
        id
        items {
            id
            product {
                id
                stock_status
            }
        }
        billing_address{
        city
        company
        country{
          code
          label
        }
        firstname
        lastname
        postcode
        region{
          code
          label
        }
        street
        telephone
      }
      shipping_addresses{
        city
        company
        country{
          code
          label
        }
        firstname
        lastname
        postcode
        region{
          code
          label
        }
        street
        telephone
      }
      prices{
        applied_taxes{
          amount {
            currency
            value
          }
          label
        }
        discounts{
          amount {
            currency
            value
          }
          label
        }
        grand_total{
          currency
          value
        }
        subtotal_excluding_tax{
          currency
          value
        }
        subtotal_including_tax{
          currency
          value
        }
        subtotal_with_discount_excluding_tax{
          currency
          value
        }
      }
        total_quantity
        available_payment_methods {
            code
        }
    }
`;
