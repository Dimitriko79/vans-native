import {useQuery} from "@apollo/client";
import {GET_PRODUCT_DETAIL_QUERY} from "./product.gql";


const useProduct = (urlKey) => {
    const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL_QUERY, {
        fetchPolicy: "no-cache",
        variables: {urlKey}
    });

    const productData = data?.products?.items[0] || null;

    return {
        productData,
        loading,
        error
    }
}

export default useProduct;