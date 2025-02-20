import {useLazyQuery, useQuery} from "@apollo/client";
import {router} from "expo-router";
import {GET_CATEGORY, GET_PRODUCT_FILTERS_BY_CATEGORY, GET_PRODUCTS} from "./category.gql";
import {useEffect, useMemo, useState} from "react";


export const useCategory = (ids) => {
    const [currentFilter, setCurrentFilter] = useState(new Map());
    const [isFetching, setIsFetching] = useState(false);
    const { loading, error, data } = useQuery(GET_CATEGORY, {
        fetchPolicy: "no-cache",
        variables: {ids},
        context: {
            headers: { Store: "he" },
        }
    });

    const [getFiltersData, { data: filterData, loading: filterLoading }] = useLazyQuery(
        GET_PRODUCT_FILTERS_BY_CATEGORY,
        {
            fetchPolicy: 'no-cache',
        }
    );

    const [getProductsData, { data: productData, loading: productLoading  }] = useLazyQuery(
        GET_PRODUCTS,
        {
            fetchPolicy: 'no-cache'
        }
    );

    const categoryData = data?.categoryList[0] || null;
    const products = productData?.products?.items?.sort((a, b) => a.name > b.name) || [];

    const aggregations = useMemo(() => {
        return filterData &&
            filterData.products.aggregations &&
            filterData.products.aggregations.length ? filterData.products.aggregations : []
    }, [filterData]);

    const handlePress = id => {
        return  router.push({ pathname: "/category", params: { ids: id } })
    }

    const transformedFilter = Array.from(currentFilter.entries()).reduce((acc, [attribute_code, codes]) => {
        if (attribute_code === "price") {
            const [range] = codes;
            const [from, to] = range.split("_");

            acc[attribute_code] = {
                from: from === "*" ? "" : from,
                to: to === "*" ? "" : to,
            };
        } else {
            acc[attribute_code] = codes.length === 1 ? { eq: codes[0] } : { in: codes };
        }
        console.log(333, acc)
        return acc;
    }, {});

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (ids) {
                    if(!currentFilter.size){
                        await getProductsData({variables: {filter: {category_id: {eq: ids}}}});
                    }
                    await getFiltersData({variables: {categoryIdFilter: {eq: ids}}});
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, [ids, currentFilter]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(currentFilter.size){
                    await getProductsData({variables: {filter: transformedFilter }});
                }
            } catch (e) {
                console.log(e)
            } finally {
                setIsFetching(true);
            }
        }
        fetchData();

    }, [currentFilter]);

    return {
        categoryData,
        products,
        aggregations,
        loading: loading || productLoading || filterLoading,
        error,
        handlePress,
        currentFilter,
        setCurrentFilter,
        isFetching, setIsFetching
    }
}