import { useQuery } from "@apollo/client";
import { GET_HOMEPAGE } from "./homepage.gql";
import { router } from "expo-router";
import {useCallback, useMemo, useState} from "react";

const useHomepage = () => {
    const { data, loading, error } = useQuery(GET_HOMEPAGE, {
        fetchPolicy: "network-only",
        errorPolicy: "all"
    });

    const homepageData = useMemo(() => data || null, [data]);

    const handlePress = useCallback(
        (id) => router.push({ pathname: "/category", params: { ids: id } }),
        []
    );

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        console.log('refreshing', refreshing)
    }, [])


    return {
        loading,
        error,
        homepageData,
        handlePress,
        onRefresh, refreshing
    };
};

export default useHomepage;
