import {gql} from "@apollo/client";

export const CREATE_ACCOUNT = gql`
    mutation($input: CustomerInput!) {
        createCustomer(input: $input){
        customer {
            firstname
            lastname
            email
        }
    }
    }
`;