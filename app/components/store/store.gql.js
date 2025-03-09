import {gql} from "@apollo/client";

export const GET_STORE_CONFIG = gql`
    query getStoreConfig {
        storeConfig{
            absolute_footer
            base_currency_code
            base_link_url
            base_media_url
            base_static_url
            base_url
            catalog_default_sort_by
            category_url_suffix
            cms_home_page
            cms_no_cookies
            cms_no_route
            code
            copyright
            default_description
            default_display_currency_code
            default_keywords
            default_title
            demonotice
            front
            grid_per_page
            grid_per_page_values
            head_includes
            header_logo_src
            id
            list_mode
            list_per_page
            list_per_page_values
            locale
            logo_alt
            no_route
            product_url_suffix
            root_category_id
            secure_base_link_url
            secure_base_media_url
            secure_base_static_url
            secure_base_url
            show_cms_breadcrumbs
            store_name
            timezone
            title_prefix
            title_separator
            title_suffix
            website_id
            weight_unit
            welcome
        }
    }
`;

export const GET_COUNTRIES = gql`
    query{
        countries{
            id
        }
    }
`;

export const GET_COUNTRY_BY_ID = gql`
    query($id: String!) {
        country(id: $id) {
    available_regions{
      code
      id
      name
    }
    full_name_english
    full_name_locale
    id
    three_letter_abbreviation
    two_letter_abbreviation
  }
    }
`;