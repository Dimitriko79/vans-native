import {useQuery} from "@apollo/client";
import {GET_CMS_BLOCK} from "./header.gql";
import useCartTrigger from "./useCartTrigger";
import {GET_ITEM_COUNT_QUERY} from "../cart/cart.gql";

const useHeader = () => {

    const {itemCount, miniCartIsOpen, setMiniCartIsOpen} = useCartTrigger({
        queries: {
            getItemCountQuery: GET_ITEM_COUNT_QUERY
        }
    });

    const {data, loading, error} = useQuery(
        GET_CMS_BLOCK,
        {
            fetchPolicy: "cache-and-network",
            variables:
                {identifiers: ["header_service_bar"]}
            }
        );

    const cmsBlockData = data?.cmsBlocks?.items || [];

    return {
        cmsBlockData,
        loading,
        error,
        itemCount,
        miniCartIsOpen,
        setMiniCartIsOpen
    }
}

export default useHeader;