import { gql } from '@apollo/client';

export const GET_NAVIGATION_MENU = gql`
    query GetNavigationMenu($id: String!) {
        categoryList(filters: {ids: {eq: $id}}){
            id
            include_in_menu
            name
            path
            path_in_store
            url_key
            url_path
            children{
                id
                position
                children_count
                include_in_menu
                name
                path
                path_in_store
                url_key
                url_path
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
    query {
        storeConfig {
            code
            root_category_id
        }
    }
`;