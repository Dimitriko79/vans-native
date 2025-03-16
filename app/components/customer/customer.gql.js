import {gql} from "@apollo/client";

export const UPDATE_CUSTOMER_QUERY = gql`
    mutation updateCustomerInformation($customerInput: CustomerInput!) {
        updateCustomer(input: $customerInput){
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