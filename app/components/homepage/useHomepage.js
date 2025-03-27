import { useQuery } from "@apollo/client";
import { GET_HOMEPAGE } from "./homepage.gql";
import { router } from "expo-router";
import {useCallback, useMemo, useState} from "react";

const useHomepage = () => {
    const { data, loading, error } = useQuery(GET_HOMEPAGE, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    const homepageData = useMemo(() => data || null, [data]);

    const handlePress = useCallback(
        (id) => router.push({ pathname: "/category", params: { ids: id } }),
        []
    );

    return {
        loading,
        error,
        homepageData,
        handlePress
    };
};

export default useHomepage;
