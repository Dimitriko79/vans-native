import { useEffect, useState, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_NAVIGATION_MENU } from "./sideBarMenu.gql";
import { router } from "expo-router";
import useStoreContext from "../../context/store/storeProvider";
import useCheckoutContext from "../../context/checkout/checkoutProvider";
import useUserContext from "../../context/user/userProvider";

const useSideBarMenu = ({ onPress, onToggle, isSidebarOpen}) => {
    const { storeConfig } = useStoreContext();
    const { dispatch } = useCheckoutContext();
    const {isSignedIn, signOut, setView} = useUserContext();

    const rootCategoryId = storeConfig?.root_category_id || null;

    const [categoryId, setCategoryId] = useState(rootCategoryId);
    const [history, setHistory] = useState([]);

    const [fetchNavigation, { loading, error, data }] = useLazyQuery(GET_NAVIGATION_MENU, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: "cache-first",
        errorPolicy: "all",
    });

    const handleGoBack = useCallback(() => {
        const historyUpdated = history.slice(0, -1);
        if (historyUpdated.length > 0) {
            setHistory(historyUpdated);
            setCategoryId(historyUpdated[historyUpdated.length - 1]);
        } else {
            setHistory([]);
            setCategoryId(rootCategoryId);
        }
    }, [history, rootCategoryId]);

    const handleChosenCategory = useCallback((categoryId) => {
        onPress(categoryId);
        onToggle();
    }, [onPress, onToggle]);

    const handlePress = useCallback(() => {
        router.push({ pathname: "/account" });
        if(!isSignedIn){
            setView("SIGNIN");
        }
        onToggle();
    }, [onToggle]);

    const handleSignOut = useCallback(async () => {
        await signOut();
        dispatch({ type: 'REMOVE_CHECKOUT_DETAILS' });
        onToggle();
    }, [signOut, dispatch, onToggle]);

    useEffect(() => {
        if (!isSidebarOpen) {
            setCategoryId(rootCategoryId);
            setHistory([]);
        }
    }, [isSidebarOpen, rootCategoryId]);

    useEffect(() => {
        if (rootCategoryId && !categoryId) {
            setCategoryId(rootCategoryId);
        }
    }, [rootCategoryId, categoryId]);

    useEffect(() => {
        if (categoryId) {
            fetchNavigation({ variables: { id: categoryId } });
        }
    }, [categoryId, fetchNavigation]);

    // Получаем дочерние категории
    const rootCategory = data?.categoryList?.[0] || {};
    const { children = [] } = rootCategory;

    const childCategories = new Map();
    children
        .filter(child => child.include_in_menu)
        .sort((a, b) => a.position - b.position)
        .forEach(category => {
            childCategories.set(category.id, {
                category,
                isLeaf: Number(category.children_count) === 0,
            });
        });

    return {
        data,
        history,
        setHistory,
        childCategories,
        setCategoryId,
        handleGoBack,
        handleChosenCategory,
        handleSignOut,
        handlePress,
        isSignedIn, signOut,
        loading,
        error,
    };
};

export default useSideBarMenu;
