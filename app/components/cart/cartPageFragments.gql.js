import { gql } from '@apollo/client';
import {ProductListingFragment} from "./productListingFragments.gql";


export const CartPageFragment = gql`
    fragment CartPageFragment on Cart {
        id
        total_quantity
        ...ProductListingFragment
    }
    ${ProductListingFragment}
`;
