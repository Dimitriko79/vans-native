import { useCallback, useEffect, useMemo, useState } from 'react';
import {useLazyQuery, useQuery} from '@apollo/client';
import {GET_NAVIGATION_MENU, GET_ROOT_CATEGORY_ID} from "./sideBarMenu.gql";

export const useSideBarMenu = (props = {}) => {
    const [categoryUid, setCategoryUid] = useState(null);

    const {data: getRootCategoryData } = useQuery(GET_ROOT_CATEGORY_ID, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const [fetchNavigation, { loading, error, data }] = useLazyQuery(GET_NAVIGATION_MENU, {
        fetchPolicy: "no-cache",
    });

    const [history, setHistory] = useState([]); // История категорий

    const rootCategoryUid = useMemo(() => {
        if (getRootCategoryData) {
            return getRootCategoryData.storeConfig.root_category_uid;
        }
    }, [getRootCategoryData]);

    const handleGoBack = () => {
        const historyUpdated = [...history.slice(0, history.length - 1)];
        if(historyUpdated.length >= 1) {
            setHistory(historyUpdated);
            setCategoryUid(historyUpdated[historyUpdated.length - 1]);
        } else {
            setHistory([]);
            setCategoryUid(rootCategoryUid);
        }
    };

    const rootCategory = data && data.categories.items[0];

    const { children = [] } = rootCategory || {};

    const childCategories = useMemo(() => {
        const childCategories = new Map();

        if (
            rootCategory &&
            rootCategory.include_in_menu &&
            rootCategory.url_path
        ) {
            childCategories.set(rootCategory.uid, {
                category: rootCategory,
                isLeaf: true
            });
        }

        children.filter(child => Boolean(child.include_in_menu) && Boolean(child.show_on_mobile)).map(category => {
            const isLeaf = !parseInt(category.children_count);

            childCategories.set(category.uid, { category, isLeaf });
        });

        return childCategories;
    }, [children, rootCategory]);
    console.log(3333, childCategories)

    useEffect(() => {
        if(rootCategoryUid && !categoryUid) {
            setCategoryUid(rootCategoryUid);
        }
    }, [rootCategoryUid]);

    useEffect(() => {
        fetchNavigation({variables: {id: categoryUid}});
    }, [categoryUid])

    return {
        data,
        history,
        setHistory,
        childCategories,
        setCategoryUid,
        handleGoBack,
        loading,
        error
    };
};
