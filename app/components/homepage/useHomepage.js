import { useQuery } from "@apollo/client";
import { GET_HOMEPAGE } from "./homepage.gql";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";

const useHomepage = () => {
    const { data, loading, error } = useQuery(GET_HOMEPAGE, {
        fetchPolicy: "network-only",
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
        handlePress,
    };
};

export default useHomepage;
