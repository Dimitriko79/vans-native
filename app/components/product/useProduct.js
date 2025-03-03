import {useLazyQuery, useQuery} from "@apollo/client";
import {router} from "expo-router";
import {GET_PRODUCT_DETAIL_QUERY} from "./product.gql";
import {useEffect, useMemo, useState} from "react";


const useProduct = (urlKey) => {
    const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL_QUERY, {
        fetchPolicy: "no-cache",
        variables: {urlKey}
    });

    const productData = data?.products?.items[0] || null;

    const handlePress = url_key => {
        return  router.push({ pathname: "/product", params: { urlKey: url_key } })
    }

    return {
        productData,
        loading,
        error
    }
}

export default useProduct;