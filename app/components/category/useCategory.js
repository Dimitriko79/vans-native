import { useLazyQuery, useQuery } from "@apollo/client";
import { router } from "expo-router";
import { GET_CATEGORY, GET_PRODUCT_FILTERS_BY_CATEGORY, GET_PRODUCTS } from "./category.gql";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSort from "../sortSideBar/useSort";
import DEFAULT_SORT_METHODS from "../../helpers/defaultSortMetods";
import useCartProvider from "../../context/cart/cartProvider";

const useCategory = (ids) => {
    const [currentFilter, setCurrentFilter] = useState(new Map());
    const [isFetching, setIsFetching] = useState(false);
    const sortProps = useSort({ defaultSortMagento: null });
    const [currentSort, setSort] = sortProps;
    const [isFetchingFirst, setIsFetchingFirst] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const [products, setProducts] = useState([]);

    const { isLoadMore, setIsLoadMore } = useCartProvider();

    const [runQuery, { loading, error, data }] = useLazyQuery(GET_CATEGORY, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        context: { headers: { Store: "he" } },
    });

    const { data: filterData, loading: filterLoading } = useQuery(
        GET_PRODUCT_FILTERS_BY_CATEGORY,
        {
            fetchPolicy: "cache-and-network",
            variables: { categoryIdFilter: { eq: ids } },
            skip: !ids,
        }
    );

    const [getProductsData, { data: productData, loading: productLoading }] = useLazyQuery(
        GET_PRODUCTS,
        {
            fetchPolicy: "cache-and-network",
            nextFetchPolicy: "cache-first",
        }
    );

    const categoryData = data?.categoryList[0] || null;
    const productCount = categoryData?.product_count;

    const aggregations = useMemo(() => {
        return filterData?.products?.aggregations?.filter(aggr => aggr.attribute_code !== "category_id") || [];
    }, [filterData]);

    const sortFields = useMemo(() => {
        return filterData?.products?.sort_fields || null;
    }, [filterData]);

    const handlePress = (id) => {
        router.push({ pathname: "/category", params: { ids: id } });
    };

    const transformedFilter = useMemo(() => {
        return Array.from(currentFilter.entries()).reduce((acc, [attribute_code, codes]) => {
            if (attribute_code === "price") {
                const [range] = codes;
                const [from, to] = range.split("_");
                acc[attribute_code] = { from: from === "*" ? "" : from, to: to === "*" ? "" : to };
            } else {
                acc[attribute_code] = codes.length === 1 ? { eq: codes[0] } : { in: codes };
            }
            return acc;
        }, { category_id: { eq: ids } });
    }, [currentFilter, ids]);

    useEffect(() => {
        if (isFetchingFirst && sortFields?.default) {
            setSort(DEFAULT_SORT_METHODS.get(sortFields.default));
        }
        setIsFetchingFirst(false);
    }, [sortFields, setIsFetchingFirst]);

    const fetchData = async () => {
        try {
            await runQuery({ variables: { ids } });
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetching(true);
        }
    };

    const fetchProductData = useCallback(async (page = currentPage) => {
        const newFilter = transformedFilter;
        const newSort = { [currentSort.value]: currentSort.sortDirection };

        try {
            const res = await getProductsData({
                variables: { filter: newFilter, sort: newSort, pageSize: pageSize, currentPage: page },
            });

            if (res?.data?.products?.items.length) {
                setProducts(prevState => {
                    if(currentPage === 1){
                        return res.data.products.items;
                    } else {
                        return [...prevState, ...res.data.products.items];
                    }

                    // const uniqueItems = Array.from(new Map([...prevState, ...newItems].map(item => [item.sku, item])).values());
                    // return newItems;
                });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsFetching(true);
            setIsLoadMore(false);
        }
    }, [transformedFilter, currentSort, currentFilter,currentPage, getProductsData]);

    useEffect(() => {
        if (isLoadMore && !productLoading) {
            setCurrentPage(prevPage => {
                const nextPage = prevPage + 1;
                fetchProductData(nextPage);
                return nextPage;
            });
        }
    }, [isLoadMore]);
    console.log(products.length)
    useEffect(() => {
        setCurrentPage(1);
        fetchProductData(1);
    }, [currentFilter, transformedFilter,  currentSort]);

    useEffect(() => {
        fetchData();
        fetchProductData(1);
    }, [ids]);

    return {
        categoryData,
        products,
        aggregations,
        sortFields,
        description: categoryData?.description || null,
        loading: loading || filterLoading,
        isLoadMore,
        error,
        handlePress,
        currentFilter,
        setCurrentFilter,
        isFetching,
        setIsFetching,
        sortProps,
    };
};

export default useCategory;