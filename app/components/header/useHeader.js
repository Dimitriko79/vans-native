import { useQuery } from "@apollo/client";
import { GET_CMS_BLOCK } from "./header.gql";
import useCartTrigger from "./useCartTrigger";
import { GET_ITEM_COUNT_QUERY } from "../cart/cart.gql";
import { useMemo, useCallback } from "react";

const useHeader = () => {
    const { itemCount, miniCartIsOpen, setMiniCartIsOpen } = useCartTrigger({
        queries: {
            getItemCountQuery: GET_ITEM_COUNT_QUERY,
        },
    });

    const { data, loading, error } = useQuery(GET_CMS_BLOCK, {
        fetchPolicy: "cache-and-network",
        variables: { identifiers: ["header_service_bar"] },
    });

    if (error) console.error("Error fetching CMS Block:", error);

    const cmsBlockData = useMemo(() => data?.cmsBlocks?.items || [], [data]);

    const toggleMiniCart = useCallback(() => {
        setMiniCartIsOpen(prev => !prev);
    }, [setMiniCartIsOpen]);

    return {
        cmsBlockData,
        loading,
        error,
        itemCount: itemCount || 0,
        miniCartIsOpen: miniCartIsOpen ?? false,
        setMiniCartIsOpen: toggleMiniCart,
    };
};

export default useHeader;
