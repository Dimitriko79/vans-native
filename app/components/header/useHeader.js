import {useQuery} from "@apollo/client";
import {GET_CMS_BLOCK} from "./header.gql";
import {useCartTrigger} from "./useCartTrigger";

export  const useHeader = () => {

    const {itemCount} = useCartTrigger();

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
        itemCount
    }
}