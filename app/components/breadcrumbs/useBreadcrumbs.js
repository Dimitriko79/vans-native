import {gql, useQuery} from "@apollo/client";
import {useMemo} from "react";

const useBreadcrumbs = props => {
    const { ids } = props;
    const { data, loading, error } = useQuery(GET_BREADCRUMBS, {
        variables: { ids: ids },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const sortCrumbs = (a, b) => a.category_level > b.category_level;

    const normalizedData = useMemo(() => {
        if (!loading && data && data.categoryList.length) {
            const breadcrumbData = data.categoryList[0].breadcrumbs;

            return (
                breadcrumbData &&
                breadcrumbData
                    .map(category => ({
                        category_level: category.category_level,
                        text: category.category_name,
                        category_id: category.category_id,
                    }))
                    .sort(sortCrumbs)
            );
        }
    }, [ data, loading]);

    return {
        currentCategory: (data &&
                data.categoryList.length &&
                data.categoryList[0].name) ||
            '',
        isLoading: loading,
        hasError: !!error,
        normalizedData: normalizedData || [],
    }
}

export default useBreadcrumbs;

export const GET_BREADCRUMBS = gql`
query getBreadcrumbs ($ids: String!){
    categoryList(filters: {ids: {eq: $ids}}){
        id
        name
        breadcrumbs{
            category_id
            category_level
            category_name
            category_url_key
            category_url_path
        }
    }
}
`;