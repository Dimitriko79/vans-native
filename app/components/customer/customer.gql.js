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

export const CHANGE_CUSTOMER_PASSWORD = gql`
     mutation changeCustomerPassword($currentPassword: String! $newPassword: String!) {
        changeCustomerPassword(currentPassword: $currentPassword newPassword: $newPassword){
            firstname
            lastname
        }
     }
`;