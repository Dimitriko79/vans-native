import {gql} from "@apollo/client";

export const GET_HOMEPAGE = gql`
query getHomepage{
  getNewsData{
    image
    link
    title
  }
  getShopByData{
    image
    sub_links{
    title
     url
    }
    title
    url
  }
  getShopNowData{
    description
    image
    link
    text
    title
  }
  getPopularProducts {
    title
    popular_products {
        title
        image
        url
        price
    }
  }
  getMainBannerData {
   title
   link
   image
  }
}
`;