import {gql} from "@apollo/client";

export const REMOVE_CUSTOMER_ADDRESS = gql`
    mutation removeCustomerAddress($id: Int!) {
        deleteCustomerAddress(id: $id)
    }
`;

export const CREATE_CUSTOMER_ADDRESS = gql`
mutation createCustomerAddress($input: CustomerAddressInput!) {
  createCustomerAddress(input: $input) {
    city
    company
    country_code
    country_id
    custom_attributes {
      attribute_code
      value
    }
    customer_id
    default_billing
    default_shipping
    extension_attributes {
      attribute_code
      value
    }
    fax
    firstname
    id
    lastname
    middlename
    postcode
    prefix
    region {
      region
      region_code
      region_id
    }
    region_id
    street
    suffix
    telephone
    vat_id
  }
}
`;

export const UPDATE_CUSTOMER_ADDRESS = gql`
mutation updateCustomerAddress($id: Int!, $input: CustomerAddressInput!) {
  updateCustomerAddress(id: $id, input: $input) {
    city
    company
    country_code
    country_id
    custom_attributes {
      attribute_code
      value
    }
    customer_id
    default_billing
    default_shipping
    extension_attributes {
      attribute_code
      value
    }
    fax
    firstname
    id
    lastname
    middlename
    postcode
    prefix
    region {
      region
      region_code
      region_id
    }
    region_id
    street
    suffix
    telephone
    vat_id
  }
}
`;