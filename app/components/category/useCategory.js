import {useLazyQuery, useQuery} from "@apollo/client";
import {router} from "expo-router";
import {GET_CATEGORY, GET_PRODUCT_FILTERS_BY_CATEGORY, GET_PRODUCTS} from "./category.gql";
import {useEffect, useMemo, useState} from "react";
import {useSort} from "../sortSideBar/useSort";
import {DEFAULT_SORT_METHODS} from "../../helpers/defaultSortMetods";


export const useCategory = (ids) => {
    const [currentFilter, setCurrentFilter] = useState(new Map());
    const [isFetching, setIsFetching] = useState(false);
    const sortProps = useSort({ defaultSortMagento: null });
    const [currentSort, setSort] = sortProps;
    const [isFetchingFirst, setIsFetchingFirst] = useState(true);

    const [runQuery, { loading, error, data }] = useLazyQuery(GET_CATEGORY, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        context: {
            headers: { Store: "he" },
        }
    });

    const { data: filterData, loading: filterLoading } = useQuery(
        GET_PRODUCT_FILTERS_BY_CATEGORY,
        {
            fetchPolicy: 'cache-and-network',
            variables: {categoryIdFilter: {eq: ids}},
            skip: !ids
        }
    );

    const [getProductsData, { data: productData, loading: productLoading  }] = useLazyQuery(
        GET_PRODUCTS,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    const categoryData = data?.categoryList[0] || null;
    const products = productData?.products?.items || [];

    const aggregations = useMemo(() => {
        return filterData &&
            filterData.products.aggregations &&
            filterData.products.aggregations.length ? filterData.products.aggregations.filter(aggr => aggr.attribute_code !== "category_id") : []
    }, [filterData]);

    const sortFields = useMemo(() => {
        return filterData &&
        filterData.products.sort_fields ? filterData.products.sort_fields : null
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
        return acc;
    }, {category_id: {eq: ids}});

    useEffect(() => {
        if(isFetchingFirst && sortFields && sortFields.default){
            setSort(DEFAULT_SORT_METHODS.get(sortFields.default));
        }
        setIsFetchingFirst(false);
    }, [sortFields, setIsFetchingFirst]);

    useEffect(() => {
        const fetchData = async () => {
            const newFilter = transformedFilter;
            const newSort = {[currentSort.value]: currentSort.sortDirection};
            try {
                await runQuery({ variables: { ids: ids } });
                await getProductsData({variables: {filter: newFilter, sort: newSort}});
            } catch (e) {
                console.log(e)
            } finally {
                setIsFetching(true);
            }
        }
        fetchData();
    }, [ids, currentFilter, currentSort, getProductsData]);

    return {
        categoryData,
        products,
        aggregations,
        sortFields,
        loading: loading || productLoading || filterLoading,
        error,
        handlePress,
        currentFilter,
        setCurrentFilter,
        isFetching, setIsFetching,
        sortProps
    }
}