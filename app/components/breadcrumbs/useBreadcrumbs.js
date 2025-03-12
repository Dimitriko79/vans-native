import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";

const GET_BREADCRUMBS = gql`
query getBreadcrumbs ($ids: String!) {
    categoryList(filters: { ids: { eq: $ids } }) {
        id
        name
        breadcrumbs {
            category_id
            category_level
            category_name
        }
    }
}
`;

const useBreadcrumbs = ({ ids = "" }) => {
    const { data, loading, error } = useQuery(GET_BREADCRUMBS, {
        skip: !ids,
        variables: { ids },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
    });

    const sortCrumbs = (a, b) => a.category_level - b.category_level;

    const normalizedData = useMemo(() => {
        if (loading || !data || !data.categoryList.length) return [];

        const breadcrumbData = data.categoryList[0].breadcrumbs || [];
        return breadcrumbData
            .map(({ category_level, category_name, category_id }) => ({
                category_level,
                text: category_name,
                category_id,
            }))
            .sort(sortCrumbs);
    }, [data, loading]);

    const currentCategory = useMemo(() => {
        return (data?.categoryList?.[0]?.name) || "";
    }, [data]);

    return {
        currentCategory,
        isLoading: loading,
        hasError: !!error,
        normalizedData,
    };
};

export default useBreadcrumbs;
