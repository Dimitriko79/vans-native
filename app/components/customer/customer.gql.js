import {gql} from "@apollo/client";

export const UPDATE_CUSTOMER_QUERY = gql`
    mutation updateCustomerInformation($input: CustomerInput!) {
        updateCustomer(input: $input){
            customer{
                email
                firstname
                lastname
        }
    }
}
`;

export const UPDATE_CUSTOMER_ADDRESS = gql`
    mutation updateCustomerInformation($id: Int!, $input: CustomerAddressInput) {
        updateCustomerAddress(id: $id input: $input ){
          telephone
        }
   }
`;