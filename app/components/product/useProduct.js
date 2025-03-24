import { useQuery } from "@apollo/client";
import {GET_POPULAR_PRODUCTS, GET_PRODUCT_DETAIL_QUERY} from "./product.gql";

const useProduct = (urlKey = "") => {
    const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL_QUERY, {
        fetchPolicy: "no-cache",
        variables: { urlKey },
        skip: !urlKey,
    });

    const { data: popularProductsData } = useQuery(GET_POPULAR_PRODUCTS, {
        fetchPolicy: "network-only",
        errorPolicy: "all"
    });

    const productData = data?.products?.items?.[0] || null;
    const popularProducts = popularProductsData?.getPopularProducts || null;

    return {
        productData,
        popularProducts,
        loading,
        error: urlKey ? error : null,
    };
};

export default useProduct;
