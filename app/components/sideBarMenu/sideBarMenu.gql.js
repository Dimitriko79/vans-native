import { gql } from '@apollo/client';

export const GET_NAVIGATION_MENU = gql`
    query GetNavigationMenu($id: String!) {
        categories(filters: { category_uid: { in: [$id] } }) {
            # eslint-disable-next-line @graphql-eslint/require-id-when-available
            items {
                uid
                name
                # eslint-disable-next-line @graphql-eslint/require-id-when-available
                children {
                    children_count
                    uid
                    include_in_menu
                    name
                    position
                    url_path
                    url_suffix
                    show_on_mobile
                }
                children_count
                include_in_menu
                url_path
                show_on_mobile
            }
        }
    }
`;

export const GET_CUSTOMER = gql`
    query GetCustomerForLeftNav {
        customer {
            id
            email
            firstname
            lastname
            is_subscribed
            gtm {
                visitorId
                visitorType
            }
        }
    }
`;

export const GET_ROOT_CATEGORY_ID = gql`
    query getRootCategoryId {
        storeConfig {
            store_code
            root_category_uid
        }
    }
`;