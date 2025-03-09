import { useEffect, useMemo, useState } from 'react';
import {useLazyQuery, useQuery} from '@apollo/client';
import {GET_NAVIGATION_MENU} from "./sideBarMenu.gql";
import {router} from "expo-router";
import useStoreContext from "../../context/store/storeProvider";

const useSideBarMenu = ({onPress, onToggle, isSidebarOpen}) => {
    const {storeConfig} = useStoreContext();

    const [fetchNavigation, { loading, error, data }] = useLazyQuery(GET_NAVIGATION_MENU, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: "cache-first",
        errorPolicy: "all"
    });

    const [history, setHistory] = useState([]);

    const rootCategoryId = useMemo(() => {
        if (storeConfig?.root_category_id) {
            return storeConfig?.root_category_id;
        }
    }, [storeConfig]);

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
