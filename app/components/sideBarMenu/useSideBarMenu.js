import { useEffect, useMemo, useState } from 'react';
import {useLazyQuery, useQuery} from '@apollo/client';
import {GET_NAVIGATION_MENU, GET_ROOT_CATEGORY_ID} from "./sideBarMenu.gql";
import {router} from "expo-router";

const useSideBarMenu = ({onPress, onToggle, isSidebarOpen}) => {

    const {data: getRootCategoryData } = useQuery(GET_ROOT_CATEGORY_ID, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: "cache-first",
        errorPolicy: "all"
    });

    const [fetchNavigation, { loading, error, data }] = useLazyQuery(GET_NAVIGATION_MENU, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: "cache-first",
        errorPolicy: "all"
    });

    const [history, setHistory] = useState([]);

    const rootCategoryId = useMemo(() => {
        if (getRootCategoryData) {
            return getRootCategoryData.storeConfig.root_category_id;
        }
    }, [getRootCategoryData]);

    const [categoryId, setCategoryId] = useState(rootCategoryId);

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

        [...children]
            .sort((a, b) => a.position - b.position)
            .filter(child => Boolean(child.include_in_menu))
            .forEach(category => {
                const isLeaf = Number(category.children_count) === 0;
                childCategories.set(category.id, { category, isLeaf });
            });

        return childCategories;
    }, [children]);

    const handlePress = url_key => {
        router.push({ pathname: "/account" });
        onToggle();
    }

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
        handlePress,
        loading,
        error
    };
};

export default useSideBarMenu;
