import { useEffect, useMemo, useState } from 'react';
import {useLazyQuery, useQuery} from '@apollo/client';
import {GET_NAVIGATION_MENU, GET_ROOT_CATEGORY_ID} from "./sideBarMenu.gql";

export const useSideBarMenu = ({onPress, onToggle, isSidebarOpen}) => {
    const [categoryId, setCategoryId] = useState(null);

    const {data: getRootCategoryData } = useQuery(GET_ROOT_CATEGORY_ID, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const [fetchNavigation, { loading, error, data }] = useLazyQuery(GET_NAVIGATION_MENU, {
        fetchPolicy: "no-cache",
    });

    const [history, setHistory] = useState([]);

    const rootCategoryId = useMemo(() => {
        if (getRootCategoryData) {
            return getRootCategoryData.storeConfig.root_category_id;
        }
    }, [getRootCategoryData]);

    const handleGoBack = () => {
        const historyUpdated = [...history.slice(0, history.length - 1)];
        if(historyUpdated.length >= 1) {
            setHistory(historyUpdated);
            setCategoryId(historyUpdated[historyUpdated.length - 1]);
        } else {
            setHistory([]);
            setCategoryId(rootCategoryId);
        }
    };

    const handleChosenCategory = (categoryId) => {
        onPress(categoryId);
        onToggle();
    }

    const rootCategory = data?.categoryList[0] || [];

    const { children = [] } = rootCategory || {};

    const childCategories = useMemo(() => {
        const childCategories = new Map();

        children
            .sort((a, b) => a.position - b.position)
            .filter(child => Boolean(child.include_in_menu))
            .forEach(category => {
                const isLeaf = !parseInt(category.children_count < 0 ? 0 : category.children_count ) ;
                childCategories.set(category.id, { category, isLeaf });
        });

        return childCategories;
    }, [children, rootCategory]);

    useEffect(() => {
        if (!isSidebarOpen) {
            setCategoryId(rootCategoryId);
            setHistory([]);
        }
    }, [isSidebarOpen, rootCategoryId])

    useEffect(() => {
        if(rootCategoryId && !categoryId) {
            setCategoryId(rootCategoryId);
        }
    }, [rootCategoryId]);

    useEffect(() => {
        fetchNavigation({variables: {id: categoryId}});
    }, [categoryId])

    return {
        data,
        history,
        setHistory,
        childCategories,
        setCategoryId,
        handleGoBack,
        handleChosenCategory,
        loading,
        error
    };
};
